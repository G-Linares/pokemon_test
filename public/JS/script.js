

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))

function toggleButton(){
    var action = document.querySelector('.action');
    action.classList.toggle('active');
}

function toggleNavMenu(){
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

}