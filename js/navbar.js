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
