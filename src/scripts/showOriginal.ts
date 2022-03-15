'use strict';
(function () {
    const div = document.getElementById("show-original");
    if (!div)
        return;
    if (div.parentElement)
        div.parentElement.style.position = "relative";
    div.insertAdjacentHTML("afterbegin", `
    <button id="show-original-minimize" aria-label="Minimize 'View original page' window." title="Minimize">
        <div id="show-original-minus"></div>
    </button>
    `);
    const minimize = document.getElementById("show-original-minimize")!;
    minimize.addEventListener("click", () => {
        div.classList.toggle("minimized");
        localStorage.setItem("show-original-minimized", String(div.classList.contains("minimized")));
    });
    if(localStorage.getItem("show-original-minimized") === "true")
        div.classList.add("minimized");
})();
