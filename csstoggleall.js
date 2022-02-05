var cssactive = true;
var csstag = document.getElementById("csstag");
function ToggleAllCSS() {
    if (cssactive) {
        document.head.removeChild(csstag);
    } else {
        document.head.appendChild(csstag);
        if (document.documentElement.classList.length) {
            document.documentElement.className = "";
            var cells = document.getElementsByClassName("toggle");
            for (let element of cells) {
                element.setAttribute("toggle_status", "true");
            }
        }
    }
    cssactive = !cssactive;
}
