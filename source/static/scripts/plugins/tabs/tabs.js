function functionTabs(tab, tabActive, tabContent, parentDiv){

    var jsTab = $(tab),
        jsTabActive = tabActive,
        jsParent = $(parentDiv),
        jsContent = $(tabContent);

    jsTab.click(function() {
        $(this).closest(jsParent).find(jsTab).removeClass(jsTabActive).eq($(this).index()).addClass(jsTabActive);
        $(this).closest(jsParent).find(jsContent).removeClass('jsActive animated fadeInRight').eq($(this).index()).addClass('jsActive animated fadeInRight');
    }).eq(0);

}
