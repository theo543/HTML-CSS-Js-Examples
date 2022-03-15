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
    const button = document.createElement("button");
    button.innerHTML = "Load";
    document.body.insertAdjacentHTML("beforeend", `
        <div id="show-original-wrapper" class="display-none">
            <div id="show-original-modal"></div>
        </div>`);
    const wrapper = document.getElementById("show-original-wrapper")!;
    let iframe: HTMLIFrameElement | null = null;
    function removeIframe() {
        if(iframe)
            iframe.remove();
        iframe = null;
        wrapper.classList.add("display-none");
    }
    const keyListener = (e: KeyboardEvent) => {
        if(iframe && (e.key === "Escape")) {
            removeIframe();
        }
    };
    document.addEventListener("focus", e => {
        if(iframe){
            if(e.target !== iframe){
                iframe.focus();
            }
        }
    }, true);
    document.addEventListener("click", e => {
        if(iframe && e.target instanceof Element) {
            if(!iframe.contains(e.target)) {
                removeIframe();
            }
        }
    }, true);
    document.addEventListener("keydown", keyListener, true);
    button.addEventListener("click", () => {
        if(!iframe) {
            wrapper.classList.remove("display-none");
            iframe = document.createElement("iframe");
            iframe.addEventListener("load", () => iframe!.contentWindow!.document.addEventListener("keydown", keyListener, true));
            iframe.id = "show-original-iframe";
            iframe.src = div.getAttribute("data-iframe-target") ?? "";
            iframe.title = "Original version of the website. Press ESC to exit.";
            wrapper.append(iframe);
        }
    });
    div.getElementsByTagName("a")[0].replaceWith(button);
})();
