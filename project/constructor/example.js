radio_small
radio_color
radio_img
checkbox_options


side_panels
side_panels_colors
seat_type
seat_type_color
fork_type
fork_type_color
shock_absorber
shock_absorber_color
wheel_size
wheel_size_color
turn
signaking
gps_trecer
mirror
pedal
footboard
trunk
brake_type
motor
controller
rear_star





// https://starway.atlassian.net/wiki/spaces/ELEEK/pages/54689826
color_object = [
  { value_id: "blask", value: "#000000" },
  { value_id: "greey", value: "#919191" },
  { value_id: "yelow", value: "#ffff00" },
  { value_id: "yelow", value: "#bc0a0a" },
];
group: [
  {
    name: "Бокові панелі", // - назва групи,
    parameters: [   // параметри групи 
      {
        name: "Товщина",  // - назва категорії,
        type: "radio_small",  // - тип категорії (radio_small,radio_img,radio_color,checkbox_options ),
        code: "side_panels", // - код категорії назва name в input
        values: [
          {
            name: "120 мм", // - назва для виводу
            price: "350 грн", // -  ціна для виводу
            value_id: "1", // - id || code для відсилання на сервер
            img_value:'', // url для картинки якщо, тип категорії radio_img 
          },
          {
            name: "120 мм", // - назва для виводу
            price: "350 грн", // -  ціна для виводу
            value_id: "1", // - id || code для відсилання на сервер
            img_value:'', // url для картинки якщо, тип категорії radio_img 
            childrens_group:{
              wheel_size:['size_18','size_20','size_24','size_26'],
            }, // {name_categore:[value_id,value_id,value_id,value_id],name_categore:[value_id,value_id,value_id,value_id]} 
          },
        ],
      },
    ],
  },
],

export const default_value = {
  iframe: {
    name: "Тип рами",
    properties: [
      {
        name: "Ekroos",
        value: "ekroos",
        img_value: "./../../static/source/img/constructor/setings/frame_1.jpg",
      },
      {
        name: "Lite",
        value: "lite",
        img_value: "./../../static/source/img/constructor/setings/frame_2.jpg",
      },
      {
        name: "PozitiffMD",
        value: "PozitiffMD",
        img_value: "./../../static/source/img/constructor/setings/frame_3.jpg",
      },
      {
        name: "NEO",
        value: "neo",
        img_value: "./../../static/source/img/constructor/setings/frame_4.jpg",
      },
    ],
  },
  iframe_type: {













    Ekross:{
      properties: {
        tab_1: {
          iframe_color: color_object,
          group: [
            {
              name: "Бокові панелі",
              parameters: [
                {
                  name: "Товщина",
                  type: "radio_small",
                  code: "side_panels",
                  values: [
                    {
                      name: "120 мм",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "140 мм",
                      price: "320 грн",
                      value_id: "1",
                    },
                    {
                      name: "170 мм",
                      price: "320 грн",
                      value_id: "1",
                    },
                  ],
                },
                {
                  name: "Колір панелей",
                  type: "radio_color",
                  code: "side_panels_colors",
                  values: color_object,
                },
              ],
            },
            {
              name: "Cидіння",
              parameters: [
                {
                  name: "Тип сидіння",
                  type: "radio_small",
                  code: "",
                  values: [
                    {
                      name: "Мото",
                      price: "350 грн",
                      value_id: "3211",
                    },
                    {
                      name: "Вело",
                      price: "320 грн",
                      value_id: "1123",
                    },
                  ],
                },
                {
                  name: "Колір панелей",
                  type: "radio_color",
                  code: "seat_type_color",
                  values: color_object,
                },
              ],
            },
          ],
        },
        tab_2: {
          name_section:"Підвіска",
          group: [
            {
              name: "Вилки",
              parameters: [
                {
                  name: "Тип вилки",
                  type: "radio_img",
                  code: "",
                  values: [
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Сатурн",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Зум",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "DNM",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
                {
                  name: "Колір панелей",
                  type: "radio_color",
                  code: "fork_type_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Амортизатори",
              parameters: [
                {
                  name: "Амортизатор",
                  type: "radio_img",
                  code: "shock_absorber",
                  values: [
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Сатурн",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Зум",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "DNM",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
                {
                  name: "Колір амортизатора",
                  type: "radio_color",
                  code: "shock_absorber_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Колеса",
              parameters: [
                {
                  name: "Розмір колеса",
                  type: "radio_small",
                  code: "wheel_size",
                  values: [
                    {
                      name: '18"',
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: '26"',
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
                {
                  name: "Колір колеса",
                  type: "radio_color",
                  code: "wheel_size_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Гальма",
              parameters: [
                {
                  name: "Тип гальм",
                  type: "radio_img",
                  code: "brake_type",
                  values: [
                    {
                      name: "Мото",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Вело",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
          ],
        },
        tab_3: {
          name_section:"Додаткові комплектуючі",
          group: [
            {
              name: "",
              parameters: [
                {
                  name: "Мотор",
                  type: "radio_small",
                  code: "motor",
                  values: [
                    {
                      name: "350 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "1000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "5000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Контролер",
                  type: "radio_small",
                  code: "controller",
                  values: [
                    {
                      name: "evel 48V 40A",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Kelly lks 7230s",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Зірка задня",
                  type: "radio_small",
                  code: "rear_star",
                  values: [
                    {
                      name: "41Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "50Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "60Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "Опції",
              type: "checkbox_options",
              parameters: [
                {
                  // name: "Зірка задня",
                  type: "checkbox_options",
                  // code: "rear_star",
                  values: [
                    {
                      name: "ПОВОРОТ",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "CИГНАЛІЗАЦІЯ",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "GPS трекер",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Дзеркала",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Педальний привід",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Підножка",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },




















    Lite:{
      properties: {
        tab_1: {
          iframe_color: color_object,
          group: [
          ],
        },
        tab_2: {
          name_section:"Підвіска",
          group: [
            {
              name: "Вилки",
              parameters: [
                {
                  name: "Тип вилки",
                  type: "radio_img",
                  code: "fork_type",
                  values: [
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Сатурн",
                      price: "350 грн",
                      value_id: "SATURN",
                      childrens_group:{wheel_size:['size_20','size_26']},
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "Зум",
                      price: "350 грн",
                      value_id: "ZYM",
                      childrens_group:{wheel_size:['size_18','size_20','size_24','size_26']},
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "DNM",
                      price: "350 грн",
                      value_id: "DNM",
                      childrens_group:{wheel_size:['size_18','size_20','size_24','size_26']},
                    },
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "DNM FAT",
                      price: "350 грн",
                      value_id: "DNM_FAT_1",
                      childrens_group:{wheel_size:['size_26_FAT']},
                    },
                  ],
                },
                {
                  name: "Колір вилки",
                  type: "radio_color",
                  code: "fork_type_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Колеса",
              parameters: [
                {
                  name: "Розмір колеса",
                  type: "radio_small",
                  code: "wheel_size",
                  values: [
                    {
                      name: '18"',
                      price: "350 грн",
                      value_id: "size_18",
                      
                    
                    },
                    {
                      name: '20"',
                      price: "350 грн",
                      value_id: "size_20",
                       
                    },
                    {
                      name: '24"',
                      price: "350 грн",
                      value_id: "size_24", 
                    },
                    {
                      name: '26"',
                      price: "350 грн",
                      value_id: "size_26", 
                    },
                    {
                      name: '26 FAT',
                      price: "350 грн",
                      value_id: "size_26_FAT", 
                    },
                  ],
                },
                {
                  name: "Колір колеса",
                  type: "radio_color",
                  code: "wheel_size_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Гальма",
              parameters: [
                {
                  name: "Тип гальм",
                  type: "radio_img",
                  code: "brake_type",
                  values: [
                    {
                      name: "Мото",
                      price: "350 грн",
                      value_id: "Moto",
                    },
                    {
                      name: "Вело",
                      price: "350 грн",
                      value_id: "Velo",
                    },
                  ],
                },
              ],
            },
          ],
        },
        tab_3: {
          name_section:"Додаткові комплектуючі",
          group: [
            {
              name: "",
              parameters: [
                {
                  name: "Мотор",
                  type: "radio_small",
                  code: "motor",
                  values: [
                    {
                      name: "350 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "1000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "5000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Контролер",
                  type: "radio_small",
                  code: "controller",
                  values: [
                    {
                      name: "evel 48V 40A",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Kelly lks 7230s",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Зірка задня",
                  type: "radio_small",
                  code: "rear_star",
                  values: [
                    {
                      name: "41Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "50Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "60Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "Опції",
              type: "checkbox_options",

              parameters: [
                {
                  // name: "Зірка задня",
                  type: "checkbox_options",
                  // code: "rear_star",
                  values: [
                    {
                      name: "ПОВОРОТ",
                      price: "350 грн",
                      code: "turn",
                    },
                    {
                      name: "CИГНАЛІЗАЦІЯ",
                      price: "350 грн",
                      code: "signaking",
                    },
                    {
                      name: "GPS трекер",
                      price: "350 грн",
                      code: "gps_trecer",
                    },
                    {
                      name: "Дзеркала",
                      price: "350 грн",
                      code: "mirror",
                    },
                    {
                      name: "Педальний привід",
                      price: "350 грн",
                      code: "pedal_drive",
                    },
                    {
                      name: "Підножка",
                      price: "350 грн",
                      code: "footboard",
                    },
                    {
                      name: "Багажник",
                      price: "350 грн",
                      code: "trunk",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },




















    Pozitiff:{
      properties: {
        tab_1: {
          iframe_color: color_object,
          group: [
          ],
        },
        tab_2: {
          name_section:"Підвіска",
          group: [
            {
              name: "Вилки",
              parameters: [
                {
                  name: "Тип вилки",
                  type: "radio_img",
                  code: "fork_type",
                  values: [
                    {
                      img_value:
                        "./../../static/source/img/constructor/setings/frame_4.jpg",
                      name: "DNM USD 8 ",
                      price: "350 грн",
                      value_id: "DNM_USD_8 ",
                    },
                     
                  ],
                },
                {
                  name: "Колір вилки",
                  type: "radio_color",
                  code: "fork_type_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Колеса",
              parameters: [
                {
                  name: "Розмір колеса",
                  type: "radio_small",
                  code: "wheel_size",
                  values: [
                    {
                      name: 'переднє 19" - заднє 17"',
                      price: "350 грн",
                      value_id: "1",
                       
                    },
                   
                    
                  ],
                },
                {
                  name: "Колір колеса",
                  type: "radio_color",
                  code: "wheel_size_color",
                  values: color_object,
                },
              ],
            },
            {
              name: "Гальма",
              parameters: [
                {
                  name: "Тип гальм",
                  type: "radio_img",
                  code: "brake_type",
                  values: [
                    {
                      name: "Мото",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Вело",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
          ],
        },
        tab_3: {
          name_section:"Додаткові комплектуючі",
          group: [
            {
              name: "",
              parameters: [
                {
                  name: "Мотор",
                  type: "radio_small",
                  code: "motor",
                  values: [
                    {
                      name: "350 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "1000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "5000 Вт",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Контролер",
                  type: "radio_small",
                  code: "controller",
                  values: [
                    {
                      name: "evel 48V 40A",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Kelly lks 7230s",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "",
              parameters: [
                {
                  name: "Зірка задня",
                  type: "radio_small",
                  code: "rear_star",
                  values: [
                    {
                      name: "41Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "50Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "60Т",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
            {
              name: "Опції",
              type: "checkbox_options",

              parameters: [
                {
                  // name: "Зірка задня",
                  type: "checkbox_options",
                  // code: "rear_star",
                  values: [
                    {
                      name: "ПОВОРОТ",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "CИГНАЛІЗАЦІЯ",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "GPS трекер",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Дзеркала",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Педальний привід",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Підножка",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "Багажник",
                      price: "350 грн",
                      value_id: "1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },





















    Neo: { 
      properties: {
        tab_1: {
          iframe_color: color_object,
          group: [
            
            
          ],
        },
        tab_2: {
          name_section:"Підвіска",
          group: [
            
            {
              name: "Колеса",
              parameters: [
                {
                  name: "Тип колеса",
                  type: "radio_small",
                  code: "wheel_size",
                  values: [
                    {
                      name: 'Слікові',
                      price: "350 грн",
                      value_id: "1",
                       
                    },
                    {
                      name: 'Агресивні',
                      price: "350 грн",
                      value_id: "1",
                       
                    },
                   
                    
                  ],
                },
                {
                  name: "Колір колеса",
                  type: "radio_color",
                  code: "wheel_size_color",
                  values: color_object,
                },
              ],
            },
            
          ],
        },
        tab_3: {
          name_section:"Додаткові комплектуючі",
          group: [
            
          
            
            {
              name: "Опції",
              type: "checkbox_options",

              parameters: [
                {
                  // name: "Зірка задня",
                  type: "checkbox_options",
                  // code: "rear_star",
                  values: [
                    {
                      name: "ДОДАТКОВА БАТАРЕЯ",
                      price: "350 грн",
                      value_id: "1",
                    },
                    {
                      name: "БРИЗГОВИК",
                      price: "350 грн",
                      value_id: "1",
                    },
                    
                  ],
                },
              ],
            },
          ],
        },
      },
    },














  }
};


