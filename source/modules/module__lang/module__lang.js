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
