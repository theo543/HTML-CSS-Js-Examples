'use strict';
(function () {
    const link = document.querySelector("head link[rel='stylesheet']");
    const button = document.getElementById("CSSToggle")
    if (!button)
        return;
    button.addEventListener("click", () => {
        if (!link) {
            console.log("Failed to find CSS tag!");
            return;
        }
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        } else {
            document.head.appendChild(link);
        }
    });
})();
