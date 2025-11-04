// Anchor links Arrow + Image Zoom Animation
document.addEventListener('footerLoaded', () => {
    const teaserItems = document.querySelectorAll('.teaser-item');

    teaserItems.forEach(item => {
        const arrowImg = item.querySelector('.anchor-arrow');
        const teaserImg = item.querySelector('.a-image img');
        const anchorParent = item.closest('a') || item.querySelector('a');

        let arrowTween, zoomTween;

        if (anchorParent) {
            // On hover
            anchorParent.addEventListener('mouseenter', () => {
                // Arrow movement
                if (arrowTween) arrowTween.kill();
                arrowTween = gsap.to(arrowImg, {
                    x: 8,
                    duration: 0.3,
                    ease: "power2.out"
                });

                // Image zoom
                if (zoomTween) zoomTween.kill();
                zoomTween = gsap.to(teaserImg, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            // On leave
            anchorParent.addEventListener('mouseleave', () => {
                // Reset arrow
                if (arrowTween) arrowTween.kill();
                arrowTween = gsap.to(arrowImg, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });

                // Reset image
                if (zoomTween) zoomTween.kill();
                zoomTween = gsap.to(teaserImg, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            });
        }
    });
});

// navbar scroll and header ticket animation
document.addEventListener('navbarLoaded', () => {
  const showAnim = gsap.from('.navbar', {
  yPercent: -100,
  paused: true,
  duration: 0.5,
  ease: "power4.inOut"
}).progress(1);

// navbar scroll animation
ScrollTrigger.create({
  start: "top top",
  end: "max",
  markers: false,
  onUpdate: (self) => {

    const navbar = document.querySelector('.navbar');

    // // 1️⃣ At top of page
    if (self.scroll() === 0) {
      showAnim.play();
      navbar.style.position = 'relative';
      gsap.to('.header-ticket', {
        opacity: 0,
        duration: 0.25,
        ease: "power1.out"
      });
      return; // stop here so no other state runs
    }

    // 2️⃣ Scrolling up (not at top)
    if (self.direction === -1) {
      showAnim.play();
      navbar.style.position = 'fixed';
      gsap.to('.header-ticket', {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out"
      });
    }

    // 3️⃣ Scrolling down
    else {
      showAnim.reverse();
      navbar.style.position = 'fixed';
      gsap.to('.header-ticket', {
        opacity: 1,
        duration: 0.25,
        ease: "power1.out"
      });
    }
  }
});
})

// Glimpses Slideshow
document.addEventListener('DOMContentLoaded', () => {
  const slideshowContainer = document.querySelector('.slideshow');
  const mainImg = slideshowContainer?.querySelector('img');

  if (!slideshowContainer || !mainImg) return;

  const images = [
        './images/slides/7U6A0077.webp',
        './images/slides/_UB_8970.webp',
        './images/slides/_UB_9176.webp',
        './images/slides/7U6A0061.webp',
        './images/slides/FB1A6624.webp',
        './images/slides/FB1A6627.webp'
    ];

  const slideDuration = 1.2; // sec
  const displayTime = 3;     // sec

  // Create wrapper
  const slideWrapper = document.createElement('div');
  slideWrapper.classList.add('slide-wrapper');
  slideshowContainer.appendChild(slideWrapper);

  // Append all images
  slideWrapper.appendChild(mainImg);
  for (let i = 1; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    slideWrapper.appendChild(img);
  }

  // Base setup
  gsap.set(slideWrapper, { display: 'flex', x: 0 });
  gsap.set(slideWrapper.querySelectorAll('img'), {
    flexShrink: 0,
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  });

  let currentIndex = 0;
  let direction = 1; // 1 = forward, -1 = backward
  let slideWidth = slideshowContainer.offsetWidth;

  window.addEventListener('resize', () => {
    slideWidth = slideshowContainer.offsetWidth;
    gsap.set(slideWrapper, { x: -currentIndex * slideWidth });
  });

  function slideNext() {
    // Update index
    currentIndex += direction;

    // Reverse direction at ends
    if (currentIndex >= images.length - 1) {
      direction = -1; // start going backward
    } else if (currentIndex <= 0) {
      direction = 1; // start going forward
    }

    // Animate slide
    gsap.to(slideWrapper, {
      x: -currentIndex * slideWidth,
      duration: slideDuration,
      ease: "power4.out",
      onComplete: () => {
        // Snap exactly into position to avoid drift
        gsap.set(slideWrapper, { x: -currentIndex * slideWidth });
      }
    });
  }

  // Loop slideshow
  setInterval(slideNext, (displayTime + slideDuration) * 1000);
});

// m-image-teaser animation
document.addEventListener("DOMContentLoaded", () => {
    const teasers = document.querySelectorAll(".m-image-teaser");

    teasers.forEach(teaser => {
        const img = teaser.querySelector(".a-image img");
        const button = teaser.querySelector(".primary-btn");

        teaser.addEventListener("mouseenter", () => {
            // Zoom image
            gsap.to(img, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Darken button color
            gsap.to(button, {
                backgroundColor: "#B93E2D",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        teaser.addEventListener("mouseleave", () => {
            // Reset image
            gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Reset button color
            gsap.to(button, {
                backgroundColor: "#E74E38",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

// .m-quick-link animation
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollToPlugin);

  document.querySelectorAll('.m-quick-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href'); // like "#join"
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetEl,
            offsetY: 80 // adjust for sticky header
          },
          ease: "power2.out"
        });
      }
    });
  });
} )

// Header Ticket Arrow rotation
// Primary button arrow animation
document.addEventListener('navbarLoaded', () => {
  const primaryBtn = document.querySelector('.header-ticket-btn')
  const primaryBtnSpan = document.querySelector('.primary-btn-span')

  primaryBtn.addEventListener("mouseenter", () => {
    console.log('mouse enter')
    primaryBtnSpan.classList.add("rotate90");
  });

  primaryBtn.addEventListener("mouseleave", () => {
    console.log('mouse leave')
    primaryBtnSpan.classList.remove("rotate90");
  });
})