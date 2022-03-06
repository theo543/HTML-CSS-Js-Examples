'use strict';
(function() {
    document.body.insertAdjacentHTML("afterbegin", '<button id="reset-button" class="hide-reset-button" hidden>Click here to restore all elements!</button>\n')
    const resetElem = document.getElementById("reset-button");
    setTimeout(() => resetElem.hidden = false, 750);
    resetElem.addEventListener("click", (function () {
        document.querySelectorAll("input[data-form='none']").forEach(e => e.click());
    }));

    let altered = 0;
    const cells = document.querySelectorAll("#toggle-table tr td:nth-child(2):not(.ignore)");

    function updateClasses(event) {
        const form = event.currentTarget
        for (const tag of document.querySelectorAll(form.selector)) {
            tag.classList.toggle("hide", form.hide.checked);
            tag.classList.toggle("highlighted", form.highlight.checked);
        }
        if (form.prevWasNone !== form.none.checked) {
            altered += form.none.checked ? -1 : 1;
            form.prevWasNone = form.none.checked;
        }
        resetElem.classList.toggle("hide-reset-button", altered === 0);
        if (form.selector.match(/(^| )body|html($| )/) && form.hide.checked)
            setTimeout(() => {
                resetElem.click();
            }, 1000);
    }

    for (const cell of cells) {
        const div = cell.appendChild(document.createElement("div"));
        div.innerHTML =
       `<form>
        <label><input type="radio" name="r" data-form='none'">None</label>
        <label><input type="radio" name="r" data-form='highlight'>Highlight</label>
        <label><input type="radio" name="r" data-form='hide'>Hide</label>
        </form>`;
        const form = div.querySelector("form");
        form.prevWasNone = true;
        form.none = div.querySelector("[data-form='none']")
        form.hide = div.querySelector("[data-form='hide']");
        form.highlight = div.querySelector("[data-form='highlight']");
        form.selector = cell.previousElementSibling.innerText.toLowerCase().trim().split(/[\n ,]/).join(",");
        form.addEventListener("change", updateClasses);
        form.hide.checked = false;
        form.highlight.checked = false;
        form.none.click()
    }
})();
