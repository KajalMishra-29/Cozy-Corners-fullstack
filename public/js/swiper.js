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
