import './index.scss';











window.addEventListener('DOMContentLoaded', () => {
	const arrow_1 = document.getElementById('arrow_1'); 
  const button_1 = document.getElementById('button_1');
  
  const arrow_2 = document.getElementById('arrow_2'); 
  const button_2 = document.getElementById('button_2');
  
  const arrow_3 = document.getElementById('arrow_3'); 
  const button_3 = document.getElementById('button_3');
  
  const arrow_4 = document.getElementById('arrow_4'); 
  const button_4 = document.getElementById('button_4');
  
  const arrow_5 = document.getElementById('arrow_5'); 
	const button_5 = document.getElementById('button_5');

	create_animation(arrow_1, button_1);
	create_animation(arrow_2, button_2);
	create_animation(arrow_3, button_3);
	create_animation(arrow_4, button_4);
	create_animation(arrow_5, button_5);

});

function create_animation(arrow, button) {
  let x;
  let y;
  document.addEventListener('mousemove', (e) => {
    x = (e.clientX / 10);
    y = (e.clientY / 10);

    arrow.setAttribute("style", `margin-top: ${y}px; margin-right: ${x}px;`);

    // arrow.style.top = y + 'px';
		// arrow.style.right = x + 'px';
	
	});

	button.addEventListener('mouseenter', () => {
		arrow.style.opacity = 1;
	});
	button.addEventListener('mouseleave', () => {
		arrow.style.opacity = 0;
  });
}
















$('#menu-toggle').click(function(){
    $(this).toggleClass('open');
    $('.scroll_menu').toggleClass('scroll_menu_active');
    $('body').toggleClass('body_active');
    $('.nav_menu__block').toggleClass('nav_menu__block_active');
    $('.header_logos').toggleClass('header_logos_active');


    $('.scroll_top__block').toggleClass('scroll_top__block_active');
    $('.scroll_bottom__block').toggleClass('scroll_bottom__block_active');
    if ($('.logo__wrap').hasClass('logo_wrap_active')) {
        $('.logo__wrap').removeClass('logo_wrap_active');
        $('.logo__wrap').addClass('logo_wrap_native');
    } else {
        $('.logo__wrap').addClass('logo_wrap_active');
        $('.logo__wrap').removeClass('logo_wrap_native');
    }
    
        
  })
$('.modal_search').on('click', function() {
    $('.search_menu').toggleClass('search_menu_active');
    $('body').toggleClass('body_active');
});

$('.modal_basket').on('click', function() {
    $('.basket_menu').toggleClass('basket_menu_active');
    $('.black_bg').toggleClass('black_bg_active');
    $('body').toggleClass('body_active');

    
    $('.basket_content__block').find('.basket_content_profile').remove();

      fetch(`/api/cart_items/`, {
        method: 'GET',
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
          $('.basket_all_result').text(`₴ ${Math.round(data.cart_total_price)}`)
          console.log('data: ', data.cart_items.length);
          let card_json = {
            img_src: '/static/source/img/index/lite.png',
            name_basket: 'Вилка VEPR-H123',
            quantity: '1',
            price: '2500',
          }
          for (let index = 0; index < data.cart_items.length; index++) {
            $('.basket_content__block')[0].appendChild(create_basket_card(card_json, data.cart_items[index]));
          }
          

          let checked = $('.basket_content__block').find('.basket_content_profile').length;
          console.log('checked: ', checked);
          if (checked == 0) {
            $('.none_content_send').text('Ваша корзина порожня');
            $('.none_content_send').addClass('none_content_send_active');
            $('.discount__block').css('opacity', '0');
            $('.basket_nobtn_wrap').css('display', 'block');
            $('.basket_btn_wrap').css('display', 'none');
          } else {
            $('.none_content_send').text('');
            $('.none_content_send').removeClass('none_content_send_active');
            $('.discount__block').css('opacity', '1');
            $('.basket_nobtn_wrap').css('display', 'none');
            $('.basket_btn_wrap').css('display', 'block');

          }
        });
       

});

// корзина ===========+>




$('.basket_input').on('blur', basket_blur);
function basket_blur() {
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
          $('.basket_all_result').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
        });
}


  $('.basket_del').on('click', basket_delete);
  function basket_delete() {
    let wrap = $(this).parents('.basket_content_profile');
    $(wrap).css("right", '-100vw');
    $(wrap).css("max-height", '0px');
    setTimeout(() => {
        $(wrap).remove();

        
        if ($('.basket_content__block').find('.basket_content_profile').length == 0) {
          $('.none_content_send').text('Ваша корзина порожня');
          $('.none_content_send').addClass('none_content_send_active');
          $('.discount__block').css('opacity', '0');
          $('.basket_nobtn_wrap').css('display', 'block');
          $('.basket_btn_wrap').css('display', 'none');

        } else {
          $('.none_content_send').text('');
          $('.none_content_send').removeClass('none_content_send_active');
          $('.discount__block').css('opacity', '1');
          $('.basket_nobtn_wrap').css('display', 'none');
          $('.basket_btn_wrap').css('display', 'block');

        }
    }, 300);
    
    let item_id = $(this).attr('data-quantity_item_id');

    fetch(`/api/cart_item/${item_id}`, {
      method: 'DELETE',
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log('data: ', data);
        $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(data.cart_item_total_price)} ${data.cart_currency}`)
        $('.basket_all_result').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
      });

  }
  
  function number_to(id, from, to, duration) {

    var element = id;
    var start = new Date().getTime();
    setTimeout(function () {
      var now = (new Date().getTime()) - start;
      var progress = now / duration;
      var result = Math.floor((to - from) * progress + from);
      var test = from;
      test = progress < 1 ? result : to;
      if (test == 'NaN') {
        element.text(Math.floor((to - from) * progress + from));

      } else {
        element.text(test);
      }
      if (progress < 1) setTimeout(arguments.callee, 10);
    }, 10);
  }

  


 
  
function create_basket_card(content, data) {
  console.log('data: ', data);
        let basket_content_profile = document.createElement('div');
        basket_content_profile.classList.add('basket_content_profile');
        
        let basket_profile_img = document.createElement('div');
        basket_profile_img.classList.add('basket_profile_img');

        let profile_img = document.createElement('img');
        profile_img.classList.add('basket_profile_img');
        profile_img.setAttribute(`src`, data.item.image_url);

        let basket_right_content = document.createElement('div');
        basket_right_content.classList.add('basket_right_content');
        
        let basket_title__block = document.createElement('div');
        basket_title__block.classList.add('basket_title__block');

        let basket_title = document.createElement('div');
        basket_title.classList.add('basket_title', 'main__title', 'main__title_5');
        basket_title.textContent = data.item.title;
        
        // початок доробок
        // let x = document.createElement('div');
        // x.classList.add('basket_title', 'main__title', 'main__title_5');
        // x.textContent = data.item.title;

        // let y = document.createElement('div');
        // y.classList.add('basket_title', 'main__title', 'main__title_5');
        // y.textContent = data.item.title;

        // let z = document.createElement('div');
        // z.classList.add('basket_title', 'main__title', 'main__title_5');
        // z.textContent = data.item.title;
        // кінець доробок

        let basket_del = document.createElement('img');
        basket_del.classList.add('basket_del', 'remove_prod_card');
        basket_del.setAttribute(`data-quantity_item_id`, data.id);
        basket_del.setAttribute(`src`, '/static/source/img/index/trash.svg');

        let basket_bottom__wrap = document.createElement('div');
        basket_bottom__wrap.classList.add('basket_bottom__wrap');

        let basket_counter__block = document.createElement('div');
        basket_counter__block.classList.add('basket_counter__block');

        let basket_text = document.createElement('div');
        basket_text.classList.add('basket_text', 'sub_title', 'sub_title_2');
        basket_text.textContent = 'Кількість';

        let basket_counter = document.createElement('div');
        basket_counter.classList.add('basket_counter');

        let basket_prep = document.createElement('div');
        basket_prep.setAttribute(`data-quantity_item_id`, data.id);
        basket_prep.classList.add('basket_prep', 'basket_count', 'sub_title', 'sub_title_21');
        basket_prep.textContent = '-';

        let basket_input = document.createElement('input');
        basket_input.setAttribute(`type`, 'number');
        basket_input.setAttribute(`value`, data.quantity);
        basket_input.setAttribute(`data-quantity_item_id`, data.id);
        basket_input.classList.add('basket_input', 'basket_count', 'main__title', 'main__title_5', 'cart_counter', 'quan_cart_sum');

        let basket_next = document.createElement('div');
        basket_next.setAttribute(`data-quantity_item_id`, data.id);
        basket_next.classList.add('basket_next', 'basket_count', 'sub_title', 'sub_title_21');
        basket_next.textContent = '+';

        let basket_sum__block = document.createElement('div');
        basket_sum__block.classList.add('basket_sum__block');

        let basket_price_title = document.createElement('div');
        basket_price_title.classList.add('basket_text', 'sub_title', 'sub_title_2');
        basket_price_title.textContent = 'Ціна';

        let basket_summ = document.createElement('div');
        basket_summ.classList.add('basket_summ', 'main__title', 'main__title_5');
        basket_summ.textContent = data.prices.price_with_coupons_with_attributes_with_discount + '' + data.chosen_currency;
        // basket_summ.textContent = data.item.price + ' ' + data.item.currency.code;
        
        console.log("data::", data)


        basket_content_profile.appendChild(basket_profile_img);
        basket_profile_img.appendChild(profile_img);
        basket_content_profile.appendChild(basket_right_content);
        basket_right_content.appendChild(basket_title__block);
        basket_title__block.appendChild(basket_title);
        basket_title__block.appendChild(basket_del);
        basket_right_content.appendChild(basket_bottom__wrap);
        // початок доробок
        // basket_right_content.appendChild(x);
        // basket_right_content.appendChild(y);
        // basket_right_content.appendChild(z);
        // кінець доробок
        basket_bottom__wrap.appendChild(basket_counter__block);
        basket_counter__block.appendChild(basket_text);
        basket_counter__block.appendChild(basket_counter);
        basket_counter.appendChild(basket_prep);
        basket_counter.appendChild(basket_input);
        basket_counter.appendChild(basket_next);
        basket_bottom__wrap.appendChild(basket_sum__block);
        basket_sum__block.appendChild(basket_price_title);
        basket_sum__block.appendChild(basket_summ);

        $(basket_del).on('click', basket_delete);
        $(basket_next).on('click', basket_plus);
        $(basket_prep).on('click', basket_minus);
        $(basket_input).on('blur', basket_blur);

        return basket_content_profile;
}

function counter_plus(name) {
  let count_var = $(name).text();
  count_num = Number(count_var);
  count_num++
  $(name).text(count_num);
}
function counter_minus(name) {
  let count_var = $(name).text();
  count_num = Number(count_var);
  count_num--
  $(name).text(count_num);
}



function basket_minus() {
  // console.log(123);
  var current_quan_sum = $(this).parents('.basket_counter').find('.cart_counter').val();
  if (current_quan_sum == 1) {
    console.log('меньше не може бути');
  } else {
    $(this).parents('.basket_counter').find('.cart_counter').val(Number(current_quan_sum) - 1);
    let item_id = $(this).attr('data-quantity_item_id');
    let quantity_id = $(this).parents('.basket_counter').find('.quan_cart_sum').val();
    // console.log('quantity_id: ', quantity_id);
   
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
        let currency = data.cart_currency;
        let cart_total_price = data.cart_total_price;
        let cart_item_total_price = data.cart_item_total_price;
        let cart_currency = data.cart_currency
        console.log('data patch minus: ', data);
        $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(cart_item_total_price)} ${cart_currency}`)
        $('.basket_all_result').text(`${currency} ${Math.round(cart_total_price)}`);
      });
  } 
}
function basket_plus() {
  var current_quan_sum = $(this).parents('.basket_counter').find('.cart_counter').val();
  // console.log('current_quan_sum: ', current_quan_sum);

  if (current_quan_sum == 99999) {
    console.log('більше не може бути');
  } else {
    $(this).parents('.basket_counter').find('.cart_counter').val(Number(current_quan_sum) + 1);

    let item_id = $(this).attr('data-quantity_item_id');
    let quantity_id = $(this).parents('.basket_counter').find('.quan_cart_sum').val();
    // console.log('quantity_id: ', quantity_id);

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
        console.log('data patch plus: ', data);
        $(this).parents('.basket_content_profile').find('.basket_summ').text(`${Math.round(data.cart_item_total_price)} ${data.cart_currency}`)
        $('.basket_all_result').text(`${data.cart_currency} ${Math.round(data.cart_total_price)}`);
      });
  } 
}
