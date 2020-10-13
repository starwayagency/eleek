import './index.scss';
 
$('.btn-lean_more').on('mouseenter', function(){
    $(this).addClass('is-focus-over');
    $(this).removeClass('is-focus-out');
});
$('.btn-lean_more').on('mouseleave', function(){
    $(this).addClass('is-focus-out');
    $(this).removeClass('is-focus-over');

});


  
 

$(".absolute_product_arrow").hover(
    function () {
        $(this).removeClass('out').addClass('over');
    },
    function () {
        $(this).removeClass('over').addClass('out');
    }
  );
  $(".btn_standart_black").hover(
    function () {
        $(this).removeClass('out').addClass('over');
    },
    function () {
        $(this).removeClass('over').addClass('out');
    }
  );
  $(".btn_standart_yellow").hover(
    function () {
        $(this).removeClass('out').addClass('over');
    },
    function () {
        $(this).removeClass('over').addClass('out');
    }
  );
  $(".btn_standart_transparent").hover(
    function () {
        $(this).removeClass('out').addClass('over');
    },
    function () {
        $(this).removeClass('over').addClass('out');
    }
  );

