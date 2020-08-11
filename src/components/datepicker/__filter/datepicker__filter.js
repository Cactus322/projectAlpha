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


$('#filter_datepicker').mouseenter (function () {
    $('.datepicker__filter__button-icon').addClass('hover')
});

$('#filter_datepicker').mouseleave (function () {
    $('.datepicker__filter__button-icon').removeClass('hover')
});

$('.datepicker__filter__button-icon').mouseenter (function () {
    $('#filter_datepicker').addClass('hover')
});

$('.datepicker__filter__button-icon').mouseleave (function () {
    $('#filter_datepicker').removeClass('hover')
});