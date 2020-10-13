import "./index.scss";

// let form__color = [...$(".form__color")];

// form__color.map((item) => {
//   const color = $(item).data("color");
//   switch (color) {
//     case "#ffffff":
//       $(item).css({ background: color, border: "1px solid #979797" });
//       break;
//     default:
//       $(item).css({ background: color });
//       break;
//   }
// });

export function form_color(class_name){
  let form__color = [...$(class_name)];
  form__color.map((item) => {
    const color = $(item).data("color");
    switch (color) {
      case "#ffffff":
        $(item).css({ background: color, border: "1px solid #979797" });
        break;
      default:
        $(item).css({ background: color });
        break;
    }
  });
}
form_color('.form__color');