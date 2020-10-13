import './index.scss'

$('.radio_group__header').on('click',function(){
    delete_load_file();

    if( !$(this).parent('.radio_group-check').hasClass('is-active')){
      
      let change_chack = $(this).parent('.radio_group-check').data('chenge');
   
      $('.change_chack').val(change_chack);
      $(this).parents('.form_container__main').find('.radio_group-check').removeClass('is-active');
      $(this).parent('.radio_group-check').addClass('is-active');
    }
  })


  $('.form_file_load').on('click',function(){
    event.preventDefault();
    $('#file_logo__life').trigger('click');
  
    let dropArea = event.target;

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false)
    })
    function preventDefaults (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    // начало перетаскивания
    ;['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false)
    })
    ;['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false)
    })
    function highlight(e) {
      dropArea.classList.add('highlight')
    }
    function unhighlight(e) {
      dropArea.classList.remove('highlight')
    }
    // конец перетаскивания

    // Загрузка файла
    dropArea.addEventListener('drop', handleDrop, false)
    function handleDrop(e) {
      let dt = e.dataTransfer
      let files = dt.files

      document.getElementById("file_logo__life").files = files;
      
      for (var i = 0; i < files.length; i++) {
        var file = files.item(i);
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          load_file(file.name);  
        };
      }
    }
    // Кінець загрузки файла
  })

 
  if(document.getElementById('file_logo__life') != null){
    document.getElementById('file_logo__life').addEventListener('change', function(){
      if( this.value ){
        load_file(this.files[0].name);
      }  
    });
  }
  
  
  function load_file(fail_name){
    let cout_cahr = 15;
    let checbox = document.getElementsByClassName('radio_group-check is-active');
    let form_file_load = checbox[0].querySelectorAll('.form_file_load');
    let form_file_downloads = checbox[0].querySelectorAll('.form_file_downloads');
    let name__file = form_file_downloads[0].querySelectorAll('.text');
    
    form_file_load[0].classList.add('hidden');
    fail_name = fail_name.length>cout_cahr? `${fail_name.slice(0,cout_cahr)}...`: fail_name; 
    name__file[0].textContent = fail_name;
    form_file_downloads[0].classList.remove('hidden');
    
    form_file_downloads[0].addEventListener('click',function(){  
      delete_load_file();
    })

  }


  function delete_load_file(){
    $('#file_logo__life').val('');
    let checbox = document.getElementsByClassName('radio_group-check is-active');
    let form_file_load = checbox[0].querySelectorAll('.form_file_load');
    let form_file_downloads = checbox[0].querySelectorAll('.form_file_downloads');

    if(form_file_downloads.length>0){
      form_file_downloads[0].classList.add('hidden');
      form_file_load[0].classList.remove('hidden');
    }
  }