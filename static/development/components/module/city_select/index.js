


    let select_city = $(".select_city").select2({
        dropdownAutoWidth: true,
        width: "resolve",
        placeholder: gettext("Оберіть місто"),

        language: {
          noResults: function () {
            return gettext("Місто не знайдено");
          },
        },
        ajax: {
          url: `/api/settlements/`,
          data: function (params) {
            console.log(params);
            
            var query = {
              per_page: 20,
              search_query: params.term,
              page_number: params.page || 1,
            };
      
            return query;
          },
          processResults: function (data, params, ...props) {
            params.page = params.page || 1;
          
            let options = data.results.map((item) => {
              console.log(item);
              
              return {
                id: item.id,
                text:  `${item.title} (${item.region.title})`,
                item,
              };
            });
      
            return {
              results: options,
              pagination: {
                more: params.page * 30 < data.count,
              },
            };
          },
        },
      });
   

      $('.select_aria').select2({
        dropdownAutoWidth: true,
        width: 'resolve',  
        language: {
          noResults: function () {
            return gettext("Відділень не знайдено");
          },
        },    
      });
       
        $(".select_city").on("select2:select", function (e) {
        
          $('.select_aria').val([]).trigger("change");
          $('.select_aria').empty();
          let item = e.params.data.item.title;
          
          fetch(`/api/warehouses/?query=${item}`, {
              method: 'GET',
          })
          .then(data => {
            return data.json();
          })
          .then(body => {
            if (body.count != 0) {
              for (let key in body.results) {
                let option_area = document.createElement('option');
                option_area.textContent = body.results[key].title;
                $('.select_aria')[0].appendChild(option_area);
              }
            }
          })   
       
        });

