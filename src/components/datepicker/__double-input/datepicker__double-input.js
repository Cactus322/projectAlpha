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