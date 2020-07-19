$('.like__button').on('click', function () {
    if(!this.classList.contains('liked')) {
        this.classList.add('liked');
        let numberUpdate = parseInt($('.like__button span').html()) + 1;
        $('.like__button span').html(numberUpdate);
        $('.like__button i').html('favorite')
    } else {
        this.classList.remove('liked');
        numberUpdate = parseInt($('.like__button span').html()) - 1;
        $('.like__button span').html(numberUpdate);
        $('.like__button i').html('favorite_border')
    }
});

$('.like__button-second').on('click', function () {
    if(!this.classList.contains('liked')) {
        this.classList.add('liked');
        let numberUpdate = parseInt($('.like__button-second span').html()) + 1;
        $('.like__button-second span').html(numberUpdate);
        $('.like__button-second i').html('favorite')
    } else {
        this.classList.remove('liked');
        numberUpdate = parseInt($('.like__button-second span').html()) - 1;
        $('.like__button-second span').html(numberUpdate);
        $('.like__button-second i').html('favorite_border')
    }
});