export const onLoadInfoActive = () => {
  $(".settings__box_main").addClass("settings__box_main-hidden");
  $(".settings__box_main").addClass("settings__box_main-loader");
};
export const onLoadInfoRemote = () => {
  $(".settings__box_main").removeClass("settings__box_main-hidden");
  $(".settings__box_main").removeClass("settings__box_main-loader");
};

export const chengeURL = (data) => {
  let objectParameter = {};

  data.map((item) => {
    if (item.name != "undefined") {
      objectParameter[item.name] = item.value;
    }
  });
  let back_url = createUrl(objectParameter);

  // let back_url = createUrl(config_model).slice(1);

  history.pushState(null, null, `/page1/?${back_url}`);
};

export const onClickSettingsCardImg = (parent_box) => {
  // Переключення карточок з фото
  $(".settings__card_img").on("click", function () {
    let paretnConteiner = $(this).parents(parent_box);
    let neighboringElements = $(this).parents(parent_box).find(".form__radio");
    let cardFormRadio = $(this).parent().children(".form__radio");
    let value = cardFormRadio.data("value");
console.log(cardFormRadio );

    if (!!cardFormRadio.data("childrens")) {
      let children_element = cardFormRadio.data("childrens");

      childrensСonnections(children_element);
    } else {

    }

    neighboringElements.removeClass("form__radio-active");

    cardFormRadio.addClass("form__radio-active");

    paretnConteiner.children("input[type=hidden]").val(value);

    let input_name = paretnConteiner.children("input[type=hidden]")[0];

    if (!!input_name && input_name.name != "iframe_type") {
      let string_params = $(".constructor_setings").serializeArray();
      chengePrice(string_params);
    }
    let string_params = $(".constructor_setings").serializeArray();

    chengeURL(string_params);
  });
};

export const onChengeRadioV1 = (parent_box) => {
  $(".form__radio").on("click", function () {

   
    if (!$(this).hasClass("form__radio-hiden")) {
     
      let value = $(this).data("value");

      $(this).parents(parent_box).children("input[type=hidden]").val(value);

      const setingsName = $(this)
        .parents(parent_box)
        .children("input[type=hidden]")[0].name;

      // if (setingsName === "seat_type") {
      //   $(`input[name='trunk']`)
      //     .parents(".form_box__item")
      //     .addClass("form_box__item-hidden");
      //   let data_children = $(this).data("childrens");
      //   Object.keys(data_children).map((key) => {
      //     if (!!data_children[key]) {
      //       data_children[key].map((item) => {
      //         $(`input[name='${item}']`)
      //           .parents(".form_box__item")
      //           .removeClass("form_box__item-hidden");
      //       });
      //     }
      //   });
      // }
    }
    let string_params = $(".constructor_setings").serializeArray();

    chengePrice(string_params);

    chengeURL(string_params);
  });
};

export const clearGroup = (className) => {
  // Очистка груп конструктора перед вставкою нових елементів
  [...$(className).children()].map((item) => {
    if (!item.classList.contains("settings__group-start")) {
      item.remove();
    }
  });
};


function createUrl(config_model) {
  let back_url = Object.keys(config_model)
    .map((key) => {
      return `${key}=${encodeURIComponent(config_model[key])}`;
    })
    .join("&");
  return back_url;
}

export function chengePrice(data) {
  let objectParameter = {};

  data.map((item) => {
    if (item.name != "undefined") {
      objectParameter[item.name] = item.value;
    }
  });

  // fetch(`/api/get_price/?${getFormatUrl(objectParameter)}`)
  //   .then((response) => {
  //     if (response.status >= 400 && response.status < 600) {
  //       throw new Error("Bad response from server fond price");
  //     }
  //     return response.json();
  //   })
  //   .then((response) => {
  //     function triplets(str) {
  //       // \u202f — неразрывный узкий пробел
  //       return str
  //         .toString()
  //         .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1\u202f");
  //     }
  //     $(".settings__parameters_navigation")
  //       .find(".price")
  //       .children(".value")
  //       .text(`${triplets(response.price)} грн`);
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });
}

export function onClickCheckboxOptions() {
  $(".form_box__item").on("click", function () {
     
    if (!$(this).hasClass("form_box__item-hidden")) {
      $(this).toggleClass("form_box__item-active");
      let item_input = $(this).find("input");

      if (item_input.prop("checked") == true) {
        item_input.prop("checked", false);
      } else {
        item_input.prop("checked", true);
      }

      let string_params = $(".constructor_setings").serializeArray();

      chengePrice(string_params);

      chengeURL(string_params);
    }
  });
}


export const childrensСonnections = (children_element) => {
  $(`input[name='protection']`)
    .parents(".form_box__item")
    .addClass("form_box__item-hidden");

  $(`input[name='trunk']`)
    .parents(".form_box__item")
    .addClass("form_box__item-hidden");

  for (const key in children_element) {
    if (children_element.hasOwnProperty(key)) {
       
      if (key != "checkbox_options") {
        const element = children_element[key];
 
        let data_element = $(`[data-input_value="${key}"]`);
 
        if (data_element.hasClass("settings__box_main-radio")) {
          let all_elements = [
            ...data_element
              .find(".form__radio")
              .removeClass("form__radio-active"),
          ];

          console.log(all_elements );
          


          let flag = true;
          all_elements.map((item) => {
            let inputValue = $(item).data("value");

            if (element.indexOf(inputValue) != -1) {
              $(item).removeClass("form__radio-hiden");

              if (!!flag) {
                flag = false;
                $(item).addClass("form__radio-active");
                $(item)
                  .parents(".settings__box_main")
                  .children("input[type=hidden]")
                  .val(inputValue);

                if (!!$(item).data("childrens")) {
                  let children_element = $(item).data("childrens");

                  childrensСonnections(children_element);
                }
              }
            } else {
              $(item).addClass("form__radio-hiden");
              $(item).removeClass("form__radio-active");
            }
          });
        } else {
        }
      } else {
        const element = children_element[key];

        if (element.indexOf("protection") != -1) {
          $(`input[name='protection']`)
            .parents(".form_box__item")
            .removeClass("form_box__item-hidden");
        }
        if (element.indexOf("trunk") != -1) {
          $(`input[name='trunk']`)
          .parents(".form_box__item")
           
            .removeClass("form_box__item-hidden");
        }
 
      }
    }
  }
};
export const resizeTringleCategories = () => {
  $(".settings__category_hover_triangl").removeAttr("style");
  $(".settings__category_hover").removeAttr("style");
  $(".settings__category_hover_sqar").removeAttr("style");

  [...$(".settings__category")].map((item) => {
    if (!!$(item).hasClass("settings__category-active")) {
      let width_triangle = item.offsetHeight * 0.7;

      let width_setingts = $(item)[0].offsetWidth;

      $(item).find(".settings__category_hover_triangl").width(width_triangle);
      $(item).find(".settings__category_hover_triangl").height(width_triangle);
      $(item)
        .find(".settings__category_hover")
        .width(width_triangle + width_setingts);
      $(item).find(".settings__category_hover_sqar").width(width_setingts);
    }
  });
};

function getFormatUrl(config_model) {
  let URL = Object.keys(config_model)
    .map((key) => {
      return `${key}=${encodeURIComponent(config_model[key])}`;
    })
    .join("&");
  return URL;
}

export const onSelectFirstItem = () => {
  let settingsBox = [...$(".settings__box_main")];

  settingsBox.map((item) => {
    let flag = false;

    if ($(item).hasClass("settings__box_main-card")) {
      if (!flag) {
        let flagActiveElement = true;
        [...$(item).find(".form__radio")].map((item) => {
          if ($(item).hasClass("form__radio-active")) {
            flagActiveElement = false;
          }
        });

        if (!!flagActiveElement) {
          $($(item).find(".form__radio")[0]).addClass("form__radio-active");

          let element = $($(item).find(".form__radio")[0]);
          let children_element = element.data("childrens");
          let elementValue = element.data("value");

          $(element)
            .parents(".settings__box_main")
            .children("input[type=hidden]")
            .val(elementValue);

          childrensСonnections(children_element);
        }
      }
    } else if ($(item).hasClass("settings__box_main-color")) {
      if (!flag) {
        let element = $($(item).find(".form__color")[0]);
        let elementValue = element.data("color");

        element.addClass("form__color-active");

        $(element)
          .parents(".settings__box_main")
          .children("input[type=hidden]")
          .val(elementValue);
      }
    } else if ($(item).hasClass("settings__box_main-radio")) {
      if (!flag) {
        let flagActiveElement = true;
        [...$(item).find(".form__radio")].map((item) => {
          if ($(item).hasClass("form__radio-active")) {
            flagActiveElement = false;
          }
        });

        if (!!flagActiveElement) {
          $($(item).find(".form__radio")[0]).addClass("form__radio-active");

          let element = $($(item).find(".form__radio")[0]);
          let children_element = element.data("childrens");
          let elementValue = element.data("value");

          $(element)
            .parents(".settings__box_main")
            .children("input[type=hidden]")
            .val(elementValue);

          childrensСonnections(children_element);
        }
      }
    }
  });

  let string_params = $(".constructor_setings").serializeArray();

  chengePrice(string_params);
};

export const onBackMobile = () => {
  if ($(window).width() <= 800) {
    $(".settings__group_back").on("click", function () {
      $(".settings")[0].style.minHeight = 25 + "px";

      $(".settings__categories_wrap").addClass(
        "settings__categories_wrap-active"
      );
    });
  }
};
export const onChengeSetingsHeight = () => {
  if ($(window).width() <= 800) {
    let settings_heights = $(".settings__parameters_wrap")
      .find(".settings__parameters-active")
      .outerHeight();

    $(".settings")[0].style.minHeight = settings_heights + 25 + "px";
  }
};
