const link = document.querySelector("head link[rel='stylesheet']");
function toggleAll(){
    if(!link){
        console.log("Failed to find CSS tag!");
        return;
    }
    if(document.contains(link)){
        link.parentNode.removeChild(link);
    }else{
        document.head.appendChild(link);
    }
}
