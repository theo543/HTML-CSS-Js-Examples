'use strict';
(function (){
    document.querySelectorAll(".mdn-link-target-container[data-mdn-link-selector]").forEach((table) => {
        table.querySelectorAll(table.getAttribute("data-mdn-link-selector")!).forEach((cell) => {
            cell.childNodes.forEach((node) => {
                if(node.nodeType === Node.TEXT_NODE) {
                    const newElement = document.createElement("span");
                    if(!node.textContent)
                        return;
                    newElement.innerHTML = node.textContent.replace(/[a-z][a-z0-9]*/, (tagName) => {
                        const docURL = `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${tagName}`;
                        return `<a href="${docURL}">${tagName}</a>`;
                    });
                    node.replaceWith(newElement);
                }
            });
        });
    });
})();
