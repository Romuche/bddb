// Build interface on page load
buildButtons(window.location.href);

// Build interface on navigation
window.navigation.addEventListener("navigate", (e) => navigate(e));

// Handle button clicks
document.addEventListener("click", (e) => click(e));
