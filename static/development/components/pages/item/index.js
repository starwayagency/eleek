import './index.scss';
import './best_sales.scss';



$('.main_item_btn').on('click', function() {

  if ($(this).hasClass('NoActiveBtn')) {
    
  } else {
    $(this).addClass('NoActiveBtn');
    $(this).removeClass('item_btn_price');
    $(this).removeClass('btn_standart_black');
    $(this).text('Куплено');
  }
});




  $('.fast_btn').fancybox({
    touch: false,
    scrolling: 'hidden',
  });


let slickFinder0 = $('.item_slider__block').length;
  if (slickFinder0 >= 1) {

    // $('.main_card_slider').slick({
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   fade: true,
    //   asNavFor: '.mini_slider'
    // });

    // $('.mini_slider').slick({
    //   infinite: true,
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   vertical: true,
    //   verticalSwiping: true,
    //   focusOnSelect: true,
    //   asNavFor: '.main_card_slider',
    // });

    $('.main_card_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.mini_slider'
      });

      let current_quantity = Number($('.mini_slider').attr('data-quantity-slider'));
      $('.mini_slider').slick({
        slidesToShow: current_quantity,
        slidesToScroll: 1,
        asNavFor: '.main_card_slider',
        arrows: false,
        dots: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
      });
  }

  $('.color_change_btn').on('click', function() {
        let wrap_content = $(this).parents('.color_change__wrap').find('.color_change_content');

      if ($(this).hasClass('color_change_btn_active')) {
        $(this).removeClass('color_change_btn_active');
        $(wrap_content).removeClass('color_change_content_active');
      } else {
        $(this).addClass('color_change_btn_active');
        $(wrap_content).addClass('color_change_content_active');
      }
  })
  $('.color_change_select').on('click', function() {
      let wrap = $(this).parents('.color_change__wrap');
      let current_color = $(this).attr('data-color');

        let this_id = $(this).find('.hidden_color_attr').data('item_attribute_value_id');
        $(wrap).attr('data-item_attribute_value_id', this_id);

      if ($(this).hasClass('white_color_change_oval')) {
        $(wrap).find('.main_color_change_oval').addClass('border_for_oval');
      } else {
        $(wrap).find('.main_color_change_oval').removeClass('border_for_oval');
      }

      $(wrap).find('.main_color_change_oval').css('background', `${current_color}`);
      $(wrap).find('.main_color_change_oval').attr('data-color', `${current_color}`);
      $(wrap).find('.color_change_select').find('.success_color').removeClass('success_color_active');
      $(this).find('.success_color').addClass('success_color_active');


  });



  $('.change_attribute').on('click', function() {
      let wrapp = $(this).parents('.color_change__wrap');
      let this_attr = $(this).find('.hidden_color_attr').attr('data-item_attribute_value_id');

      let text_attr = $(this).find('.hidden_color_attr').val();
      $(wrapp).find('.color_change_name').text(text_attr);
    //   let content = $(wrapp).attr('data-item_attribute_value_id');
    //   let mass = [];
    //   if (content == 'none') {
    //     mass.push(this_attr);
    //   } else {
    //     console.log(123);
    //   }
      $(wrapp).attr('data-item_attribute_value_id', this_attr);
  });

  function check_active_option() {
    let all_attr = $('.current_attribute_change__wrap');
    let all_first_sum = 0;
    $.each(all_attr,function(index,value){
        console.log('value: ', $(value)[0]);
        let current_sum = $(value).find('.option_content_prof_active').attr('data-price-option');
        console.log('current_sum: ', current_sum);
        all_first_sum += Number(current_sum);
    })
    $('.additional_price').text(all_first_sum);
    $('.absolute_additional_price').text(all_first_sum);
  
  }

  check_active_option();
$(".item_tab_link").on("click", function(){
    ($(this)[0].dataset.tab);
    var className = ($(this)[0].dataset.tab);
    console.log(className);
    ($(".item_tab_link").removeClass("item_tab_link_active"));
     ($(this).addClass("item_tab_link_active"));
    ($(".item_tab_content").removeClass("item_tab_content_active"));
        ($("#"+$(this)[0].dataset.tab).addClass("item_tab_content_active"));

});

function check_item_comment() {
let item_wrap = $('.comment_profile__wrapper');
    if ($(item_wrap)[0].childElementCount == 0) {
        
        $('.none_comments_text').removeClass('none_comments_text_hidden');
        $('.comment_kredit__block').addClass('kredit__block_none');
    } else {
        $('.none_comments_text').addClass('none_comments_text_hidden');
        $('.comment_kredit__block').removeClass('kredit__block_none');
    }
}


$('.item_tab_link_3').on('click', function() {
    check_item_comment();
});
$('.add_comment_btn').on('click', function() {
    $.fancybox.open({
        src: '#comment_form',
        touch: false
    });
});
$('.modal_comm').on('click', function() {
    $.fancybox.close({
        src: '#comment_form',
    });
});

if ($('.rating_item').length > 0) {
   
    $('.rating_item')[0].addEventListener('mouseout', function() {
        $('.rating_item').removeClass('rating_item_hover');
    });
    $('.rating_item')[0].addEventListener('mouseover', function(event) {
        var target = event.target;
        console.log(target.tagName);
        if (target.tagName != "IMG") {
            console.log(1);
        } else {
            console.log(2);
        }
    });
}
    
// $('.comment_form').fancybox({
// 	touch: {
//         vertical: false, // Allow to drag content vertically
//         momentum: false // Continue movement after releasing mouse/touch when panning
//       },
// });

$('.modal-review__rating-order-wrap > span').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).parent().attr('data-rating-value', $(this).data('rating-value'));
});
$('.rating_review').on('click', function() {
    let current_rating = $(this).attr('data-rating-value');
    $('.hidden_rating_review').val(current_rating);
});
$('.generate_comment').on('click', function() {
    let wrap = $(this).parents('.comment_form');
    let comment_name = $(wrap).find('.comment_name').val();
    let comment_email = $(wrap).find('.comment_email').val();
    let comment_send = $(wrap).find('.comment_send').val();
    let comment_rating = $(wrap).find('.hidden_rating_review').val();
    let comment_json = {
        name: comment_name,
        email: comment_email,
        send: comment_send,
        rating: comment_rating
    }
    console.log('comment_json: ', comment_json);
    $('.comment_profile__wrapper')[0].prepend(create_comment(comment_json));
});

function create_comment(content) {
    let comment_profile = document.createElement('div');
    comment_profile.classList.add('comment_profile');

        let comment_name__block = document.createElement('div');
        comment_name__block.classList.add('comment_name__block');

        let comment_name = document.createElement('div');
        comment_name.classList.add('comment_name', 'color_black', 'standart_title', 'standart_title_4');
        comment_name.textContent = content.name;

        let comment_star = document.createElement('div');
        comment_star.classList.add('comment_star');

        

        let comment_text = document.createElement('div');
        comment_text.classList.add('comment_text', 'color_black', 'sub_title', 'sub_title_2');
        comment_text.textContent = content.send;
        



        comment_profile.appendChild(comment_name__block);
        comment_name__block.appendChild(comment_name);
        comment_name__block.appendChild(comment_star);

        let active_star = content.rating;
        let passive_star = 5 - content.rating;
        for (let index = 0; index < active_star; index++) {
            var svg_wrap = document.createElement('div');
            svg_wrap.classList.add('svg_rating__wrap');
            svg_wrap.innerHTML = `
            <svg class="rating_svg rating_svg_active" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17">
                <path fill-rule="evenodd" d="M9 16.5L3.71 19.281 4.72 13.391 0.44 9.219 6.355 8.359 9 3 11.645 8.359 17.56 9.219 13.28 13.391 14.29 19.281z" transform="translate(0 -3)"/>
            </svg>                    
            `;         
            comment_star.appendChild(svg_wrap);
        }
        for (let index = 0; index < passive_star; index++) {
            var svg_wrap = document.createElement('div');
            svg_wrap.classList.add('svg_rating__wrap');
            svg_wrap.innerHTML = `
            <svg class="rating_svg" xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17">
                <path fill-rule="evenodd" d="M9 16.5L3.71 19.281 4.72 13.391 0.44 9.219 6.355 8.359 9 3 11.645 8.359 17.56 9.219 13.28 13.391 14.29 19.281z" transform="translate(0 -3)"/>
            </svg>                    
            `;         
            comment_star.appendChild(svg_wrap);
        }
        comment_profile.appendChild(comment_text);


        
        return comment_profile;
}

$('.price_option').on('click', function() {
    show_addit_option();
    let all_price__block = $('.additional_price');
    let absolute_additional_price = $('.absolute_additional_price');
    let all_summ = Number($(all_price__block).text());
    console.log('all_summ: ', all_summ);
    let current_sum = $(this).attr('data-price-option');
    console.log('current_sum: ', current_sum);
        if ($(this).hasClass('option_content_prof_active')) {
            $(all_price__block).text(all_summ - Number(current_sum));
            $(absolute_additional_price).text(all_summ - Number(current_sum));
        } else {
            $(all_price__block).text(all_summ + Number(current_sum));
            $(absolute_additional_price).text(all_summ + Number(current_sum));
        }
});



$('.price_multiple_option').on('click', function() {
    $(this).toggleClass('option_content_prof_active');

    
})

$('.price_simple_option').on('click', function() {
    show_addit_option();
    let active_sum;
    let all_price__block = $('.additional_price');
    let absolute_additional_price = $('.absolute_additional_price');
    let all_summ = Number($(all_price__block).text());
    let current_sum = $(this).attr('data-price-option');
    let wrapper = $(this).parents('.color_change_content_wrap');
    if ($(wrapper).find('.option_content_prof_active').length == 1) {
        active_sum = $(wrapper).find('.option_content_prof_active').attr('data-price-option');
    } else {
        active_sum = 0;
    }

    if ($(this).hasClass('option_content_prof_active')) {
        // $(this).removeClass('option_content_prof_active');
        // $(all_price__block).text(all_summ - Number(current_sum));
        // $(absolute_additional_price).text(all_summ - Number(current_sum));
    } else {
        $(wrapper).find('.option_content_prof').removeClass('option_content_prof_active');
        $(this).addClass('option_content_prof_active');
        $(all_price__block).text((all_summ - Number(active_sum)) + Number(current_sum));
        $(absolute_additional_price).text((all_summ - Number(active_sum)) + Number(current_sum));
    }
})

function show_addit_option() {
    let block = $('.absolute_additional__block');
    $(block).css('right', '0px');

    setTimeout(() => {
        $(block).css('right', '-100%');
    }, 1000);
}

$('.item_btn_price').on('click', function() {
    


   

      let fetch_json = formited_json_atrr();



    let item_id = $('.item_name').attr('data-id-name');
      let body = {
        "item_id": Number(item_id),
        "attributes": JSON.stringify(fetch_json),
        // "options": JSON.stringify(option_mass)
      }
      fetch('/api/cart_items/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
});

function formited_json_atrr() {
  let all_attr = $('.current_attribute_change__wrap');
  let attr_mass = [];
  $.each(all_attr, function(index, value){
      let attr_id = $(value).attr('data-item_attribute_id');
      let attr_value = $(value).attr('data-item_attribute_value_id');
      attr_mass.push({
        item_attribute_id: attr_id,
        item_attribute_value_id: attr_value
      })
  })

  let all_color = $('.only_color_change__wrap');
  $.each(all_color, function(index, value){
      let attr_id = $(value).attr('data-item_attribute_id');
      let attr_value = $(value).attr('data-item_attribute_value_id');
      attr_mass.push({
        item_attribute_id: attr_id,
        item_attribute_value_id: attr_value
      });
        
  })
  

  let all_option = $('.option_content__block').find('.option_content_prof_active');
  
  let mini_mass = []
  $.each(all_option, function(index, value){
      let attr_value = $(value).attr('data-item_attribute_value_id');
      mini_mass.push(attr_value)
  })
 
  // атрибути
  attr_mass.push({
    item_attribute_id: $('.option__wrap').find('.item_char_title').attr('data-item_attribute_id'),
    item_attribute_value_ids: mini_mass
  });
  console.log('attr_mass: ', attr_mass);
  let new_mass;
  if (attr_mass[0].item_attribute_id == undefined) {
    new_mass = [];
    return new_mass;
  } else {
    return attr_mass;
  }
}



$('.sale_one_click').on('click', function() {
  $('.hidden_product_attr').val(JSON.stringify(formited_json_atrr()));
});


$('.three_de__block').on('click', function() {
    let fetch_json = formited_json_atrr();

    let item_id = $('.item_name').attr('data-id-name');
      let body = {
        "item_id": Number(item_id),
        "attributes": JSON.stringify(fetch_json),
      }
      fetch('/constructor_middleware/', {
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
        location.href=body.url;

      });
});

var slickFinder2 = $('.best-sales-block').length;
if (slickFinder2 >= 1) {

  $('.best-sales-block').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    arrows: true,
    prevArrow: '<div class="slick-first"><</div>',
    nextArrow: '<div class="slick-second">></div>',
    lazyLoad: "ondemand",

    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 452,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },



    ]
  });


  $('.slick-first').click(function () {
    $(".best-sales-block").slick('slickPrev');
  });
  $('.slick-second').click(function () {
    $(".best-sales-block").slick('slickNext');
  });

}
