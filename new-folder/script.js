/* ---------- ENTER PROJECT ---------- */
function enterSite(){
  document.getElementById("welcome").style.display = "none";
  document.getElementById("main").style.display = "block";
}

/* ---------- AUTO-SKIP WELCOME IF FROM BACK BUTTON ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("home") === "true") {
    enterSite();
  }
});

/* ---------- NAV ACTIVE SCROLL ---------- */
window.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      const top = window.scrollY;
      if (top >= sec.offsetTop - 200) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(a => {
      a.classList.remove("active");
      if (a.getAttribute("href") && a.getAttribute("href").includes(current)) {
        a.classList.add("active");
      }
    });
  });

});
