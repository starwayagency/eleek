import "./index.scss";
import { default_value } from "../../module/constructor/default_value";
import { form_color } from "../../interface/form/elements/color";
// import { onClickCheckboxOptions } from "../../interface/form/elements/list";
import { onClickRadio_v1 } from "../../interface/form/elements/radio_v1";
import {
  onLoadInfoActive,
  onLoadInfoRemote,
  onClickSettingsCardImg,
  clearGroup,
  onChengeRadioV1,
  childrensСonnections,
  onClickCheckboxOptions,
  resizeTringleCategories,
  onSelectFirstItem,
  onBackMobile,
  chengeURL,
  chengePrice,
  onChengeSetingsHeight,
} from "./helpersEvent";
import { creatingSettings } from "./helperCreate";
import { params } from "../../common_componentc/modell/helper";

function onChengeIframe() {
  $(".settings__card-iframe").on("click", function () {
    const type_iframe = $(this).children(".form__radio").data("value");

    
   

    let info_bike;
    onLoadInfoActive();

    fetch(`/api/get_info/?frame_code=${type_iframe}`)
    .then((response) => {
      return response.json()
    })
    .then((response) => {

      
      info_bike = response;
       
      
      let info_tab_1 = info_bike.properties.tab_1.groups;
      let info_tab_2 = info_bike.properties.tab_2.groups;
      let info_tab_3 = info_bike.properties.tab_3.groups;

  
      
      clearGroup('[data-tab_main="1"]');
      clearGroup('[data-tab_main="2"]');
      clearGroup('[data-tab_main="3"]');
 
 
      $('[data-tab_main="1"]')[0].innerHTML += createGrooup(
        info_tab_1,
        ''
      );
      $('[data-tab_main="2"]')[0].innerHTML += createGrooup(
        info_tab_2,
        info_bike.properties.tab_2.name_section
      );
      $('[data-tab_main="3"]')[0].innerHTML += createGrooup(
        info_tab_3,
        info_bike.properties.tab_3.name_section
      );

      
      form_color(".form__color");
      onClickSettingsCardImg(".settings__box_main1", false);
      onClickSettingsCardImg(".settings__box_main");
      onChengeRadioV1(".settings__box_main");
      onClickSettingsColor();
      SettingsInput();
      onClickCheckboxOptions('.constructor_setings');
      onClickRadio_v1();

      onChengeIframe();
      onSelectFirstItem();

      onLoadInfoRemote();
      onBackMobile();

      onChengeSetingsHeight();

    

    })
    
  });
}


onChengeIframe();

$(".vizual_3d").on("click", function () {
  let string_params = $(".constructor_setings").serializeArray();
  window.location.href = `/page2/?${params(string_params)}`;
});

$(".next_tab").on("click", function () {
  let activeTab = $(".settings__parameters-active").data("tab_main");
  activeTab++;
  if (activeTab > 3) {
    activeTab = 1;
  }
  $(`.settings__parameters`).removeClass("settings__parameters-active");
  $(`.settings__category`).removeClass("settings__category-active");
  $(`[data-tab_main="${activeTab}"]`).addClass("settings__parameters-active");
  $(`[data-tab_header="${activeTab}"]`).addClass("settings__category-active");
  resizeTringleCategories()
  setTimeout(function () {
    onChengeSetingsHeight();
  }, 400);
});





function SettingsInput() {
  let seting_box = [...$(".settings__box_main")];

  seting_box.map((item) => {
    let input_value = $(item).data("input_value");
    let input_hidden = $(item).children("input[type=hidden]");
    $(input_hidden).attr("name", input_value);
    $(input_hidden).attr("id", input_value);
    $(input_hidden).addClass(input_value);
  });
}

function createGrooup(groups, name_section) {
  let settingsParameters = "";
 
  groups.map((group) => {
    settingsParameters += creatingSettings(group);
  });

  let GroupBox = `
  <div>
 ${
   !!name_section
     ? ` <div class="settings__group_back">
 <div class="settings__group_back-icons">
   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 25 15">
     <path fill="#1B1813" fill-rule="evenodd" d="M7.071 0l.707.707L1.91 6.574h22.67v1H1.917l5.861 5.861-.707.707L0 7.072 7.071 0z"></path>
   </svg>
   </div>
   <div class=""> <div class="settings__group_title">${name_section}</div></div>
 </div>`
     : ""
 }
    <div>
        ${settingsParameters}
    </div>
    
  </div>
  <div class="settings__parameters_foter">
      <div class="settings__parameters_next  btn_standart btn_standart_yellow color_white  ">ДАЛІ</div>
      <div class="settings__parameters_next btn_standart btn_standart_black color_white">ПОКАЗАТИ В 3D</div>
    </div>
  `;
  return GroupBox;
}

// SettingsInput();

// onClickSettingsCardImg(".settings__box_main1");
// onClickSettingsCardImg(".settings__box_main");

function onClickSettingsColor() {
  let form__color = [...$(".form__color")];
  form__color.map((item) => {
    $(item).on("click", function (event) {
      const color = $(event.target).data("color");
      $(item)
        .parents(".settings__box_main_content")
        .find(".form__color")
        .removeClass("form__color-active");
      $(event.target).addClass("form__color-active");
      $(event.target)
        .parents(".settings__box_main")
        .children("input[type=hidden]")
        .val(color);


    let string_params = $(".constructor_setings").serializeArray();
 
    chengeURL(string_params)
    });


  });
}
onClickSettingsColor();

$(".settings__category").on("click", function () {
  const tab_item = $(this).data("tab_header");

  $(`.settings__parameters`).removeClass("settings__parameters-active");
  $(`[data-tab_main="${tab_item}"]`).addClass("settings__parameters-active");

  $(".settings__category").removeClass("settings__category-active");
  $(this).addClass("settings__category-active");
  resizeTringleCategories()
  $(".settings__categories_wrap").removeClass(
    "settings__categories_wrap-active"
  );

  setTimeout(function () {
    onChengeSetingsHeight();
  }, 400);
});


onBackMobile();

setTimeout(function () {
  onChengeSetingsHeight();
}, 300);



$(window).resize(function () {
  var width = $(window).width();
});

startConstructor();

function startConstructor() {
  form_color(".form__color");
  onClickSettingsCardImg(".settings__box_main1");
  onClickSettingsCardImg(".settings__box_main");
  onChengeRadioV1(".settings__box_main");
  onClickSettingsColor();
  SettingsInput();
  onClickCheckboxOptions('.constructor_setings');
  onClickRadio_v1();

  onChengeIframe();
  
  onLoadInfoRemote();
  onBackMobile();
  resizeTringleCategories()
}


function reportWindowSize() {
  resizeTringleCategories()
}

window.onresize = reportWindowSize;