const yearNode = document.getElementById("y");
if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".rv");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("on");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("on"));
}

const bikeFrames = [...document.querySelectorAll(".bike-frame")];
const sliderDots = [...document.querySelectorAll(".hero-slider-dots button")];

if (bikeFrames.length && bikeFrames.length === sliderDots.length) {
    let activeIndex = 0;
    let autoAdvance;

    const showSlide = (index) => {
        activeIndex = index;
        bikeFrames.forEach((frame, frameIndex) => {
            const isActive = frameIndex === activeIndex;
            frame.classList.toggle("is-active", isActive);
            frame.setAttribute("aria-hidden", String(!isActive));

            const image = frame.querySelector(".bike-image");
            if (isActive && image.loading === "lazy") {
                image.loading = "eager";
            }
        });

        sliderDots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });
    };

    const startAutoAdvance = () => {
        window.clearInterval(autoAdvance);
        autoAdvance = window.setInterval(() => {
            showSlide((activeIndex + 1) % bikeFrames.length);
        }, 2000);
    };

    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoAdvance();
        });
    });

    showSlide(activeIndex);
    startAutoAdvance();
}
