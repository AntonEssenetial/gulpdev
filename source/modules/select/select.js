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
