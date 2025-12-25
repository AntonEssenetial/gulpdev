// module__dash-pay
(function() {


    var btn = $('.module__dash-pay__item'); 

    btn.click(function(event) {
        btn.removeClass('active');
        $(this).addClass('active');
    });


})();
