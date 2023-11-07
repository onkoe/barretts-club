// on mobile, hide the headerbar expansion with js...
//
// this means that folks w/o js will always see the nav list, but that's fine!
// at least they can do stuff lol

var nav_container = document.querySelector(".mobile-nav-container");
nav_container.style.display = "none";

var checkbox = document.getElementById("menu-button-checkbox");

checkbox.addEventListener("change", function () {
    if (this.checked) {
        nav_container.style.display = "flex";
    } else {
        nav_container.style.display = "none";
    }
});
