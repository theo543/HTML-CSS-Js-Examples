function restoreall() {
    elements = document.querySelectorAll(".hide, .highlighted");
    for (let elem of elements) {
        elem.classList.remove("hide");
        elem.classList.remove("highlighted");
    }
    elements = document.getElementsByTagName("input");
    for (let elem of elements) {
        elem.checked = false;
    }
    altered = 0;
    update_resetter();
}
var resetelem = document.getElementById("resetter");
resetelem.addEventListener("click", restoreall);
function update_resetter() {
    if (altered) {
        resetelem.classList.remove("hide");
    } else {
        resetelem.classList.add("hide");
    }
}
function highlightTag(event) {
    element = event.target;
    tags = element.parentNode.previousElementSibling.textContent.toLowerCase().replace(/\s/g, "").replace(/\n/g, "").split(",");
    alltags = document.getElementsByTagName("*");
    if (element.checked) {
        for (let tag of alltags) {
            if (tags.includes(tag.tagName.toLowerCase())) {
                tag.classList.add("highlighted");
            }
        }
        altered++;
    } else {
        for (let tag of alltags) {
            if (tags.includes(tag.tagName.toLowerCase())) {
                tag.classList.remove("highlighted");
            }
        }
        altered--;
    }
    update_resetter();
}
function hideTag(event) {
    element = event.target;
    tags = element.parentNode.previousElementSibling.textContent.toLowerCase().replace(/\s/g, "").replace(/\n/g, "").split(",");
    alltags = document.getElementsByTagName("*");
    if (element.checked) {
        for (let tag of alltags) {
            if (tags.includes(tag.tagName.toLowerCase())) {
                tag.classList.add("hide");
            }
        }
        altered++;
    } else {
        for (let tag of alltags) {
            if (tags.includes(tag.tagName.toLowerCase())) {
                tag.classList.remove("hide");
            }
        }
        altered--;
    }
    update_resetter();
}
var altered = 0;
cells = document.querySelectorAll("table.togglegoeshere tr td:nth-child(2)");
for (let cell of cells) {
    cell.appendChild(document.createElement("br"));
    check_e = document.createElement("input");
    check_e.setAttribute("type", "checkbox");
    cell.appendChild(check_e);
    text_e = document.createElement("span");
    text_e.textContent = "Highlight Tags";
    text_e.className = "removeborder";
    cell.appendChild(text_e);
    check_e.addEventListener("change", highlightTag);
    if (!(cell.classList.contains("nochkbox"))) {
        cell.appendChild(document.createElement("br"));
        check_e = document.createElement("input");
        check_e.setAttribute("type", "checkbox");
        cell.appendChild(check_e);
        text_e = document.createElement("span");
        text_e.textContent = "Hide Tags";
        text_e.className = "removeborder";
        cell.appendChild(text_e);
        check_e.addEventListener("change", hideTag);
    }
}