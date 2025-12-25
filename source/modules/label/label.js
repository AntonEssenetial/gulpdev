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
