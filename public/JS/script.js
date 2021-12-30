

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const completeNav = document.querySelector(".complete-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  completeNav.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  completeNav.classList.remove("active");
}))


function toggleButton(){
    var action = document.querySelector('.action');
    action.classList.toggle('active');
}
