// Smooth parallax engine
// - finds parallax sections and animates background transforms using requestAnimationFrame
// - adjust `strength` to control how much the background moves (0 = no movement, 1 = full scroll)

(function () {
    const layers = [];

    // Hero: uses the ::before background from CSS -- we animate its translateY
    const hero = document.getElementById('hero');
    if (hero) {
        const before = hero; // animate the element's pseudo background by setting transform on element's style (affects what's visible)
        layers.push({ el: before, strength: 0.35, type: 'hero' });
    }

    // Generic .parallax-bg sections
    document.querySelectorAll('.parallax-bg').forEach(section => {
        const layer = section.querySelector('.parallax-bg__layer');
        const bg = section.getAttribute('data-bg');
        if (bg) { layer.style.backgroundImage = `url('${bg}')`; }
        layers.push({ el: layer, strength: .15, type: 'bg', parent: section });
    });

    // For hero we can't easily style ::before from JS across browsers; instead we'll insert an absolutely positioned image
    // (support for the above approach): create a layer element above and fill it with the same image.
    (function enhanceHero() {
        if (!hero) return;
        const imgUrl = getComputedStyle(document.documentElement).getPropertyValue('--bg-image').trim();
        const match = imgUrl.match(/url\(['"]?(.*)['"]?\)/);
        const url = match ? match[1] : null;
        if (!url) return;
        const layer = document.createElement('div');
        layer.style.position = 'absolute';
        layer.style.inset = '0';
        layer.style.backgroundImage = `url('${url}')`;
        layer.style.backgroundSize = 'cover';
        layer.style.backgroundPosition = 'center';
        layer.style.willChange = 'transform';
        layer.style.zIndex = '0';
        hero.insertBefore(layer, hero.firstChild);
        // push a controlled reference for animation
        layers.push({ el: layer, strength: 0.35, type: 'hero-layer', parent: hero });
    })();

    // state for animation
    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function update() {
        const viewportHeight = window.innerHeight;

        layers.forEach(item => {
            const el = item.el;
            const strength = item.strength || 0.2;

            if (item.type === 'bg') {
                // calculate how far the parent is from the viewport top
                const rect = item.parent.getBoundingClientRect();
                // center offset (-viewport -> +viewport)
                const offset = rect.top + rect.height / 2 - viewportHeight / 2;
                const move = clamp(-offset * strength, -rect.height * 0.6, rect.height * 0.6);
                el.style.transform = `translate3d(0, ${move}px, 0) scale(1.1)`;
            } else if (item.type === 'hero-layer' || item.type === 'hero') {
                const rect = (item.parent || el).getBoundingClientRect();
                const offset = rect.top;
                // hero starts at top: move based on page scroll
                const move = clamp(-offset * strength, -100, 100);
                el.style.transform = `translate3d(0, ${move}px, 0) scale(1.05)`;
            }
        });

        ticking = false;
    }

    // initial update
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', requestTick);
})();