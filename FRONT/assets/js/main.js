$(function() {
	// 메인 비주얼
    var visualSwiper = new Swiper(".visualSwiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 1,
        speed:2000,
    });

    let sw = 0;
    $('.swiper-button-stop').on('click', function(){
        if(sw == 0){
            visualSwiper.autoplay.stop();
            $(this).addClass('start').text('시작');
            sw = 1;
        }else{
            visualSwiper.autoplay.start();
            $(this).removeClass('start').text('정지');
            sw = 0;
        }
    });

    // 메인 콘텐츠 2단
    var mainCont02 = new Swiper(".mainCont02", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        slidesPerView: "auto", // 모바일
        spaceBetween: 10,
        loop : true,
        autoplay : true,
        speed:1500,
        loopAdditionalSlides :2,
        breakpoints: {
            1281: { // 1281px 이상
                slidesPerView: 4,
                spaceBetween: 54,
            },
            1161: { // 1161px ~ 1280px
                slidesPerView: 4,
                spaceBetween: 50,
            },
            // 768: { // 768px ~ 1280px
            //     slidesPerView: 4,
            //     spaceBetween: 30,
            // }
        }
    });

    // 메인 콘텐츠 3단
    var insightSwiper = new Swiper(".insightSwiper", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        slidesPerView: "auto",
        spaceBetween: 10,
        observeParents: true,
        observer: true,
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
            1160: {
                spaceBetween: 40,
            }
        }
    });
});