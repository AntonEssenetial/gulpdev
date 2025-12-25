// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[ length ];

		// Only stub undefined methods.
		if (!console[ method ]) {
			console[ method ] = noop;
		}
	}
}());


// Собираем все нужные плагины в нужном порядке

//////////////////////////////////////////////////////////////////////////////
// Important plugins
//////////////////////////////////////////////////////////////////////////////


// JQuery
// Browser feature detection library for HTML5/CSS3
//= require jquery/dist/jquery.js


// SVG4Everybody
//= require svg4everybody/dist/svg4everybody.js


//////////////////////////////////////////////////////////////////////////////
// Optionals plugins
//////////////////////////////////////////////////////////////////////////////


// Tabs
// ---------------------------------------------------------------------------
//= require tabs/tabs.js


// Select2
// ---------------------------------------------------------------------------
//= require select2/select2.min.js


// Slick
// ---------------------------------------------------------------------------
//= require slick/slick.min.js


// iziToast
// ---------------------------------------------------------------------------
//= require iziToast/iziToast.min.js


// navgoco
// ---------------------------------------------------------------------------
//= require navgoco/jquery.navgoco.min.js


// fontawesome
// ---------------------------------------------------------------------------
//= require fontawesome/fontawesome.min.js
