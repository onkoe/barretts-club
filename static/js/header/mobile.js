// on mobile, hide the headerbar expansion with js...
//
// this means that folks w/o js will always see the nav list, but that's fine!
// at least they can do stuff lol

var nav_container = document.querySelector(".mobile-nav-container");
nav_container.classList.add("collapsed", "no-transition");

setTimeout(() => {
    nav_container.classList.remove("no-transition");
}, 10);

var checkbox = document.getElementById("menu-button-checkbox");

checkbox.addEventListener("change", function () {
    if (this.checked) {
        nav_container.classList.remove("collapsed");
    } else {
        nav_container.classList.add("collapsed");
    }
});
