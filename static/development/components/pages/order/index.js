import './index.scss';



let ua = 'Поле обов\'язково для заповнення';
let ru = 'Поле обязательно для заполнения';
let en = 'The field is required';

let current_lang = ua;
function create_error(text) {
    let error = document.createElement('label');
    error.classList.add('error', 'sub_title', 'sub_title_2');
    error.setAttribute(`for`, 'code');
    error.setAttribute(`id`, 'code-error');
    error.textContent = text;
    return error;
}

function check_active_input() {
    let wrap = $(this).parents('.step__wrap');
    
    let all_input = $(wrap).find('.input_requared');

    let counter = 0;

    

    $.each(all_input, function(index, value){
        
        if ($(value).val() == '') {
            $(value).parents('.inp-vak-wrap').find('.error').remove();
            $(value).parents('.inp-vak-wrap')[0].appendChild(create_error(current_lang));
        } else {
            $(value).parents('.inp-vak-wrap').find('.error').text('');
            counter++;
        }
    });
    if ($(all_input).length == counter) {
        $(wrap).find('.step_num').addClass('step_num_active');
        $(wrap).find('.step_title__wrap').addClass('step_title__wrap_done');
    } else {
        $(wrap).find('.step_num').removeClass('step_num_active');
        $(wrap).find('.step_title__wrap').removeClass('step_title__wrap_done');
    }
}

$('.input_requared').on('change', check_active_input);
$('.next_step_btn').on('click', check_next_step);
$('.step_title__wrap').on('click', function() {
    let wrap = $(this).parents('.step__wrap');
    if ($(this).hasClass('step_title__wrap_done')) {
        console.log(1);
        $('.step__wrap').removeClass('step__wrap_active');
        $(wrap).addClass('step__wrap_active');
    } else {
        console.log(2);
    }
});
$('.radio_block').on('click', function() {
    let wrap = $(this).parents('.step__wrap');
    $(wrap).find('.radio_center').removeClass('radio_center_active');
    $(this).find('.radio_center').addClass('radio_center_active');

    if ($(this).hasClass('add_one_inp')) {
      $('.step_content_delivery').addClass('only_one_input');
      $('.step_content_delivery').removeClass('only_two_input');
      $('.step_content_delivery').removeClass('only_none_input');

      $('.two_input__wrap').addClass('hidden_input__wrap');
      $('.one_input__wrap').removeClass('hidden_input__wrap');
    } else if ($(this).hasClass('add_two_inp')) {
      $('.step_content_delivery').removeClass('only_one_input');
      $('.step_content_delivery').addClass('only_two_input');
      $('.step_content_delivery').removeClass('only_none_input');

      $('.one_input__wrap').addClass('hidden_input__wrap');
      $('.two_input__wrap').removeClass('hidden_input__wrap');
    } else if ($(this).hasClass('remove_input')) {
      $('.step_content_delivery').removeClass('only_one_input');
      $('.step_content_delivery').removeClass('only_two_input');
      $('.step_content_delivery').addClass('only_none_input');

      $('.one_input__wrap').addClass('hidden_input__wrap');
      $('.two_input__wrap').addClass('hidden_input__wrap');
    }
})


function check_next_step() {
    let wrap = $(this).parents('.step__wrap');
    let counter = 0;
    if ($(this).attr('data-step-btn') == 2) {
        if ($('.step_content_delivery').hasClass('only_two_input')) {
          let check_city = $('.select_city').val();
          let check_aria = $('.select_aria').val();
          console.log('check_aria: ', check_aria);
              console.log('check_city: ', check_city);
          if (check_city == null || check_aria == null) {
              counter++;
          }
          $('#order_address').removeClass('input_requared');
        } else if ($('.step_content_delivery').hasClass('only_none_input')) {
          $('#order_address').removeClass('input_requared');
        } else if ($('.step_content_delivery').hasClass('only_one_input')) {
          $('#order_address').addClass('input_requared');
        }
    }
    let all_input = $(wrap).find('.input_requared');

    
    $.each(all_input, function(index, value){
        
        if ($(value).val() == '') {
            $(value).parents('.inp-vak-wrap').find('.error').remove();
            $(value).parents('.inp-vak-wrap')[0].appendChild(create_error(current_lang));
        } else {
            $(value).parents('.inp-vak-wrap').find('.error').text('');
            counter++;
        }
    });
    if ($(all_input).length == counter) {
        $(wrap).find('.step_num').addClass('step_num_active');
        $(wrap).find('.step_num').removeClass('step_num_error');

    } else {
        $(wrap).find('.step_num').removeClass('step_num_active');
        $(wrap).find('.step_num').addClass('step_num_error');
    }
    
    if ($(wrap).find('.step_num').hasClass('step_num_active')) {
        let back_step = Number($(this).attr('data-step-btn'));
        let current_step = Number($(this).attr('data-step-btn')) + 1;
        
        let all_step = $('.step__wrap');

        $.each(all_step, function(index, value){
            if ($(value).attr('data-step') == current_step) {
                $('.step__wrap').removeClass('step__wrap_active');
                $(value).addClass('step__wrap_active');
                console.log('$(value): ', $(value));
            } else if ($(value).attr('data-step') == back_step) {
                $(value).find('.step_title__wrap').addClass('step_title__wrap_done');
            }
        });

    }
}



$('.order_info__block').on('submit', function (evt) {
    evt.preventDefault();
    let requare_inputs = $('.input_requared');
    let counter = 0;
    $.each(requare_inputs, function(index, value){
        
        if ($(value).val() == '') {
            $(value).parents('.inp-vak-wrap').find('.error').remove();
            $(value).parents('.inp-vak-wrap')[0].appendChild(create_error('The field is required'));
        } else {
            $(value).parents('.inp-vak-wrap').find('.error').text('');
            counter++;
        }
    });
    if ($(requare_inputs).length == counter) {

        let another_block = $('.form_create__block').find('.part__wrapper');
        let another_array = [];
        $.each(another_block, function(index, value){
           let name = $(value).find('.part_name').val();
           let id = $(value).find('.id').val();
           another_array.push({
               'part_name': name,
               'id': id,
           })
        });
        
        let form_json = {
            'car_model': $('.car_model').val(),
            'marka': $('.marka').val(),
            'year': $('.year').val(),
            'vin code': $('.vin_code').val(),
            'name': $('.name').val(),
            'email': $('.email').val(),
            'phone': $('.phone').val(),
            'additional_information': $('.additional_information').val(),
            'another_parts': another_array,
        }

                


   
    }
});

    // setInterval(() => {
    //     if ($('.nova_city').hasClass('nova_city_active')) {
    //         // reset_city();
    //         $('.nova_city').removeClass('nova_city_active');
    //     }
    // }, 200);
   

           
            

             
















             








$('.submit_order_btn').on('click', function() {
    let action = $('.order_info__block').attr('action');
    let current_delivery = $('.step_content_delivery').find('.radio_center_active').parents('.radio_block').find('.radio_title').text();
    console.log('current_delivery: ', current_delivery);
    let current_payment = $('.step_content_payment').find('.radio_center_active').parents('.radio_block').find('.radio_title').attr('data-payment');
    // $.each(all_attr,function(index,value){
    //     let current_sum = $(value).find('.option_content_prof_active').attr('data-price-option');
    // })
    let current_adress;
    if ($('.step_content_delivery').hasClass('only_one_input')) {
      current_adress = $('#order_address').val();
    } else if ($('.step_content_delivery').hasClass('only_two_input')) {
      current_adress = `${current_delivery.trim()}, ${$('.select_city').val()}, ${$('.select_aria').val()}`;
    } else if ($('.step_content_delivery').hasClass('only_none_input')) {
      current_adress = `Користувач обрав самовивіз`;
    }
    let body = {
        "name": $('#order_name').val(),
        "email": $('#order_email').val(),
        "phone": $('#order_phone').val(),
        "delivery_opt": current_adress,
        "payment_opt": current_payment.trim(),
      }
      fetch(action, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      .then(data => {
        return data.json();
        })
        .then(body => {
            console.log('body: ', body);
            window.location.href = body.url;
        })
});




$('.basket_prep_order').on('click', function() {
    console.log(123);
    var current_quan_sum = $(this).parents('.basket_counter').find('.cart_counter').val();
    if (current_quan_sum == 1) {
      console.log('меньше не може бути');
    } else {
      $(this).parents('.basket_counter').find('.cart_counter').val(Number(current_quan_sum) - 1);
      let item_id = $(this).attr('data-quantity_item_id');
      let quantity_id = $(this).parents('.basket_counter').find('.quan_cart_sum').val();
      console.log('quantity_id: ', quantity_id);
     
      fetch(`/api/cart_item/${Number(item_id)}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          quantity: Number(quantity_id),
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log('data: ', data);
          $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(data.cart_item_total_price)} ${data.cart_currency}`)
          $('.order_sum').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
        });
    } 
})
$('.basket_input_order').on('blur', function() {
    let curr_user_num = $(this);
    let quantity_id;
    if (curr_user_num.val() > 0) {
      
    } else if (curr_user_num.val() <= 0 || curr_user_num.val() == '') {
        $(curr_user_num).val(1);
    }
      let item_id = $(this).attr('data-quantity_item_id');
      quantity_id = $(this).val();
      console.log('quantity_id: ', quantity_id);
      
      fetch(`/api/cart_item/${Number(item_id)}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          quantity: Number(quantity_id),
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          console.log('data: ', data);
          $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(data.cart_item_total_price)} ${data.cart_currency}`)
          $('.order_sum').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
        });
})
$('.basket_next_order').on('click', function() {
    var current_quan_sum = $(this).parents('.basket_counter').find('.cart_counter').val();
  console.log('current_quan_sum: ', current_quan_sum);

  if (current_quan_sum == 99999) {
    console.log('більше не може бути');
  } else {
    $(this).parents('.basket_counter').find('.cart_counter').val(Number(current_quan_sum) + 1);

    let item_id = $(this).attr('data-quantity_item_id');
    let quantity_id = $(this).parents('.basket_counter').find('.quan_cart_sum').val();
    console.log('quantity_id: ', quantity_id);

    fetch(`/api/cart_item/${Number(item_id)}/`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: Number(quantity_id),
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log('data: ', data);
        $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(data.cart_item_total_price)} ${data.cart_currency}`)
        $('.order_sum').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
      });
  } 
})