// module__currency
(function() {


    var btn = $('.module__currency__item'); 

    btn.click(function(event) {
        btn.removeClass('active');
        $(this).addClass('active');
    });


})();
