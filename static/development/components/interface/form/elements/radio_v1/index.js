import "./index.scss";
import { childrensСonnections } from "../../../../pages/constructor_setings/helpersEvent";

 

export function onClickRadio_v1(){
  $(".form__radio").on("click", function () {
 
    if(!$(this).hasClass('form__radio-hiden')){
      $(this).parents('.settings__box_main_content').find('.form__radio').removeClass("form__radio-active");
      $(this).addClass("form__radio-active");
 
      let cardFormRadio = $(this);
    
      if (!!cardFormRadio.data("childrens")) {
        let children_element = cardFormRadio.data("childrens");
  
        childrensСonnections(children_element);
      }
    }
   
   
  });
  
}
onClickRadio_v1();