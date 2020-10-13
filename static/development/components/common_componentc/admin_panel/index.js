import './index.scss'

  sessionStorage.setItem('admin_panell', 1);
  console.log('finish');
  // admin panel ============================>
  // сторінка повина починатись по стандарту з admin_check = 1
  var only_on_click = true;
  var admin_panels = document.querySelectorAll('.db_content');

  var admin_check = sessionStorage.getItem('admin_panell');
  console.log('admin_check: ', admin_check);
  if (admin_check == 0) {
    only_on_click = false;
    $('.admin_button').attr('data-title', 'Виключити редагування');
    $('.admin_checkbox').attr('checked', '');
    $('.db_content').addClass('db_content_active');
    admin_check = sessionStorage.getItem('admin_panell');
    admin_panels.forEach(function (item, index, array) {
      // var link_adress = $(item).data('admin_url');
      var hidden_panel = document.createElement('div');
      hidden_panel.classList.add('db_hidden_content');
      var hidden_link = document.createElement('span');
      hidden_link.classList.add('db_hidden_link');
      // hidden_link.setAttribute(`href`, link_adress);
      hidden_link.textContent = 'Редагувати';
      hidden_panel.appendChild(hidden_link);
      item.appendChild(hidden_panel);
    });
  }
  $('.svg_power').on('click', function () {
    admin_func();
  });

  $('.db_content').on('click', function() {
    if ($(this).hasClass('db_content_active')) {
      let current_url = $(this).attr('data-admin_url');
      window.open(current_url);
    }
  })


  function admin_func() {


    if (only_on_click) {
      only_on_click = false;
      $('.admin_button').attr('data-title', 'Виключити редагування');
      $('.db_content').addClass('db_content_active');

      sessionStorage.setItem('admin_panell', 0);
      admin_check = sessionStorage.getItem('admin_panell');
      admin_panels.forEach(function (item, index, array) {
        // var link_adress = $(item).data('admin_url');
        var hidden_panel = document.createElement('div');
        hidden_panel.classList.add('db_hidden_content');
        var hidden_link = document.createElement('span');
        hidden_link.classList.add('db_hidden_link');
        // hidden_link.setAttribute(`href`, link_adress);
        hidden_link.textContent = 'Редагувати';
        hidden_panel.appendChild(hidden_link);
        item.appendChild(hidden_panel);
      });

    } else {
      $('.admin_button').attr('data-title', 'Включити редагування');
      $('.db_content').removeClass('db_content_active');

      only_on_click = true;
      sessionStorage.setItem('admin_panell', 1);
      admin_check = sessionStorage.getItem('admin_panell');
      admin_panels.forEach(function (item, index, array) {
        $('.db_hidden_content').remove();
      });
    }
  }


  // admin panel ============================>
