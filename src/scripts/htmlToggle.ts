'use strict';
(function () {
    let resetInProgress: boolean = false;
    document.body.insertAdjacentHTML("afterbegin", '<button id="reset-button" class="hide-reset-button" hidden>Click here to restore all elements!</button>\n')
    const resetElem = document.getElementById("reset-button")!;
    function handleHighlightEnd(e: Element) {
        if(!e.classList.contains("highlighted"))
            return;
        if(e instanceof HTMLElement) {
            e.style.transition = getComputedStyle(e).transition;
            e.addEventListener("transitionend", function f(){
                e.style.transition = "";
                e.removeEventListener("transitionend", f);
            });
        }
    }
    setTimeout(() => resetElem.hidden = false, 750);
    resetElem.addEventListener("click", (function () {
        resetInProgress = true;
        document.querySelectorAll("input[data-form='none']").forEach(e => (e as HTMLInputElement).click());
        document.querySelectorAll(".hide, .highlighted").forEach(e => {
            e.classList.remove("hide");
            handleHighlightEnd(e);
            e.classList.remove("highlighted");
        });
        resetInProgress = false;
    }));

    let altered = 0;
    const cells = document.querySelectorAll("#html-table tr td:nth-child(2):not(.ignore)");

    interface HTMLFormElementWithRadioData extends HTMLFormElement {
        prevWasNone: boolean,
        none: HTMLInputElement,
        hide: HTMLInputElement,
        highlight: HTMLInputElement,
        selector: string
    }

    function updateClasses(event: Event) {
        const form = event.currentTarget as HTMLFormElementWithRadioData;
        if (!resetInProgress) { // skip this if resetElem will handle it
            document.querySelectorAll(form.selector).forEach((tag) => {
                tag.classList.toggle("hide", form.hide.checked);
                if(!form.highlight.checked)
                    handleHighlightEnd(tag);
                tag.classList.toggle("highlighted", form.highlight.checked);
            });
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

    cells.forEach(cell => {
        if (!(cell.previousElementSibling instanceof HTMLTableCellElement))
            return;
        cell.insertAdjacentHTML("beforeend", `
        <form data-radio-container>
        <label><input type="radio" name="r" data-form='none'">Display</label>
        <label><input type="radio" name="r" data-form='highlight'>Highlight</label>
        <label><input type="radio" name="r" data-form='hide'>Hide</label> </form>
        `);
        const form = cell.querySelector("form[data-radio-container]") as HTMLFormElementWithRadioData;
        form.prevWasNone = true;
        form.none = form.querySelector("[data-form='none']")!
        form.hide = form.querySelector("[data-form='hide']")!;
        form.highlight = form.querySelector("[data-form='highlight']")!;
        form.selector = cell.previousElementSibling.innerText.toLowerCase().trim().split(/[\n ,]/).join(",");
        form.none.click();
        form.addEventListener("change", updateClasses);
    });
})();
