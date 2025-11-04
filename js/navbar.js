document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("sidebarMenu");
  const overlay = document.getElementById("overlay");

  if (e.target.closest(".open-sidebar")) {
    sidebar?.classList.add("active");
    overlay?.classList.add("active");
  }

  if (e.target.closest("#closeSidebar") || e.target.closest("#overlay")) {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
  }
});

// Open sidebar menu panel
document.addEventListener("click", () => {
  const menuItems = document.querySelectorAll(".has-submenu");

  menuItems.forEach(item => {
    const trigger = item.querySelector(".menu-item");

    trigger.addEventListener("click", (e) => {

      e.stopPropagation();

      const isOpen = item.classList.contains("active");

      // Close all other submenus first
      menuItems.forEach(other => {
        other.classList.remove("active");
        other.querySelector(".menu-item").classList.remove("active");
      });

      // Toggle the clicked one
      if (!isOpen) {
        item.classList.add("active");
        trigger.classList.add("active");
      }
    });
  });

  // Handle back buttons
  const backButtons = document.querySelectorAll(".back-btn");
  backButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
  
      e.stopPropagation(); // prevent triggering parent click
      const submenu = btn.closest(".has-submenu");
      if (submenu) {
        submenu.classList.remove("active");
        submenu.querySelector(".menu-item").classList.remove("active");
      }
    });
  });
});

