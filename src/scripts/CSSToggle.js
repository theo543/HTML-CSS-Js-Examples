'use strict';
(function() {
    const link = document.querySelector("head link[rel='stylesheet']");
    document.getElementById("CSSToggle").addEventListener("click", () => {
        if (!link) {
            console.log("Failed to find CSS tag!");
            return;
        }
        if (document.contains(link)) {
            link.parentNode.removeChild(link);
        } else {
            document.head.appendChild(link);
        }
    });
})();
