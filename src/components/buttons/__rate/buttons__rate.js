$('div.rating-area i').hover(function () {
    let $this = $(this);
    $this.nextAll().html('star_border');
    $this.prevUntil().html('star');
    $this.html('star');
});

$('div.rating-area i').mouseout(function () {
    let select = $('div.rating-area i.active');
    select.nextAll().html('star_border');
    select.prevUntil().html('star');
    select.html('star');
});

$('div.rating-area i').click(function () {
    let $this = $(this);
    $this.addClass('active').siblings().removeClass('active');
});