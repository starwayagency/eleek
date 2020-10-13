import './index.scss'
 

{
     
    $('.checkbox__db_content').on('change',function(){
        let control_edit,control_btn;
        let checked_edit = $(this)[0].checked;
       
        control_btn = create__btn();
        addControlBtn(checked_edit,control_btn);
        

        

    })    
}

function addControlBtn(state,btn){
 
     if(state){
        let edit_texts = document.getElementsByClassName('db_content');
        let edit_texts_leng = edit_texts.length;
        for (let index = 0; index < edit_texts_leng; index++) {
            const element = edit_texts[index];
            element.classList.add('db_content-active');
            const item_href = element.dataset.admin_url;

           
               
            $( btn ).attr('href',item_href).appendTo(element);
            let btn1 = element.querySelectorAll('.edit_link')[0];
            btn1.addEventListener('mouseenter', e=>{
                cursor.classList.add('is-hover')
                cursor.classList.remove('is-not_hover')
            })
            btn1.addEventListener('mouseleave', e=>{
                cursor.classList.remove('is-hover')
                cursor.classList.add('is-not_hover')
            })
        }

             
     }else{
        let edit_texts = document.getElementsByClassName('db_content');
        let edit_texts_leng = edit_texts.length;

        for (let index = 0; index < edit_texts_leng; index++) {
            const element = edit_texts[index];
            element.classList.remove('db_content-active');
        }
        $('.edit_link').remove();
     }
}
function create__btn (){
    return `
    <a href="#" target="_blank" class="edit_link btn">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit"
          class="svg-inline--fa fa-edit fa-w-18" role="img" viewBox="0 0 576 512">
          <path fill="currentColor"
            d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
        </svg>
        `;
}
 