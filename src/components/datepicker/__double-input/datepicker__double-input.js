let myDatepicker = $('#start_datepicker').datepicker({
    minDate: new Date,
    clearButton: true,

    onShow: function(dp, animationCompleted) {
        $('#start_datepicker_button').click(function () {
            dp.show();
        });

        $('#end_datepicker_button').click(function () {
            dp.show();
        });

        if (!animationCompleted) {
            $('.datepicker-__buttons-apply').click(function() {
                dp.hide();
            })
        }

        if (!animationCompleted) {
            $('#end_datepicker').click(function () {
                dp.show();
            })
        }
    },

    onSelect: function (fd, dp, date, formattedDate) {
        $("#start_datepicker").val(fd.split("-")[0]);
        $("#end_datepicker").val(fd.split("-")[1]);
    },
}).data('datepicker');

myDatepicker.show();
myDatepicker.hide();

$('#start_datepicker').mouseenter (function () {
    $('.datepicker__filter__button-icon-start').addClass('hover')
});

$('#start_datepicker').mouseleave (function () {
    $('.datepicker__filter__button-icon-start').removeClass('hover')
});

$('.datepicker__filter__button-icon-start').mouseenter (function () {
    $('#start_datepicker').addClass('hover')
});

$('.datepicker__filter__button-icon-start').mouseleave (function () {
    $('#start_datepicker').removeClass('hover')
});



$('#end_datepicker').mouseenter (function () {
    $('.datepicker__filter__button-icon-end').addClass('hover')
});

$('#end_datepicker').mouseleave (function () {
    $('.datepicker__filter__button-icon-end').removeClass('hover')
});

$('.datepicker__filter__button-icon-end').mouseenter (function () {
    $('#end_datepicker').addClass('hover')
});

$('.datepicker__filter__button-icon-end').mouseleave (function () {
    $('#end_datepicker').removeClass('hover')
});