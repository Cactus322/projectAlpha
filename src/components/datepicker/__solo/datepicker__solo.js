let mySoloDatepicker = $('#solo_datepicker').datepicker({
    clearButton: true,

    onShow: function(dp, animationCompleted) {
        $('#solo_datepicker_button').click(function () {
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

mySoloDatepicker.show();
mySoloDatepicker.hide();

$('#solo_datepicker').mouseenter (function () {
    $('.datepicker__filter__button-icon').addClass('hover')
});

$('#solo_datepicker').mouseleave (function () {
    $('.datepicker__filter__button-icon').removeClass('hover')
});

$('.datepicker__filter__button-icon').mouseenter (function () {
    $('#solo_datepicker').addClass('hover')
});

$('.datepicker__filter__button-icon').mouseleave (function () {
    $('#solo_datepicker').removeClass('hover')
});