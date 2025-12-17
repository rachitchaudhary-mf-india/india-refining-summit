// Inject footer
fetch('./includes/footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('footerDetails').innerHTML = html;
    document.dispatchEvent(new Event("footerLoaded"));
  })
  .catch(error => {
    console.error('Error loading footer:', error);
    alert('Error loading footer:', error);
  });

// Show loader before starting fetch
document.getElementById('navbarDetails').innerHTML = `
  <div id="navbarLoader" class="navbar-loader">
    <div class="spinner"></div>
  </div>
`;

// Inject navbar
fetch('./includes/navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('navbarDetails').innerHTML = html;
    document.dispatchEvent(new Event("navbarLoaded"));
  })
  .catch(error => {
    console.error('Error loading navbar:', error);
    document.getElementById('navbarDetails').innerHTML = `
      <div class="navbar-error">⚠️ Failed to load navigation.</div>
    `;
  });


// Inject event banner
fetch('./includes/event-banner.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('eventBanner').innerHTML = html;
    document.dispatchEvent(new Event("eventBannerLoaded"));
  })
  .catch(error => {
    console.error('Error loading event banner:', error);
    document.getElementById('eventBanner').innerHTML = `
      <div class="navbar-error">⚠️ Failed to load banner.</div>
    `;
  });