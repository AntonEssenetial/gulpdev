'use strict';

svg4everybody();

// Modules
// label
(function() {

    $(".icon_eye").click(function() {

    var input = $('.form__input_pass');
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
        }
    });

})();

// module__accordion
(function() {


    // Accordion 
    function navGoco(accordion) {
        var jsAccordion = $(accordion);
        jsAccordion.navgoco({accordion: true});
    }

    navGoco('.jsAccordion');


})();

// module__currency
(function() {


    var btn = $('.module__currency__item'); 

    btn.click(function(event) {
        btn.removeClass('active');
        $(this).addClass('active');
    });


})();

// module__dash-pay
(function() {


    var btn = $('.module__dash-pay__item'); 

    btn.click(function(event) {
        btn.removeClass('active');
        $(this).addClass('active');
    });


})();

// module__elements
(function() {

    $(".btn").on("click", function() {
        
        var progressBtn = $(this);
    
        if (!progressBtn.hasClass("loading")) {
            progressBtn.addClass("loading");
            setTimeout(function() {
                progressBtn.removeClass("loading");
            }, 10000);
            }
    });

})();

// module__lang
(function() {


    var container = $('.jsContainer'),
        btn = $('.jsBtn'),
        langBtn = $('.jsLang');


    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            langBtn.find('.jsBtn').removeClass('active')
            langBtn.find('.jsContainer').removeClass('active')   
        }
    });


    btn.click(function(event) {
        $(this).closest('.jsContPar').find('.jsContainer').toggleClass('active'),
        $(this).toggleClass('active');
    });


    $(document).on('click', function(e) {
        if (!$(e.target).closest(".jsContPar").length) {
            container.removeClass('active');
            btn.removeClass('active');
        }
        e.stopPropagation();
    });


})();

// module__lightbox
(function() {


    // Lightbox
    function lightBox() {
        $('.jsLightBox').simpleLightbox({
            nextOnImageClick: false
        });
    }

    //lightBox()


})();

// module__notification
(function() {


    // Load modals
    if($('div').is('.module__notification')) {
        init();
    }


    // Init modals
    function init() {

        iziToast.error({
            title: 'Error',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.success({
            title: 'Success',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.warning({
            title: 'Worning',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.info({
            title: 'Information',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    }

})();

// Sandwitch
(function() {

    $('.jsMobileDropdown').click(function(event) {
        var menu = $('.main-menu');
        $(this).toggleClass('active');
        menu.toggleClass('active');
        $('body').toggleClass('page_mobile-menu');
    });

})();

// custom select
(function() {


    function initSelect() {

        $('.select_default').select2({
            width: 'auto',
            // dir: "rtl",
            // dropdownParent: $('#parent'),
            dropdownAutoWidth : true,
            minimumResultsForSearch: -1,
            allowHtml: true,
            dropdownCssClass: "select2_custom-dropdown animated fadeIn",
            containerCssClass: "select2_custom-container"
        });

    }

    initSelect()


    function formatState (state) {
        
        if (!state.id) {
            return state.text;
        }

        var baseUrl = "icon_";
        var $state = $(
            '<span class="icon_crypto ' + state.element.value.toLowerCase() + '" /></span><span class="icon_text"> ' + state.text + '</span>'
        );

        return $state;
    };


    function initSelectWithIcons() {

        $('.select_crypto').select2({
            // dir: "rtl",
            width: 'auto',
            dropdownAutoWidth : true,
            templateSelection: formatState,
            templateResult: formatState,
            minimumResultsForSearch: -1,
            allowHtml: true,
            dropdownCssClass: "select2_crypto-dropdown animated fadeIn",
            containerCssClass: "select2_crypto-container"
        });

    }

    initSelectWithIcons()

})();

