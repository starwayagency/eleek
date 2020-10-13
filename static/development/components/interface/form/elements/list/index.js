import "./index.scss";



// $(".form_box__item").on("click", function () {
//   $(this).toggleClass("form_box__item-active");
//   let item_input = $(this).find("input");

//   if (item_input.prop("checked") == true) {
//     item_input.prop("checked", false);
//   } else {
//     item_input.prop("checked", true);
//   }

//   let form_box__header = $(this).parents(".form_box").find(".form_box__header");

//   let box_item = $(this).parents(".form_box__main").find(".form_box__item");

//   if (box_item.length > 0) {
//     let count_item_active = 0;

//     for (const key in box_item) {
//       if (box_item.hasOwnProperty(key)) {
//         if (
//           $(box_item[key]).hasClass("form_box__item") &&
//           $(box_item[key]).hasClass("form_box__item-active")
//         ) {
//           count_item_active++;
//         }
//       }
//     }

//     if (count_item_active == box_item.length) {
//       form_box__header.addClass("form_box__header-active");
//     } else {
//       form_box__header.removeClass("form_box__header-active");
//     }
//   }
// });
 
$(".form_box__header").on("click", function () {
  let this_box = $(this);
  $(this).toggleClass("form_box__header-active");
  let item_input = $(this).find(".form_box__header-input");

  if (item_input.length > 0) {
    if (item_input.prop("checked") == true) {
      item_input.prop("checked", false);
    } else {
      item_input.prop("checked", true);
    }

    let box_item = $(this)
      .parents(".form_box")
      .find(".form_box__main")
      .find(".form_box__item");

    if (box_item.length > 0) {
      Object.values(box_item).reduce(function (
        previousValue,
        currentItem,
        index,
        arr
      ) {
        if ($(currentItem).hasClass("form_box__item")) {
          if (this_box.hasClass("form_box__header-active")) {
            console.log("step1");

            if (!$(currentItem).hasClass("form_box__item-active")) {
              console.log("step1");

              $(currentItem).addClass("form_box__item-active");
              let item_input = $(currentItem).find("input");
              item_input.prop("checked", true);
            }
          } else {
            console.log("step2");

            if ($(currentItem).hasClass("form_box__item-active")) {
              console.log($(currentItem));

              $(currentItem).removeClass("form_box__item-active");
              let item_input = $(currentItem).find("input");
              item_input.prop("checked", false);
            }
          }
        }
      },
      0);
    }
  }
});
