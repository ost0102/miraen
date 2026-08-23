document.querySelectorAll('.tag-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
    });
});
const textarea = document.querySelector('.apply-textarea');
const countEl = document.querySelector('.apply-count em');
if (textarea && countEl) {
    textarea.addEventListener('input', () => {
        countEl.textContent = textarea.value.length;
    });
}
const playBtn = document.querySelector('.video-play-btn');
const video = document.querySelector('.s3-video');
if (playBtn && video) {
    playBtn.addEventListener('click', () => {
        video.setAttribute('controls', '');
        video.play();
        playBtn.classList.add('is-hide');
    });
    video.addEventListener('pause', () => {
        playBtn.classList.remove('is-hide');
    });
    video.addEventListener('ended', () => {
        playBtn.classList.remove('is-hide');
    });
}
const subInner = document.querySelector('.sub-wrap .sub-inner');
const slides = document.querySelectorAll('.sub-wrap .sub-slide');
const tabs = document.querySelectorAll('.sub-wrap .sub-list li');
const prevBtn = document.querySelector('.sub-wrap .prev_btn');
const nextBtn = document.querySelector('.sub-wrap .next_btn');
if (subInner && slides.length && prevBtn && nextBtn) {
    let current = 0;
    let animating = false;
    gsap.set(slides, { xPercent: -50, x: 0 });
    const syncHeight = () => {
        const maxHeight = Math.max(...[...slides].map((slide) => slide.offsetHeight));
        subInner.style.height = maxHeight + 'px';
    };
    syncHeight();
    window.addEventListener('load', syncHeight);
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncHeight, 150);
    });
    const goTo = (index) => {
        if (animating) return;
        const next = (index + slides.length) % slides.length;
        if (next === current) return;
        animating = true;
        const currentSlide = slides[current];
        const nextSlide = slides[next];
        gsap.set(nextSlide, { opacity: 0, visibility: 'visible' });
        gsap.to(currentSlide, {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.set(currentSlide, { visibility: 'hidden' });
            }
        });
        gsap.to(nextSlide, {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.inOut',
            onComplete: () => {
                animating = false;
            }
        });
        tabs[current].classList.remove('on');
        tabs[next].classList.add('on');
        current = next;
    };
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
}
document.querySelectorAll('.floating-top').forEach((topBtn) => {
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

