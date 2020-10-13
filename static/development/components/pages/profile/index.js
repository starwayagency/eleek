import './index.scss';

$(".item_tab_link").on("click", function(){
    ($(this)[0].dataset.tab);
    var className = ($(this)[0].dataset.tab);
    console.log(className);
    ($(".item_tab_link").removeClass("item_tab_link_active"));
     ($(this).addClass("item_tab_link_active"));
    ($(".item_tab_content").removeClass("item_tab_content_active"));
        ($("#"+$(this)[0].dataset.tab).addClass("item_tab_content_active"));
});