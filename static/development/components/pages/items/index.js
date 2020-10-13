import './index.scss';
var page_number = 0;
var super_kostile = false;
var removeBtn = 6;

let current_min = $('#max_min_prices').attr('data-min_price');
let current_max = $('#max_min_prices').attr('data-max_price');

var hidden_min_range = $('.input_for_min_range');
var hidden_max_range = $('.input_for_max_range');

var rangeFinder = $('.range_slider').length;
if (rangeFinder >= 1) {
  var slider = document.getElementById('slider');

  noUiSlider.create(slider, {
      start: [Number(current_min), Number(current_max)],
      connect: true,
      range: {
          'min': Number(current_min),
          'max': Number(current_max)
      },
      tooltips: false,
  });
  var val_floor1;
  var val_floor2;
  slider.noUiSlider.on('update', function (values) {
    val_floor1 = Math.floor(values[0]);
    val_floor2 = Math.floor(values[1]);

    hidden_min_range.val(val_floor1);
    hidden_max_range.val(val_floor2);

    $('.cost_filter_num').text(val_floor1 + ' грн.' + " - " + val_floor2 + ' грн.');
});
  
}

hidden_min_range.val(val_floor1);
hidden_max_range.val(val_floor2);

$('.cost_filter_num').text(val_floor1 + ' грн.' + " - " + val_floor2 + ' грн.');
 
$('.items_filter_title').on('click', function() {
    $(this).parents('.items_filter_content__wrap').toggleClass('items_filter_content__wrap_active');
});


$('.prod_card_more').on('click', function () {
    get_card_generate();
  });


  function generate_arr_attr(all_arr) {

    var filter_prof = document.querySelectorAll('.items_filter_content__wrap');
    filter_prof.forEach(function (item, index, array) {
      var current_id = $(item).find('.hidden_category_id').val();
      var current_inp = $(item).find('.input_all_arr');
      var period_arr = {
        // attribute_id: current_id,
        category_ids: ''
      };


      let per_arr = [];
      $(current_inp).each(function (item, index, array) {
        if ($(index)[0].checked) {
          if ($(index).hasClass('input_color')) {
            per_arr.push($(index).val());
          } else {
            per_arr.push($(index).val());
          }

        }
      });
      // var new_per = per_arr.substring(0, per_arr.length - 1);
      period_arr.value_ids = per_arr;
      all_arr.push(period_arr);
      return all_arr;
    });
  }


  $(".filter_form").change(function () {
    get_user_cart_generate();
  });
  $('.cost_filter_link').on('mouseup', function () {
    get_user_cart_generate();
  });

  // $('.noUi-base').on('click', function() {
  //   get_user_cart_generate();  
  // });
  var check_end_slider = $('#slider').length;
  if (check_end_slider >= 1) {
    slider.noUiSlider.on('end.one', function () {
      get_user_cart_generate();
    });
  }
  $('.product_title').on('mouseup', function () {

    console.log('yes!');


  });

  page_number = 1;

  function get_card_generate() {

    // var all_array = [];
    // generate_arr_attr(all_array);
    // console.log(all_array);

    var filter_prof = document.querySelectorAll('.items_filter_content__wrap');
    let per_arr = [];
    filter_prof.forEach(function (item, index, array) {
      var current_inp = $(item).find('.input_all_arr');
      $(current_inp).each(function (item, index, array) {
            per_arr.push($(index).val());
      });
    });
    console.log('per_arr: ', per_arr);

    

    page_number++;
  

    var ordering;
    ordering = $('.ordering').val();
    var discount;
    if ($('.discount').prop('checked')) {
      discount = true;
    } else {
      discount = false;

    }
    console.log('discount: ', discount);
    var category_id = $('.category_id').val();
    if (val_floor1 == undefined && val_floor2 == undefined) {
      val_floor1 = '';
      val_floor2 = '';
    }

    // fetch(`/api/items/?per_page=6&page_number=${page_number}&category_id=${category_id}`, {
      fetch(`/api/items/?per_page=6&page_number=${page_number}&category_id=${category_id}&max_price=${val_floor2}&min_price=${val_floor1}&category_ids=${JSON.stringify(per_arr)}`, {
      method: 'GET',
    })
      .then(data => {
        return data.json();
      })
      .then(body => {
        console.log('body: ', body);

        let cur_step = 0;

        var last_page = body.count;
        const fixed_count = last_page;
        
        // console.log('page_number: ', page_number);
        //   console.log('last_page: ', last_page);

        let fragment = document.createDocumentFragment();
        for (var key in body.results) {

          removeBtn++
          if (fixed_count == removeBtn) {
            $('.prod_card_more').css('display', 'none');
          }

          cur_step += 0.2;
          cardNew1(body.results[key]);
          var creat_card = createProdCard(body.results[key], cur_step);
          fragment.appendChild(creat_card);
          $('.main_product-block')[0].appendChild(fragment);
        }
      })
  }
  function cardNew1(bodyCar) {
    // var fragment = document.createDocumentFragment();
    // var cur_step = 0;
    // console.log(bodyCar);
    //    console.log( $('.auto-card-block')[0]);
    // setTimeout(function(){
    //    $('.product_card-prof').removeClass('tile');
    //    $('.product_card-prof').css("animation-delay", "0s");
    //    }, 1550);
  }

  function get_user_cart_generate() {
    // var all_array = [];
    // generate_arr_attr(all_array);
    // console.log(all_array);

    var filter_prof = document.querySelectorAll('.items_filter_content__wrap');
    let per_arr = [];
    filter_prof.forEach(function (item, index, array) {
      var current_inp = $(item).find('.input_all_arr');
      $(current_inp).each(function (item, index, array) {
        if ($(index)[0].checked) {
          per_arr.push($(index).val());
        }
      });
    });

    var removeBtn = 0;
    var cart_check = document.querySelectorAll('.main_product-block .product_card-prof');
    cart_check.forEach(function (item, index, array) {
      $(item).remove();
    });
    $('.load_product').addClass('load_product_active');

    page_number = 1;


    var discount;
    if ($('.discount').prop('checked')) {
      discount = true;
    } else {
      discount = false;

    }
    var category_id = $('.category_id').val();

    if (val_floor1 == undefined && val_floor2 == undefined) {
      val_floor1 = '';
      val_floor2 = '';
    }
    fetch(`/api/items/?per_page=6&page_number=${page_number}&category_id=${category_id}&max_price=${val_floor2}&min_price=${val_floor1}&category_ids=${JSON.stringify(per_arr)}`, {
      method: 'GET',
    })
      .then(data => {
        return data.json();
      })
      .then(body => {
        $('.load_product').removeClass('load_product_active');
        if (body.results.length == 0) {
          $('.prod_card_more').css('display', 'none');
        }
        let cur_step = 0;
        
        let last_page = body.count;
        const fixed_count = last_page;

        // console.log('page_number: ', page_number);
        //   console.log('last_page: ', last_page);

        let fragment = document.createDocumentFragment();
        for (let key in body.results) {
          removeBtn++
          // console.log('fixed_count: ', fixed_count);
          // console.log('removeBtn: ', removeBtn);
          if (fixed_count == removeBtn) {
            $('.prod_card_more').css('display', 'none');
          } else {
            $('.prod_card_more').css('display', 'block');
          }

          cur_step += 0.2;
          cardNew1(body.results[key]);
          let creat_card = createProdCard(body.results[key], cur_step);
          fragment.appendChild(creat_card);
          $('.main_product-block')[0].appendChild(fragment);
        }
      })

  }

  function createProdCard(product, step) {
    console.log('product: ', product);

    let card_prof = document.createElement('a');
    card_prof.style.setProperty('animation-delay', (step) + 's'),
    card_prof.classList.add('product_card-prof');
    card_prof.setAttribute(`href`, product.absolute_url);

    var link_wrap = document.createElement('a');
    link_wrap.classList.add('prod_card_link');
    link_wrap.setAttribute(`href`, product.absolute_url);

    var prod_img = document.createElement('img');
    prod_img.classList.add('prod_card-img');
    prod_img.setAttribute('src', product.image_url);

    var prod_card_info__wrap = document.createElement('div');
    prod_card_info__wrap.classList.add('prod_card_info__wrap');

    var prod_name = document.createElement('div');
    prod_name.classList.add('prod_card-name', 'standart_title', 'standart_title_4', 'color_black');
    prod_name.textContent = `${product.title}`;

    var prod_card = document.createElement('div');
    prod_card.classList.add('prod_card-info');

    var prod_card_cost = document.createElement('div');
    prod_card_cost.classList.add('prod_card-cost', 'main__title', 'main__title_5', 'color_black');
    prod_card_cost.textContent = `${product.price} ${product.currency.code}`;

    var prod_card_btn = document.createElement('a');
    prod_card_btn.classList.add('prod_card-btn');
    prod_card_btn.setAttribute(`href`, product.absolute_url);

    var prod_card_basket = document.createElement('img');
    prod_card_basket.classList.add('absolute_center');
    prod_card_basket.setAttribute('src', '/static/source/img/items/okey.svg');

    // var window_lang = window.location.pathname.split('/')[1];
    // if (window_lang == 'ru' && product.title_ru != null) {
    //   prod_name.textContent = product.title_ru;
    // } else if (window_lang == 'uk' && product.title_uk != null) {
    //   prod_name.textContent = product.title_uk;
    // } else {
    //   prod_name.textContent = product.title;
    // }

    // var prod_cost = document.createElement('div');
    // prod_cost.classList.add('prod_card-cost');
    // // console.log('product.currency.symbol: ', product.currency);
    // if(product.currency !== null) {
      
    //   var currency = product.currency.symbol
    //   if (window_lang == 'ru' && product.currency.symbol_ru != null) {
    //     currency = product.currency.symbol_ru;
    //   } else if (window_lang == 'uk' && product.currency.symbol_uk != null) {
    //     currency = product.currency.symbol_uk;
    //   } else {
    //     currency = product.currency.symbol;
    //   }
     
    // prod_cost.textContent = `${product.final_unconverted_price} ${currency}`;
    // }
    
    card_prof.appendChild(link_wrap);
    link_wrap.appendChild(prod_img);
    // card_prof.appendChild(prod_name);
    card_prof.appendChild(prod_card_info__wrap);
    prod_card_info__wrap.appendChild(prod_name);
    prod_card_info__wrap.appendChild(prod_card);
    prod_card.appendChild(prod_card_cost);
    prod_card.appendChild(prod_card_btn);
    prod_card_btn.appendChild(prod_card_basket);



    return card_prof;
  };



  let test = `

  `