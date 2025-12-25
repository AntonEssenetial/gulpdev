// Sandwitch
(function() {

    $('.jsMobileDropdown').click(function(event) {
        var menu = $('.main-menu');
        $(this).toggleClass('active');
        menu.toggleClass('active');
        $('body').toggleClass('page_mobile-menu');
    });

})();
