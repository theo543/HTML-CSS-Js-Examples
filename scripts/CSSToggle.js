var link = document.getElementById("cssTag");
var linkState = true;
function toggleAll(){
    if(linkState){
        link.parentNode.removeChild(link);
    }else{
        document.head.appendChild(link);
    }
    linkState = !linkState;
}
