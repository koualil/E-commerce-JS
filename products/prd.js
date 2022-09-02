import {Ui ,Products , LocalStorage,Cart } from "../cart.js" ;
import Loading from "../loading.js";
const products = new Products();
const ui = new Ui();
let prd = products.getProducts();
const btnPrice = document.querySelector(".priceInput");
 
prd.then(data=>{  
   Loading(true);
   ui.displayCart(data.filter(data=>data.price <= 50));
   ui.getBagButton('.banner-btn1');
   document.querySelector(".price-filter").addEventListener("input",(e)=>{
      const parent = document.querySelector(".cart"); 
      while (parent.firstChild) {
         parent.removeChild(parent.firstChild);
      }
      ui.displayCart(data.filter(data=>data.price <= e.target.value));
      
      ui.getBagButton('.banner-btn1');
   })
   
     ui.setupApp(LocalStorage.getAllCart(),'.banner-btn1');
     LocalStorage.saveProducts(data);
})

ui.filterCompany();
ui.filterInput();
 
