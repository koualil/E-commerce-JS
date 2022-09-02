const btn = document.querySelector(".btnShop");
const modale = document.querySelector(".modale-container");
const ferme = document.querySelector(".ferme");

btn.addEventListener("click",()=>{
 modale.classList.add("show")
 
     
})
ferme.addEventListener("click",()=>{
    modale.classList.remove("show")
 
})
window.addEventListener("click",(e)=>{
    if(e.target === modale ){
    modale.classList.remove("show")
  
    }
})
 