import './index.scss';

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