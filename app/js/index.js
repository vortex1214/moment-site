document.addEventListener('DOMContentLoaded', function () {

    // custom vh height
    function setVh() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    setVh();
    window.addEventListener('resize', setVh);

    const body = document.body;
    const burgerBtn = document.querySelector('.js-burger-btn');
    const menuClose = document.querySelector('.js-menu-close');
    const menu = document.querySelector('.js-nav-menu');

    function openMenu() {
        menu.classList.toggle('opened');
        body.classList.toggle('fixed');
    }

    function closeMenu() {
        menu.classList.remove('opened');
        body.classList.remove('fixed');
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openMenu();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    document.addEventListener('click', function (e) {
        if (menu && !menu.contains(e.target) && menu.classList.contains('opened')) {
            closeMenu();
        }
    });

    // ширше 1024 меню вже не мобільне — закриваємо, щоб не лишався body.fixed
    const mobileMenuQuery = window.matchMedia('(max-width: 1024px)');

    mobileMenuQuery.addEventListener('change', function (e) {
        if (!e.matches && menu) {
            closeMenu();
        }
    });

    // поява блоків при прокрутці
    const revealItems = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach(function (item) {
            item.classList.add('is-visible');
        });
    }

    // галереї на сторінках напрямків
    const galleries = document.querySelectorAll('.js-gallery');

    if (galleries.length && typeof Swiper !== 'undefined') {
        galleries.forEach(function (gallery) {
            const section = gallery.closest('.gallery');

            new Swiper(gallery, {
                slidesPerView: 1.2,
                spaceBetween: 16,
                speed: 600,
                grabCursor: true,
                navigation: {
                    prevEl: section.querySelector('.js-gallery-prev'),
                    nextEl: section.querySelector('.js-gallery-next')
                },
                breakpoints: {
                    601: {
                        slidesPerView: 2.2,
                        spaceBetween: 24
                    },
                    1025: {
                        slidesPerView: 3,
                        spaceBetween: 32
                    }
                }
            });
        });
    }

});
