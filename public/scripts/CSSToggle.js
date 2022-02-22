const link = document.getElementById("css-tag");
function toggleAll(){
    if(document.contains(link)){
        link.parentNode.removeChild(link);
    }else{
        document.head.appendChild(link);
    }
}
