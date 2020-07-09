let myFilterDatepicker = $('#filter_datepicker').datepicker({
    minDate: new Date,
    clearButton: true,
    dateFormat: "d M",

    onShow: function(dp, animationCompleted) {
        $('#filter_datepicker_button').click(function () {
            dp.show();
        });

        if (!animationCompleted) {
            $('.datepicker-__buttons-apply').click(function() {
                dp.hide();
            })
        }
    },
}).data('datepicker');

$('div.datepicker--buttons').append('<button class="datepicker--button-apply">Применить</button>');


myFilterDatepicker.show();
myFilterDatepicker.hide();
