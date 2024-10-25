$(function() {
	// 메인 1단
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
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 1,
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

    // 메인 2단
    var infoSwiper = new Swiper(".infoSwiper", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });

    // 메인 3단
    var serviceSwiper = new Swiper(".serviceSwiper", {
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        slidesPerView: "auto", // 모바일
        spaceBetween: 10,
        breakpoints: {
            768: { // 768px 이상
                slidesPerView: "auto",
                spaceBetween: 30,
            },
            1500: { // 1500px 이상
                slidesPerView: 5,
                spaceBetween: 54,
            }
        }
    });

    // 메인 4단
    var insightSwiper = new Swiper(".insightSwiper", {
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
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

    // 메인 5단
    var cmntySwiper = new Swiper(".cmntySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // centeredSlides: false,
        // freeMode: true,
        // freeModeSticky: true,
    });
});