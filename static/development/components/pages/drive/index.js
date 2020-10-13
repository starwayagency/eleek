import './index.scss';

$('.select_drive').select2({
    dropdownAutoWidth: true,
    width: 'resolve',
    language: {
        noResults: function (params) {
          return "Немає результатів";
        }
      }
});

