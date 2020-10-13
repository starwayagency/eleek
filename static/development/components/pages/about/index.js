import './index.scss';

$('.select_drive').select2({
    dropdownAutoWidth: true,
    width: 'resolve',
});


var slickFinder1 = $('.doc_slider').length;
  if (slickFinder1 >= 1) {

    
   
    $('.doc_slider').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        prevArrow: '<div class="eleek_prev_arrow"><</div>',
        nextArrow: '<div class="eleek_next_arrow">></div>',
        lazyLoad: "ondemand",
        speed: 500,
        cssEase: 'linear',
        swipe: false
    });

    $('.eleek_prev_arrow').click(function () {
        $(".doc_slider").slick('slickPrev');
      });
      $('.eleek_next_arrow').click(function () {
        $(".doc_slider").slick('slickNext');
      });


      $('.partner_slider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        prevArrow: '<div class="part_prev_arrow"><</div>',
        nextArrow: '<div class="part_next_arrow">></div>',
        lazyLoad: "ondemand",
        speed: 500,
        cssEase: 'linear',
        swipe: false,
        responsive: [
            {
                breakpoint: 1420,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
        //     {
        //       breakpoint: 419,
        //       settings: {
        //         slidesToShow: 2,
        //         centerPadding: '0',
        //       }
        //   },
        ]
    });

    $('.part_prev_arrow').click(function () {
        $(".partner_slider").slick('slickPrev');
      });
      $('.part_next_arrow').click(function () {
        $(".partner_slider").slick('slickNext');
      });
}