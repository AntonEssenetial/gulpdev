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
