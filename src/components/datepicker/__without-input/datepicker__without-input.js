let DatepickerWithoutInput = $('#input_datepicker').datepicker({
    clearButton: true,

    onShow: function(dp, animationCompleted) {
        $('#input_datepicker_button').click(function () {
            dp.show();
        });

        if (!animationCompleted) {
            $('.datepicker--buttons-apply').click(function() {
                dp.hide();
            })
        }
    },
}).data('datepicker');

$('div.datepicker--buttons').append('<button class="datepicker--button-apply">Применить</button>');

DatepickerWithoutInput.show();
