// npm i gulpjs/gulp#4.0 gulp-if gulp-pug emitty
'use strict';

const gulp = require('gulp');
const sourceName = 'FAST';
const $ = require('gulp-load-plugins')();
const fs = require('fs');
const path = require('path');
const nib = require('nib');
const spritesmith = require('gulp.spritesmith');
const htmlPrettify = require('gulp-prettify');
const gulpZip = require('gulp-zip');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const watch = require ('gulp-watch');
const concat = require('gulp-concat');
const gcmq = require('gulp-combine-mq');
const include = require('gulp-include');
const changed = require('gulp-changed');
const cache = require('gulp-cached');
const progeny = require('gulp-progeny');
const imagemin = require('gulp-imagemin');
const imageminSvgo = require('imagemin-svgo');
const imageminPngquant = require('imagemin-pngquant');
const buffer = require('vinyl-buffer');
const stylefmt = require('stylefmt');
const postcss = require('gulp-postcss');
const reload = browserSync.reload;
const emitty = require('emitty').setup('source', 'pug', {
    makeVinylFile: true
});


// Read json and return object
function getJsonData(file) {
    var fs = require('fs');
    var path = require('path');

    return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, file),
                'utf8'
            )
        );
}


// File exists
function stylusFileExists() {
    return function(style) {
        style.define('file-exists', function(path) {
            return !!$.stylus.stylus.utils.lookup(path.string, this.paths);
        });
    };
}


// Error handler for gulp-plumber
function errorHandler(err) {
    $.util.log([ (err.name + ' in ' + err.plugin).bold.red, '', err.message, '' ].join('\n'));

    this.emit('end');
}


function correctNumber(number) {
    return number < 10 ? '0' + number : number;
}


// Return timestamp
var getDateTime = function getDateTime() {
    var now = new Date();
    var weekDays = new Array(7);
    weekDays[0] = "Sunday";
    weekDays[1] = "Monday";
    weekDays[2] = "Tuesday";
    weekDays[3] = "Wednesday";
    weekDays[4] = "Thursday";
    weekDays[5] = "Friday";
    weekDays[6] = "Saturday";
    var dayName = weekDays[now.getDay()];
    var year = now.getFullYear();
    var month = correctNumber(now.getMonth() + 1);
    var day = correctNumber(now.getDate());
    var hours = correctNumber(now.getHours());
    var minutes = correctNumber(now.getMinutes());
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + '-' + minutes + ' ' + ampm;
    return dayName + ' [' + year + '-' + month + '-' + day + '] - ' +  '[Time ' + strTime + ']';
};


// Options
var options = {

    htmlPrettify: {
        'unformatted': ['pre', 'code'],
        'indent_with_tabs': false,
        'preserve_newlines': false,
        'brace_style': 'expand',
        'end_with_newline': false
    },

    dataJson: {
        fileName: 'data.json'
    },

    plumber: {
        errorHandler: errorHandler
    },

    browserSync: {
        server: {
            baseDir: './dist/'
        },
        notify: false,
        reloadOnRestart: true,
        snippetOptions: {
            rule: {
                match: /<\/body>/i
            }
        }
    },

    pug: {
        src: 'source/**/*.pug',
        pretty: '\t'
    },

    stylus: {
        src: 'source/static/styles/**/*.styl',
        use: [
            stylusFileExists(),
            nib()
        ]
        //'include css': true
    },

    include: {
        hardFail: true,
        includePaths: [
            __dirname + '/',
            __dirname + '/node_modules',
            __dirname + '/source/static/scripts/plugins'
        ]
    },

    imagemin: {
        images: [
            $.imagemin.gifsicle({
                interlaced: true,
                optimizationLevel: 3
            }),
            $.imagemin.jpegtran({
                progressive: true
            }),
            imageminPngquant(),
            imageminSvgo({
                plugins: [
                    { cleanupIDs: false },
                    { removeViewBox: false },
                    { convertPathData: false },
                    { mergePaths: false }
                ]
            })
        ],

        icons: [
            imageminSvgo({
                plugins: [
                    { removeTitle: true },
                    { removeStyleElement: true },
                    { removeAttrs: { attrs: [ 'id', 'class', 'data-name', 'fill', 'fill-rule' ] } },
                    { removeEmptyContainers: true },
                    { sortAttrs: true },
                    { removeUselessDefs: true },
                    { removeEmptyText: true },
                    { removeEditorsNSData: true },
                    { removeEmptyAttrs: true },
                    { removeHiddenElems: true }
                ]
            })
        ]
    },

    svgSymbols: {
        title: false,
        id: '%f',
        className: '%f',
        svgClassname: 'icons-sprite',
        templates: [
            path.join(__dirname, 'source/static/styles/templates/icons-template.styl'),
            path.join(__dirname, 'source/static/styles/templates/icons-template.svg')
        ]
    },

    spritesmith: {
        imgPath: '../images/sprite.png',
        imgName: 'sprite.png',
        cssName: 'sprite.styl',
        // retinaImgPath: '../images/sprite@2x.png',
        // retinaSrcFilter: '**/*@2x.png',
        // retinaImgName: 'sprite@2x.png',
        algorithm: 'binary-tree',
        padding: 8,
        cssTemplate: './source/static/styles/templates/sprite-template.mustache'
    },

    postcss: [
        stylefmt({
            configFile: '.stylelintrc'
        })
    ],

    csso: {
        restructure: false,
        sourceMap: true
    }
};


// Build sprite
gulp.task('build-sprite', () => {
    var spriteData = gulp.src([ '**/*.png', '!**/_*.png' ], { cwd: 'assets/images/sprite' })
        .pipe(spritesmith(options.spritesmith));

    spriteData.img.pipe(buffer())
        .pipe($.imagemin(options.imagemin.images))
        .pipe(gulp.dest('dist/assets/images'));

    spriteData.css.pipe(buffer())
        .pipe(gulp.dest('tmp'));

    return spriteData.img.pipe(buffer());
});


// Browser sync 
gulp.task('browser-sync', () =>  {
    browserSync.init(options.browserSync);
});


// Minify images
gulp.task('build-img', () => {
    return gulp.src('**/*.{jpg,gif,svg,png}', {cwd: 'assets/images/img/'})
        .pipe($.plumber(options.plumber))
        .pipe($.changed('dist/images'))
        .pipe($.imagemin(options.imagemin.images))
        .pipe(gulp.dest('dist/assets/images'));
});


// Build icons
gulp.task('build-icons', () => {
    return gulp.src([ '**/*.svg', '!**/_*.svg' ], { cwd: 'assets/images/icons' })
        .pipe($.plumber(options.plumber))
        .pipe($.imagemin(options.imagemin.icons))
        .pipe($.svgSymbols(options.svgSymbols))
        .pipe($.if(/\.styl$/, gulp.dest('tmp')))
        .pipe($.if(/\.svg$/, $.rename('icons.svg')))
        .pipe($.if(/\.svg$/, gulp.dest('dist/assets/images')));
});


// Build data json
gulp.task('data', () => {
    return gulp.src([ '**/*.yml', '!**/_*.yml' ], { cwd: 'source/modules/*/data' })
        .pipe($.plumber(options.plumber))
        .pipe($.yaml({ space: '\t' }))
        .pipe($.mergeJson(options.dataJson))
        .pipe(gulp.dest('tmp'));
});


// Compile html
gulp.task('pug', (cb) => {

    var jsonData = getJsonData('./tmp/data.json');
    options.pug.locals = jsonData;

    new Promise((resolve, reject) => {
        const sourceOptions = global.watch ? { read: false } : {};

        emitty.scan(global.changedStyleFile).then(() => {
            gulp.src('source/pages/*.pug', sourceOptions)
                .pipe($.plumber(options.plumber))
                .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe($.pug(options.pug))
                .pipe(htmlPrettify(options.htmlPrettify))
                .pipe(gulp.dest('./dist/'))
                .on('end', resolve)
                .on('error', reject)
                .pipe(browserSync.stream({
                    once: true
                }));
        });
    })
    cb();
});


// Compile css
gulp.task('stylus', () => {
    return gulp.src(['*.styl', '!_*.styl'], {cwd: 'source/static/styles'})
        .pipe($.plumber(options.plumber))
        .pipe($.sourcemaps.init())
        //.pipe(cache('stylus'))
        //.pipe(progeny())
        .pipe($.stylus(options.stylus))
        .pipe(gcmq({beautify: true}))
        // .pipe($.postcss(options.postcss))
        .pipe($.csscomb({configPath: '.csscomb.json'}))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe($.csso(options.csso))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true,
            match: '**/*.css'
        }));
});


gulp.task('build-assets', function() {
    var imageFilter = $.filter('**/*.{jpg,gif,svg,png}', { restore: true });
    var scriptsFilter = $.filter([ '**/*.js', '!**/*.min.js' ], { restore: true });

    return gulp.src([ '**/*.*', '!**/_*.*' ], { cwd: 'source/static/assets' })
        .pipe($.plumber(options.plumber))
        .pipe($.changed('dist/assets'))

        // Minify JavaScript files
        .pipe(scriptsFilter)
        .pipe(gulp.dest('dist/assets'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(scriptsFilter.restore)

        // Minify images
        .pipe(imageFilter)
        .pipe($.changed('dest/assets'))
        .pipe($.imagemin(options.imagemin.images))
        .pipe(imageFilter.restore)

        // Copy other files
        .pipe(gulp.dest('dist/assets'));
});


// Compile js charts
gulp.task('compile-js-charts', function () {
    return gulp.src(['*.js'], {cwd: 'source/static/scripts/charts'})
        .pipe($.plumber(options.plumber))
        .pipe($.sourcemaps.init())
        .pipe(concat('chart.js', { newLine: '\n\n' }))
        .pipe(gulp.dest('dist/assets/js/charts'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js/charts'));
});


// Compile js modules
gulp.task('compile-js', function() {
    return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts/main' })
        .pipe($.plumber(options.plumber))
        .pipe($.sourcemaps.init())
        .pipe($.include(options.include))
        .pipe(gulp.dest('dist/assets/js/main'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js/main'));
});


// Compile js plugins
gulp.task('compile-js-plugins', function() {
    return gulp.src([ '*.js', '!_*.js' ], { cwd: 'source/static/scripts' })
        .pipe($.plumber(options.plumber))
        .pipe($.sourcemaps.init())
        .pipe($.include(options.include))
        .pipe(gulp.dest('dist/assets/js/plugins'))
        .pipe($.uglify())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js/plugins'));
});


// Build zip
gulp.task('build-zip', () => {

    //var datetime = '-' + new Date();
    var datetime = ' - ' + getDateTime();
    var zipName = sourceName + datetime + '.zip';


    return gulp.src('dist/**/*')
        .pipe(gulpZip(zipName))
        .pipe(gulp.dest('zip'));
});



// Build html with data
gulp.task(
    'build-html',
    gulp.series(
        'data',
        'pug'
        )
    )


// Build js
gulp.task(
    'build-js',
    gulp.parallel(
        'compile-js',
        'compile-js-plugins',
        'compile-js-charts'
        )
    )


// Build task
gulp.task(
    'build',
    gulp.series(
        gulp.parallel(
            'build-html',
            'build-icons',
            'build-js',
            'build-img',
            'build-assets',
            'build-sprite'
            ),
        'stylus'
        )
    )


// Svg icons
gulp.task(
    'build-svg',
    gulp.parallel(
        'build-icons',
        'stylus'
        )
    )


// Zip task
gulp.task('zip',
    gulp.parallel (
        'build',
        'build-img',
        'build-zip'
        )
    )


// Glup Development task
gulp.task('watch', () => {
    // Shows that run "watch" mode
    global.watch = true;

    gulp.watch('source/**/*.pug', gulp.series('pug'))
        .on('all', (event, filepath) => {
            global.emittyChangedFile = filepath;
        });


    // Modules data
    $.watch('source/modules/*/data/*.yml', gulp.series('build-html'));


    // Modules styles
    $.watch(options.stylus.src, gulp.series('stylus'));


    // Modules combine-styles
    $.watch('source/modules/**/*.styl', gulp.series('stylus'));
    

    // Modules images
    $.watch('assets/**/*.{jpg,gif,png,svg}', gulp.series('build-img', browserSync.reload));


    // Modules scripts
    $.watch('source/modules/*/*.js', gulp.series('compile-js' , browserSync.reload));


    // Static scripts
    $.watch('source/static/scripts/**/*.js', gulp.series('compile-js-plugins', browserSync.reload));


    // Modules sprites
    $.watch('assets/images/sprite/**/*.png', gulp.series('build-sprite', browserSync.reload));


    // Svg icons
    $.watch('assets/images/icons/*.svg', gulp.series('build-svg', browserSync.reload));


    // Static files
    $.watch('assets/images/**/*', gulp.series('build-assets', browserSync.reload));

    
    // Source Static files
    $.watch('source/static/assets/**/*', gulp.series('build-assets'));
});


// Gulp dev task
gulp.task(
    'dev',
    gulp.series(
        'build',
        gulp.parallel(
            'browser-sync',
            'watch'
            )
        )
    )
