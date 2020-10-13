import './index.scss'


if($('input[type="tel"]').length>0){
  
    $('input[type="tel"]').mask("+38(999) 99 99 999");
}
   
    



let lang_site;
let curr_lang;
let curr_lang_length;;
lang_site = location_leng();
switch (lang_site) {
    case 'uk':
    curr_lang = "Поле повинно містити лише букви";
    curr_lang_length = "Поле повинно містити більше 6 символів";
    break;
    case 'ru':
    curr_lang = 'Поле должно содержать только буквы';
    curr_lang_length = "Поле должно содержать более 6 символов";

    break;
    case 'en':
    curr_lang = 'The field must contain only letters';
    curr_lang_length = "Field must contain more than 6 characters";

    break;
    default:
    curr_lang = "Поле повинно містити лише букви.";
    curr_lang_length = "Поле повинно містити більше 6 символів";

}


jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /[^0-9]+$/i.test(value);
  }, curr_lang); 

  
jQuery.validator.addMethod("minLength", function(value, element) {
    if (value.length < 6) {
      return false
    } else {
      return true
    }
}, curr_lang_length); 



$(function() {
  Onload();
})
// /**
//  * valide_form - Валідація форм
//  * @param {selector form} ID Форми на яку підвішують валідацію
//  * @param {class name} class групи куди виводять помилки
//  * @param {bull} true Чи виводи вспливайку пісял відповіді ajax
//  *
//  **/
function Onload() {

  // var more_form = $('.mini-user-form');

  // for (var testz = 0; testz < more_form.length; testz++) {
  //     var tehas = more_form[testz];
  //     var dinamic_id = 'active_form' + testz;
  //     $(tehas).attr('id', dinamic_id);
  //     var dinamic_main_id = '#' + $(tehas).attr('id');
  //     console.log(dinamic_main_id);
  //     valide_form(dinamic_main_id, '.inp-mini-wrap', false);
  // }
  valide_form('.footer_form', '.inp-vak-wrap', true);
  valide_form('#comment_form', '.inp-vak-wrap', false);
  valide_form('.registery_form', '.inp-vak-wrap', false);
  valide_form('.drive__form_last', '.inp-vak-wrap', true);
  valide_form('.drive__form', '.inp-vak-wrap', true);
  valide_form('.form_cons', '.inp-vak-wrap', true);
  valide_form('#form_qustion', '.inp-vak-wrap', true);
  valide_form('#form_cons', '.inp-vak-wrap', true);
  valide_form('#order__form_constructor', '.inp-vak-wrap', true);

  
}

function location_leng() {
  return location.pathname.split('/')[1];
}
function valide_form(id_form, error_inp_wrap, check_request) {
  var modal = false;
  var check_request = check_request;
  let check_pass = true;
  if ($(id_form).hasClass('change_profile')) {
    check_pass = false;
  } else {
    check_pass = true;
  }
  console.log('check_pass: ', check_pass);

  if ($(id_form).length > 0) {
      var lang_site;
      var error_text = {};

      lang_site = location_leng();
      switch (lang_site) {
          case 'uk':
          error_text.required = 'Поле обов\'язково для заповнення';
          error_text.email = 'Поле має містити email';
          break;
          case 'ru':
          error_text.required = 'Поле обязательно для заполнения';
          error_text.email = 'Поле должно содержать email';
          break;
          case 'en':
          error_text.required = 'The field is required';
          error_text.email = 'The field must contain an email';
          break;
          default:
          error_text.required = 'Поле обов\'язково для заповнення.';
          error_text.email = 'Поле має містити email.';
      }
      $(id_form).validate({
          errorPlacement: function (event, validator) {
              console.log(validator);
              $(validator).parents(error_inp_wrap).append($(event));
          },
          rules: {
             
              email: {
                  required: true,
                  email: true,
              },
              name: {
                  required: true,
                  lettersonly: true
              },
              first_name: {
                  required: true,
                  lettersonly: true
              },
              contact_name: {
                  required: true,
                  lettersonly: true
              },
              username: {
                  required: true,
              },
              adress: {
                  required: true,
              },
              old_password: {
                  required: true,
              },
              pass1: {
                  required: check_pass,
                  minLength: check_pass
              },
              password2: {
                required: check_pass,
                minLength: check_pass
              },
              address: {
                  required: true,
                  lettersonly: true

              },
              phone_number: {
                  required: true,
              },
              phone: {
                  required: true,
              },
              password: {
                required: true,
              },
              
              pas1: {
                  required: true,
              },
              pas2: {
                  required: true,
              },
           },
           messages: {
              email: {
                  required: error_text.required,
                  email: error_text.email
              },
              name: {
                  required: error_text.required,
              },
              first_name: {
                  required: error_text.required,
              },
              address: {
                  required: error_text.required,
              },
              adress: {
                  required: error_text.required,
              },
              old_password: {
                  required: error_text.required,
              },
              pass1: {
                  required: error_text.required,
              },
              username: {
                  required: error_text.required,
              },
              phone_number: {
                  required: error_text.required,
              },
              phone: {
                  required: error_text.required,
              },
              password: {
                required: error_text.required,
              },
              password2: {
                required: error_text.required,
              },
              pas1: {
                  required: error_text.required,
              },
              pas2: {
                  required: error_text.required,
              },
           },
           submitHandler: function(form) {
             console.log('form: ', form);
              event.preventDefault();
               $('.load_spin').addClass('load_spin_active');
               var form_input = $(form).serializeArray();
               var url_form = form.action;
               var form_json = {};
               $(form_input).each(function(index, obj) {
                  form_json[obj.name] = obj.value;
                  
                });


                var pass_checked = true;
                var pass_finder = $('.login_pass2').length; 

                if (pass_finder == 1) {
                  console.log('(1', $('.login_pass').val().length);
                  console.log('(2', $('.login_pass2').val().length);
                  if ($('.login_pass').val().length >= 1) {
                    var pass_1 = $('.login_pass').val();
                    var pass_2 = $('.login_pass2').val();
                        pass_checked = false;
                    if (pass_1 == pass_2) {
                      if ($('.login_pass').val().length < 6 && $('.login_pass2').val().length < 6) {
                        pass_checked = false;
                        event.preventDefault();
                        $('.load_spin').removeClass('load_spin_active');
                        $.fancybox.close();
                       $('.pass_checked_error').text('ваш пароль повинен містити не меньше 6 симовлів');
                      } else {
                        $('.pass_checked_error').text('');
                        pass_checked = true;
                      }
                    } else {
                        pass_checked = false;
                         event.preventDefault();
                         $('.load_spin').removeClass('load_spin_active');
                         $.fancybox.close();
                        $('.pass_checked_error').text('паролі не співпадають');
                    }
                  } else {
                    $('.pass_checked_error').text('');
                    pass_checked = true;
                  }
                }
        
                  console.log(form_json);
                if(url_form != '' && pass_checked == true){
                  console.log('url_form: ', url_form);
                 
                  let current_method = 'POST';
                  
                    if ($(form).hasClass('PATCH')) {
                      current_method = 'PATCH';
                      modal = true;
                    } else {
                      current_method = 'POST';
                      modal = false;
                    }
                 
                  fetch(url_form, {
                    method: current_method,
                    body: new URLSearchParams($.param(form_json)),
                    // headers: {
                    //   "Content-Type": "application/json",
                    //   "Accept": "application/json"
                    // },
                  })
                  .then(data => {
                    return data.json();
                  })
                  .then(data => {
                    console.log('data: ', data);
                    console.log('tut?');
                    if(data.status=='OK' && typeof data['status'] !== "undefined"){
                      
                        sayHi();
                    }
                    if(data.status=='BAD' && typeof data['status'] !== "undefined"){
                        $('.load_spin').removeClass('load_spin_active');
                        $(".error_block_false").text("Невірний логін або пароль");

                        $('.login_checked_error').text(data.error_fields.username);
                        $('.login_checked_error').text(data.error_fields.email);
                        console.log('$(): ', $('.login_checked_error'));
                        // if (typeof data['error_field'] == "undefined") {
                          
                        //   console.log('tuta');
                        // }
                     
                    }
        
                    if(typeof data['url'] !== "undefined" && data.url!=''){
                      //   sayHi();
                        location.href=data.url;
                    }
                  
        
        
                  })
        
                }else {
                  console.log("forn_not_actions");
                }
        
           
              function explode(){
                if (id_form == '#modal-form_user') {
                  // window.location.pathname = '/'
                } else {
                  // sayHi();
                }
                 
                }
                explode()
              function sayHi() {
                console.log(133313);
                console.log('modal: ', modal);
                
                  $('.load_spin').removeClass('load_spin_active');
                  

                  if (modal == true) {
                    console.log('tut');
                    $.fancybox.open({
                      src: '#modal_form_change_profile',
                    });
                    setTimeout(() => {
                      $.fancybox.close({
                        src: '#modal_form_change_profile',
                      });
                    }, 1500);
                  } else {
                    $.fancybox.close();
                  }
                  if (check_request === true) {
                   


                    $.fancybox.open({
                      src: '#modal-form_true',
                    });
                    setTimeout(() => {
                      $.fancybox.close({
                        src: '#modal-form_true',
                      });
                    }, 1500);
                      var form_inputs = $(form)[0].querySelectorAll('input');
                      if (form_inputs.length > 0) {
                          for (var key in form_inputs) {
                              if (form_inputs.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
                                  if (form_inputs[key].type !== 'submit') {
                                      form_inputs[key].value = '';
                                  }
                              }
                          }
                          var form_textaria = $(form)[0].querySelectorAll('textarea');
                          if (form_textaria.length > 0) {
                              form_textaria[0].value = '';
                          }
                      }
                  }
              }
             
           }
      });
  } 
}

