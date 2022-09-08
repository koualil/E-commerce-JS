const toggle = document.querySelector(".toggle-nav");
const sidebar = document.querySelector(".sidebar-overlay"); 
const close = document.querySelector(".sidebar-close");
const sidebarContainer = document.querySelector(".sidebar");

toggle.addEventListener("click",()=>{
    sidebar.classList.add("shoW")
    sidebarContainer.classList.add("shoW")
    
})
close.addEventListener("click",()=>{
    sidebar.classList.remove("shoW");
    sidebarContainer.classList.remove("shoW");
})