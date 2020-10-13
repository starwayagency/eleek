import './index.scss'

let field_inputs  = $('.textarea-field');
if(field_inputs.length>0){
    field_inputs.on('focus', function() {
        $(this).parents('.textarea').addClass('in-focus')
        $(this).parents('.textarea').removeClass('is-error')

    })
    field_inputs.on('blur', function() {
        if ($(this).val().length < 1 || $(this).val() == '+38(___) ___-____') {
            $(this).parents('.textarea').removeClass('in-focus')
        }
    })
    $('.form__group_label').on('click', function() {
        $(this).parents('.textarea').toggleClass('in-focus')
    })
console.log(field_inputs );

    for (const key in field_inputs) {
        if (field_inputs.hasOwnProperty(key) &&  typeof field_inputs[key] == 'object' ) {
            let input = field_inputs[key];    
            console.log($(input).val().length );
            
            if ($(input).val().length > 1  ) {
                $(input).parents('.textarea').addClass('in-focus')
            }else{
                $(input).parents('.textarea').removeClass('in-focus')
            }
        }
    }    
}