const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 10,
    effect: 'coverflow',
    slidesPerView: 1,
    coverflowEffect: {
        depth: 100,
        rotate: 30,
        slideShadows: true,
        streach: 0,
        modifier: 1,
        scale: 1
    },
    autoplay: {
        delay: 1500,
        waitForTransition: true
    },
    breakpoints: {
        320: { // when window width is >= 320px
            slidesPerView: 1,
            effect: 'slides'
        },
        460: { // when window width is >= 320px
            slidesPerView: 2,
            spaceBetween: 10,
            effect: 'slides'
        },
        // >= medium
        767.98: {
            slidesPerView: 3,
            spaceBetween: 15
        },
    }
});
const swiperIndex = new Swiper('.swiper-index', {
    slidesPerView: 10,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    breakpoints: {
        320: { slidesPerView: 3 },
        480: { slidesPerView: 4 },
        560: { slidesPerView: 5 },
        768: { slidesPerView: 6 },
        1024: { slidesPerView: 8 },
        1280: { slidesPerView: 9 }
    }
});
