import { Products ,Ui,LocalStorage,Cart } from "./cart.js";


const products = new Products();
const ui = new Ui();
 

let prd = products.getProducts();  
prd.then( data=>{
    ui.displayCart(data.filter((i,index)=>(index<3)))
    LocalStorage.saveProducts(data)
})

.then(()=>{
     ui.getBagButton('.banner-btn1')
     ui.setupApp(LocalStorage.getAllCart(),'.banner-btn1');
    }) 
 
 
 