$('#start_datepicker').datepicker({
    minDate: new Date,
    clearButton: true,

    onShow: function(dp, animationCompleted) {
        if (!animationCompleted) {
            $('.datepicker--button-apply').click(function() {
                dp.hide();
            })
        }
    },

    onSelect: function (fd, dp, date, formattedDate) {
        $("#start_datepicker").val(fd.split("-")[0]);
        $("#end_datepicker").val(fd.split("-")[1]);
    },
});

$('div.datepicker--buttons').append('<button class="datepicker--button-apply">Применить</button>');
$('nav div.datepicker--nav-action').append('<h2>123</h2>');