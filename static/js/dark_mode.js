function toggle_dark_mode(on) {
    if (document.documentElement.classList.contains("dark-mode")) {
        document.documentElement.classList.toggle("dark-mode", false);
        document.documentElement.classList.toggle("light-mode", true);
    } else {
        document.documentElement.classList.toggle("dark-mode", true);
        document.documentElement.classList.toggle("light-mode", false);
    }
}
