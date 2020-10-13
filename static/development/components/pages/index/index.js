import './index.scss';
import './second_section.scss';
import './three_section.scss';
import './four_section.scss';
import './five_section.scss';
import './six_section.scss';



$.fn.visible = function(partial) {

  var $t            = $(this),
      $w            = $(window),
      viewTop       = $w.scrollTop(),
      viewBottom    = viewTop + $w.height(),
      _top          = $t.offset().top,
      _bottom       = _top + $t.height(),
      compareTop    = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;

  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

};

function parallaxEffect(target, data_smooth) {
  var element = $(target);

  element.each(function (i, el) {

      var move = $(el);

      $(window).scroll(function (event) {

         
         var top =  move.offset().top - $(this).scrollTop();
        
        
          if (move.visible(true)) {
              move.addClass("moving-target").css({
                  "transform": "translateY(" + top / data_smooth + "px)",
                  "-webkit-transform": "translateY(" + top / data_smooth + "px)",
                  "-moz-transform": "translateY(" + top / data_smooth + "px)"
              });
          } else {
              move.removeClass("moving-target");
          }

      });
  });
}



parallaxEffect('.absolute_product_profile_1', 5);
parallaxEffect('.absolute_product_profile_2', 7);
parallaxEffect('.absolute_product_profile_3', 5);
parallaxEffect('.absolute_product_profile_4', 7);
parallaxEffect('.absolute_product_profile_5', 5);
parallaxEffect('.eleek_title__wrap', 10);






/** @preserve jQuery animateNumber plugin v0.0.14
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */

// ['...'] notation using to avoid names minification by Google Closure Compiler
(function($) {
  var reverse = function(value) {
    return value.split('').reverse().join('');
  };

  var defaults = {
    numberStep: function(now, tween) {
      var floored_number = Math.floor(now),
          target = $(tween.elem);

      target.text(floored_number);
    }
  };

  var handle = function( tween ) {
    var elem = tween.elem;
    if ( elem.nodeType && elem.parentNode ) {
      var handler = elem._animateNumberSetter;
      if (!handler) {
        handler = defaults.numberStep;
      }
      handler(tween.now, tween);
    }
  };
  if (!$.Tween || !$.Tween.propHooks) {
    $.fx.step.number = handle;
  } else {
    $.Tween.propHooks.number = {
      set: handle
    };
  }

  var extract_number_parts = function(separated_number, group_length) {
    var numbers = separated_number.split('').reverse(),
        number_parts = [],
        current_number_part,
        current_index,
        q;

    for(var i = 0, l = Math.ceil(separated_number.length / group_length); i < l; i++) {
      current_number_part = '';
      for(q = 0; q < group_length; q++) {
        current_index = i * group_length + q;
        if (current_index === separated_number.length) {
          break;
        }

        current_number_part = current_number_part + numbers[current_index];
      }
      number_parts.push(current_number_part);
    }

    return number_parts;
  };

  var remove_precending_zeros = function(number_parts) {
    var last_index = number_parts.length - 1,
        last = reverse(number_parts[last_index]);

    number_parts[last_index] = reverse(parseInt(last, 10).toString());
    return number_parts;
  };

  $.animateNumber = {
    numberStepFactories: {
      /**
       * Creates numberStep handler, which appends string to floored animated number on each step.
       *
       * @example
       * // will animate to 100 with "1 %", "2 %", "3 %", ...
       * $('#someid').animateNumber({
       *   number: 100,
       *   numberStep: $.animateNumber.numberStepFactories.append(' %')
       * });
       *
       * @params {String} suffix string to append to animated number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      append: function(suffix) {
        return function(now, tween) {
          var floored_number = Math.floor(now),
              target = $(tween.elem);

          target.prop('number', now).text(floored_number + suffix);
        };
      },

      /**
       * Creates numberStep handler, which format floored numbers by separating them to groups.
       *
       * @example
       * // will animate with 1 ... 217,980 ... 95,217,980 ... 7,095,217,980
       * $('#world-population').animateNumber({
       *    number: 7095217980,
       *    numberStep: $.animateNumber.numberStepFactories.separator(',')
       * });
       * @example
       * // will animate with 1% ... 217,980% ... 95,217,980% ... 7,095,217,980%
       * $('#salesIncrease').animateNumber({
       *   number: 7095217980,
       *   numberStep: $.animateNumber.numberStepFactories.separator(',', 3, '%')
       * });
       *
       * @params {String} [separator=' '] string to separate number groups
       * @params {String} [group_length=3] number group length
       * @params {String} [suffix=''] suffix to append to number
       * @returns {Function} numberStep-compatible function for use in animateNumber's parameters
       */
      separator: function(separator, group_length, suffix) {
        separator = separator || ' ';
        group_length = group_length || 3;
        suffix = suffix || '';

        return function(now, tween) {
          var negative = now < 0,
              floored_number = Math.floor((negative ? -1 : 1) * now),
              separated_number = floored_number.toString(),
              target = $(tween.elem);

          if (separated_number.length > group_length) {
            var number_parts = extract_number_parts(separated_number, group_length);

            separated_number = remove_precending_zeros(number_parts).join(separator);
            separated_number = reverse(separated_number);
          }

          target.prop('number', now).text((negative ? '-' : '') + separated_number + suffix);
        };
      }
    }
  };

  $.fn.animateNumber = function() {
    var options = arguments[0],
        settings = $.extend({}, defaults, options),

        target = $(this),
        args = [settings];

    for(var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    }

    // needs of custom step function usage
    if (options.numberStep) {
      // assigns custom step functions
      var items = this.each(function(){
        this._animateNumberSetter = options.numberStep;
      });

      // cleanup of custom step functions after animation
      var generic_complete = settings.complete;
      settings.complete = function() {
        items.each(function(){
          delete this._animateNumberSetter;
        });

        if ( generic_complete ) {
          generic_complete.apply(this, arguments);
        }
      };
    }

    return target.animate.apply(target, args);
  };

}(jQuery));

var slickFinder1 = $('.bike_trailer__block').length;
  if (slickFinder1 >= 1) {
    $('.bike_trailer__block').on('init', function(event, slick) {
      $('.slick-active .slide-name').css('opacity', '1');
      
      //applyHiddenClass();
    })
   
    $('.bike_trailer__block').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        prevArrow: '<div class="slick-first"><</div>',
        nextArrow: '<div class="slick-second">></div>',
        lazyLoad: "ondemand",
        speed: 1700,
        cssEase: 'cubic-bezier(0.550, 0.005, 0.440, -0.070)',
        swipe: false
    });

      $('.slick-first').click(function () {
        $(".bike_trailer__block").slick('slickPrev');
      });
      $('.slick-second').click(function () {
        $(".bike_trailer__block").slick('slickNext');
      });

      find_width_progress();
      $('.bike_trailer__block').on('afterChange', function(event, slick, currentSlide, nextSlide){
        let count_cloned = $('.bike_trailer__block').find('.slick-cloned').length;
        let count_block = $('.bike_trailer__block').find('.slick-slide').length;
        let main_sum = count_block - count_cloned;
        let current_slide = currentSlide + 1;
        let one_slide = 100 / main_sum;
        let reuslt = one_slide * current_slide;
        $('.line_active').css('width', `${reuslt}%`);
        $('.first_num_name').text(`0${currentSlide + 1}`);
        return_data_arrow('next');
      });

      $('.bike_trailer__block').on('beforeChange', function(event, slick, currentSlide, nextSlide){
       
        applyHiddenClass(nextSlide);
      });
      //
     
      
      var currSlide = 0;
      var nextSlide = 0;
      
      function applyHiddenClass(position) {
            let next_index = position + 1;
            setTimeout(() => {
            let main_slider = $('.bike_trailer__block').find('.slick-slide');
            let current_slider = $('.bike_trailer__block').find('.slick-current');
           
            let arrow_position = $('.nav_for_bike_trailer').attr('data-arrow');
            let active_index;
            if (arrow_position == 'next') {
              active_index = next_index;
            } else if (arrow_position == 'prev') {
              active_index = next_index - 1;
              if (active_index == 0) {
                active_index = 4;
              }
            }
            console.log('active_index: ', active_index);

            $.each(main_slider, function(index, value) {
              let value_index = Number($(value).find('.bike_trailer__wrapper').attr('data-index'));
              let current_text = $(value).find('.slide-name');
              let current_img = $(value).find('.slide-img');

              if (next_index == value_index) {
                setTimeout(() => {
                  $(current_img).css('opacity', 1);
                  $(current_img).css('left', '0px');
                }, 600);
                setTimeout(() => {
                  $(current_text).css('opacity', 1);
                }, 1500);

              } else {
                $(current_img).css('left', '-20%');
                $(current_img).css('opacity', 0);

                setTimeout(() => {
                  $(current_text).css('opacity', 0);
                }, 600);
                
              }
            
            });
                
            
            }, 0);
      }
      
      $('.slick-first').on('click', function() {
        return_data_arrow('prev');
      });
      $('.slick-second').on('click', function() {
        return_data_arrow('next');
      });


      function return_data_arrow(arrow) {
        $('.nav_for_bike_trailer').attr('data-arrow', arrow);
      }
      
      
      //







        
  }

  

  function find_width_progress() {
      let count_cloned = $('.bike_trailer__block').find('.slick-cloned').length;
      let count_block = $('.bike_trailer__block').find('.slick-slide').length;
      let main_sum = count_block - count_cloned;
      let text_num;
        if (main_sum <= 9) {
          text_num = '0' + main_sum;
        } else {
          text_num = main_sum;
        }
      $('.last_click_num').text(text_num);
      $('.line_active').css('width', `${100 / main_sum}%`);
      return main_sum;
      
      
  }


  var slickFinder2 = $('.eleek_slider__wrap').length;
  if (slickFinder2 >= 1) {

      function setSlideVisibility() {
        //Find the visible slides i.e. where aria-hidden="false"
        var visibleSlides = $('.eleek_prev_arrow').find('.slick-slideshow__slide[aria-hidden="false"]');
        //Make sure all of the visible slides have an opacity of 1
        $(visibleSlides).each(function() {
          $(this).css('opacity', 1);
        });
      
        //Set the opacity of the first and last partial slides.
        $(visibleSlides).first().prev().css('opacity', 0);
      }
      
      $('.eleek_slider__wrap').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: '450px',
        arrows: true,
        prevArrow: '<div class="eleek_prev_arrow"></div>',
        nextArrow: '<div class="eleek_next_arrow"></div>',
        lazyLoad: "ondemand",
        responsive: [
          {
              breakpoint: 1710,
              settings: {
                centerPadding: '250px',
              }
          },
          {
              breakpoint: 1000,
              settings: {
                centerPadding: '150px',
              }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1,
              centerPadding: '0px',
            }
        },
      ]
      });
      $('.eleek_slider__wrap').slick('slickGoTo', 1);
      setSlideVisibility();
      
      $('.eleek_slider__wrap').on('afterChange', function() {
        setSlideVisibility();
      });


    $('.eleek_prev_arrow').click(function () {
      $(".eleek_slider__wrap").slick('slickPrev');
    });
    $('.eleek_next_arrow').click(function () {
      $(".eleek_slider__wrap").slick('slickNext');
    });


    $('.complect__wrap').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      // autoplay: true,
      centerMode: true,
      centerPadding: '200px',
      // arrows: true,
      lazyLoad: "ondemand",
      responsive: [
        {
            breakpoint: 934,
            settings: {
              centerPadding: '150px',
            }
        },
        {
            breakpoint: 676,
            settings: {
              centerPadding: '100px',
            }
        },
        {
          breakpoint: 419,
          settings: {
            slidesToShow: 2,
            centerPadding: '0',
          }
      },
    ]

    });
    $('.complect__wrap').slick('slickGoTo', 1);
      setSlideVisibility();
      
      $('.complect__wrap').on('afterChange', function() {
        setSlideVisibility();
      });
  }

var index_wow_1 = new WOW(
    {
      boxClass:     'preferens__wrap',      // animated element css class (default is wow)
      animateClass: 'preferens_anim', // animation css class (default is animated)
      offset:       85,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true, 
    }
  );
  index_wow_1.init();

  var index_wow_2 = new WOW(
    {
      boxClass:     'down_wrap',      // animated element css class (default is wow)
      animateClass: 'fadeInUp', // animation css class (default is animated)
      offset:       85,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true, 
    }
  );
  index_wow_2.init();

  let check_num = setInterval(() => {
    if ($('.preferens__wrap').hasClass('preferens_anim')) {
      console.log('!!!');
      
  $({ blurRadius: 5 }).animate(
    { blurRadius: 0 },
    {
      duration: 2000,
      easing: "swing",
      step: function () {
        // $(".lines").css({
        //   "-webkit-filter": "blur(" + this.blurRadius + "px)",
        //   filter: "blur(" + this.blurRadius + "px)"
        // });
      }
    }
  );
  var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(" ");
  $(".lines").each(function () {
    var tcount = $(this).data("count");
    $(this).animateNumber(
      {
        number: tcount,
        easing: "easeInQuad",
        // "font-size": "40px",
        numberStep: comma_separator_number_step
      },
      2000
    );
  });
  
      clearInterval(check_num);
    }
  }, 500);
  check_num;





  // var index_wow_1 = new WOW(
  //   {
  //     boxClass:     'video_block',      // animated element css class (default is wow)
  //     animateClass: 'video_style', // animation css class (default is animated)
  //     offset:       85,          // distance to the element when triggering the animation (default is 0)
  //     mobile:       true,       // trigger animations on mobile devices (default is true)
  //     live:         true,       // act on asynchronously loaded content (default is true)
  //     scrollContainer: null,    // optional scroll container selector, otherwise use window,
  //     resetAnimation: true, 
  //   }
  // );
  // index_wow_1.init();

  // var animFinder = $('.first_section').length;
  // if (animFinder >= 1) {
  //   setInterval(() => {
  //     if ($('.eleek_video').hasClass('video_style')) {
  //       $('.eleek_video').attr('autoplay', 'autoplay');
  //     }
  //   }, 100);
  // }
  
  $(window).resize(function() {
    // create_slider();
  });
  // create_slider();
  // function create_slider() {
  //   let width = window.innerWidth;
  //   console.log('width: ', width);
    
  // }

  // $('.glo').on('mouseout', function(event) {
  //   /* event.target: внешний элемент */
  //   console.log(1);
  // });

  $(".btn_standart_transparent").hover(
    function () {
        $(this).removeClass('out').addClass('over');
    },
    function () {
        $(this).removeClass('over').addClass('out');
    }
  );





  $('.eleek_slide').on('click', function() {
    let link = $(this).find('.eleek_slide_btn').attr('href');
    window.location = link;
  });
