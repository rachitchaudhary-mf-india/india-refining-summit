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