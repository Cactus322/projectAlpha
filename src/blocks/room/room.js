/*
let a = Math.round(Math.random() * 12);
let room = document.querySelectorAll("room-image");
roomImage = new Array();
roomImage[0]="../../images/all/room-1.png";
roomImage[1]="../../images/all/room-2.png";
roomImage[2]="../../images/all/room-3.png";
roomImage[3]="../../images/all/room-4.png";
roomImage[4]="../../images/all/room-5.png";
roomImage[5]="../../images/all/room-6.png";
roomImage[6]="../../images/all/room-7.png";
roomImage[7]="../../images/all/room-8.png";
roomImage[8]="../../images/all/room-9.png";
roomImage[9]="../../images/all/room-10.png";
roomImage[10]="../../images/all/room-11.png";
roomImage[11]="../../images/all/room-12.png";
room.src=""+ roomImage[a] +"";

console.log(document.querySelectorAll("room-image"));*/

$('.room-gallery-icon').click(function () {
    let $this = $(this);
    $this.addClass('active').siblings().removeClass('active');
});

$('.room-gallery-icon').hover(function () {
    let $this = $(this);
    $this.toggleClass('hover')
})

$('.trigger-img-1').click(function () {
    console.log('click')
    $('.room-gallery ul').css({'marginLeft' : '0'});

})

$('.trigger-img-2').click(function () {
    $('.room-gallery ul').css({'marginLeft' : '-270px'});

})

$('.trigger-img-3').click(function () {
    $('.room-gallery ul').css({'marginLeft' : '-540px'});

})

$('.trigger-img-4').click(function () {
    $('.room-gallery ul').css({'marginLeft' : '-810px'});

})