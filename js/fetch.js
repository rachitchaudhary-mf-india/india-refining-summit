// Insert Advisory Board members on page
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".wrap-container");

  // Check that container exists before doing anything
  if (!container) {
    console.warn(".wrap-container not found — Advisory Board section may not be loaded yet.");
    return;
  }

  // Fetch advisory board data
  fetch("./data/advisory-board.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load advisory-board.json");
      return response.json();
    })
    .then(data => {
      // Make sure data is valid
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p style="color:red;">No advisory board data available.</p>`;
        return;
      }

      // Clear existing content
      container.innerHTML = "";

      // Inject each member
      data.forEach(member => {
        const memberHTML = `
          <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
            <div class="person">
              <div class="person-photo">
                <img src="${member.image}" alt="${member.name}">
              </div>
              <div class="person-details">
                <h3>${member.name}</h3>
                <h5>${member.designation1}</h5>
                <h5>${member.designation2}</h5>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", memberHTML);
      });
    })
    .catch(error => {
      console.error("Error fetching advisory board:", error);
      // Only try to set innerHTML if container actually exists
      if (container) {
        container.innerHTML = `<p style="color:red;">Failed to load advisory board data.</p>`;
      }
    });
});




// Insert Advisory Board members in carousel
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".advisory-carousel-track");
  const container = document.querySelector(".advisory-carousel");

  if (!track || !container) return;

  fetch("./data/advisory-board.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(member => {
        const div = document.createElement("div");
        div.className = "advisory-board";
        div.innerHTML = `
          <div class="person">
            <div class="person-photo">
              <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="person-details">
              <h3>${member.name}</h3>
              <h5>${member.designation1}</h5>
              <h5>${member.designation2}</h5>
            </div>
          </div>
        `;
        track.appendChild(div);
      });

      gsap.set(track, { display: "flex", gap: "24px" });

      let direction = 1; // 1 = right, -1 = left
      const slideDuration = 1.2;
      const displayTime = 4;

      function getSlideDistance() {
        const itemWidth = track.querySelector(".advisory-board").offsetWidth + 24;
        const visibleItems = Math.floor(container.offsetWidth / itemWidth);
        return itemWidth * (visibleItems > 0 ? visibleItems : 1);
      }

      function slideNext() {
        const totalWidth = track.scrollWidth;
        const maxDistance = totalWidth - container.offsetWidth;
        const slideDistance = getSlideDistance();

        let currentX = gsap.getProperty(track, "x");
        let newX = currentX - direction * slideDistance;

        // When reaching either end, reverse direction
        if (Math.abs(newX) >= maxDistance || newX > 0) {
          direction *= -1;
          newX = gsap.utils.clamp(-maxDistance, 0, newX);
        }

        gsap.to(track, {
          x: newX,
          duration: slideDuration,
          ease: "power3.inOut"
        });
      }

      window.addEventListener("resize", () => gsap.set(track, { x: 0 }));
      setInterval(slideNext, (displayTime + slideDuration) * 1000);
    })
    .catch(err => console.error("Error loading advisory data:", err));
});


