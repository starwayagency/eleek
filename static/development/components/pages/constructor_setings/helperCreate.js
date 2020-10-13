export const creatingSettings = (group) => {
 
  return `
  
    <div class="settings__group">

      <div class="settings__group_title">${group.name}</div>
      ${createSettingsBox(group.parameters)}
    </div>
    `;
}

export const createSettingsBox = (parameters) => {
  let SetingsBox = "";
 
  parameters.map((item) => {
    let params = checkCardType(item);

     
    SetingsBox += `<div class="settings__box">
      <div class="settings__box_title">${!!item.name ? item.name : ""}</div>
      <div class="settings__box_main   ${params.tupeBox}" data-input_value="${
      item.code
    }">
        <div class="settings__box_loader">
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        ${item.code!='checkbox_options'?`<input type="hidden" value="" name="${item.code}"  >`:''}
        
        <div class="settings__box_main_content">
           ${params.elemens}
        </div>
      </div>
    </div>`;
  });
  return SetingsBox;
}

export const createCheckboxOptions = (properte) => {
 
  return ` <div class="settings__group settings__group-start">
    <div class="form_box__item form_box__item-black_bord2">
      <svg class="plus"  width="9" height="9" viewBox="0 0 9 9" >
        <path fill="#242321" fill-rule="evenodd"  d="M5 0v4h4v1H5v4H4V5H0V4h4V0h1z" ></path>
      </svg>
  
      <div class="name"> ${properte.name} </div>
      <input type="checkbox" name="${properte.code}" value="true" id="" />
    </div></div>`;
}

export const createColor = (properte) => {
  return ` <div class="form__color" data-color="${properte.color}">
   <div class="form__color_check">
     <img src="./../../static/source/img/interface/check.svg" />
   </div>
  </div>`;
}

export const createRadioSmal = (properte) => {

  return ` <div class="form__radio" ${!!properte.childrens_group?`data-childrens=${JSON.stringify(properte.childrens_group)}`:''}  data-value="${properte.code}">
    <div class="form__radio_check"></div>
    <div class="form__radio_main">
      <div class="form__radio_title">${properte.name}</div>
      <div class="form__radio_price">${properte.price}</div>
    </div> 
  </div>`;
}
 
export const createRadioImg = (properte) => {

  return `<div class="settings__card">
    <div class="settings__card_img">
      <img
        src="${properte.img_value}"
        alt=""
      />
    </div>
    <div class="form__radio" data-childrens=${JSON.stringify(properte.childrens_group)} data-value="${properte.code}">
      <div class="form__radio_check"></div>
      <div class="form__radio_main">
        <div class="form__radio_title">${properte.name}</div>
        <div class="form__radio_price">${properte.price}</div>
      </div>
    </div>
  </div>`;
}



export const  checkCardType=(item)=> {
    let obj = { elemens: "", tupeBox: "" };
    if (item.type === "radio_img") {
      item.values.map((RadioImg) => {
        obj.elemens += createRadioImg(RadioImg);
      });
      obj.tupeBox = "settings__box_main-card";
    } else if (item.type === "radio_color") {
      item.values.map((color) => {
        obj.elemens += createColor(color);
      });
      obj.tupeBox = "settings__box_main-color";
    } else if (item.type === "radio_small") {
      item.values.map((item) => {
        obj.elemens += createRadioSmal(item);
      });
      obj.tupeBox = "settings__box_main-radio";
    } else if (item.type === "checkbox_options") {
      item.values.map((item) => {
        obj.elemens += createCheckboxOptions(item);
      });
      obj.tupeBox = "settings__box_main-checkbox";
    }
    return obj;
  }
  
  