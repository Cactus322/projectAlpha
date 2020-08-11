import 'jquery-ui/ui/widgets/slider';

$( function() {
    $( "#range-slider" ).slider({
        range: true,
        min: 0,
        max: 15800,
        values: [ 5000, 10000 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "₽" + ui.values[ 0 ] + " - ₽" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val($( "#range-slider" ).slider( "values", 0 ) +
        "₽ - " + $( "#range-slider" ).slider( "values", 1 ) + "₽");
});