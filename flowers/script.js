onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};
function redirectToHome() {
  window.location.href = "../books/3D Flip Hover effects/index.html";
}
