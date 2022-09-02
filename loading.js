const Loading=(display)=>{
    if(display)
         document.querySelector(".page-loading").style.display="none";
    else
         document.querySelector(".page-loading").style.display="block";

}
export default Loading;