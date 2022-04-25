function clickHandler(event) {
    element = event.target;
    if (element.getAttribute("toggle_status") === "true") {
        element.setAttribute("toggle_status", "false");
        document.documentElement.classList.add(element.getAttribute("data-disabler"));
    } else {
        element.setAttribute("toggle_status", "true")
        document.documentElement.classList.remove(element.getAttribute("data-disabler"));
    }
}
cells = document.getElementsByClassName("toggle");
for (let element of cells) {
    element.onclick = clickHandler;
    element.setAttribute("toggle_status", "true")
}

