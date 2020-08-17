let myFilterDatepicker = $('#filter_datepicker').datepicker({
    minDate: new Date,
    clearButton: true,
    dateFormat: "d M",

    onShow: function(dp, animationCompleted) {
        $('#filter_datepicker_button').click(function () {
            dp.show();
        });

        if (!animationCompleted) {
            $('.datepicker--buttons-apply').click(function() {
                dp.hide();
            })
        }
    },
}).data('datepicker');

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
