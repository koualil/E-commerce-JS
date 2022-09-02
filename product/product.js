import {Ui ,Products , LocalStorage , Cart } from "../cart.js" ;
import Loading from "../loading.js";
const products = new Products();
const ui = new Ui();
 
const searchId=window.location.search;
 
let id= searchId.substring(searchId.indexOf('=')+1,searchId.length)
const product = LocalStorage.getProduct(id);
// displaySearch by id
ui.displaySearch(product);
ui.getBagButton('.btnBuy');
ui.setupApp(LocalStorage.getAllCart(),'.banner-btn12');
 

document.querySelector(".textProduct").innerText = `home / ${product.title}`;