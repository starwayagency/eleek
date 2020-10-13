import './index.scss'
 

$('.footer_btn').on('click', function() {
    let wrap = $(this).parents('.footer_accordeon__block');
    if ($(this).hasClass('footer_btn_active')) {
        console.log(1);
        $(this).removeClass('footer_btn_active');
        $(wrap).find('.footer_accordeon_content').removeClass('footer_accordeon_content_active');
    } else {
        console.log(2);
        $(wrap).find('.footer_accordeon_content').addClass('footer_accordeon_content_active');
        $(this).addClass('footer_btn_active');
    }
});

    var inputHasFocus = $('.input_focus');

    inputHasFocus.on('focus', function () {
        let focusFinder = $(this).parents('.inp-vak-wrap').find('.label__style');
        focusFinder.addClass('label__style_active');
    });

    inputHasFocus.on('blur', function () {
        if ($(this).val().length < 1 || $(this).val() == '+38(___) __ __ ___') {
            let blurFinder = $(this).parents('.inp-vak-wrap').find('.label__style');
            blurFinder.removeClass('label__style_active');
        }

    });