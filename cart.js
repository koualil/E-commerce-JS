import Loading from './loading.js';

const cart = document.querySelector(".cart");
const btnModale = document.querySelector(".divCart");

 
var  Cart = JSON.parse(localStorage.getItem("cart"));
// get products
class Products{
    async getProducts(){
        try{//
             const result =await fetch("http://localhost:5500/products.json")
             const data = await result.json(); 
             let products = data.items.map(data=>{
                                    const {title,Company,price} =data.fields;
                                    const id = data.sys.id
                                    const image = data.fields.image.fields.file.url;
                                 return {title , price , id , image,Company}
                            })                             
             return products ;
        }
        catch(error){
            console.log(error +"l'erreur");
        }
    }
 
}
 // display products
 class Ui{
         displayCart( products ){
        products.forEach(element => {
            const newDiV = document.createElement("div");
            newDiV.classList.add('cart-item') ;
            const newDiv1 =
            `
                <a href=" /product/product.html?id=${element.id}"><img class="imgHover" src="/${element.image}" alt=""></a>
               
                <div class="flexResponsive">
                <button class="banner-btn1" data-id=${element.id} >add cart<i class="fas fa-cart-arrow-down"></i>
                </button> 
                <div>
                    <h1 >${element.title}</h1>
                    <p>$${element.price}</p>
                 </div>
                </div>
                
         
                `
            
                cart.appendChild(newDiV)
            newDiV.innerHTML=newDiv1;
            
        });
        this.displayErrorResult(products);
        }
         getBagButton(element){
        const btnBanner = document.querySelectorAll(element);
        
        let btnArray ;
        // verifie if cart is shoping 
        if(Cart)
        btnArray = Cart.map(item=>(item.id));
         btnBanner.forEach(item=>{ 
             if(btnArray &&  btnArray.find(a=>a === item.getAttribute("data-id"))) {
              //   item.style.opacity=0.8;
              item.innerText = "in the cart";
             } 
              item.addEventListener("click", (e)=>{  
                if(Cart)
                Cart = LocalStorage.getAllCart(); 
                  let id = e.target.getAttribute("data-id");
                   
                 if(id && LocalStorage.getProduct(id) && e.target.innerText === 'ADD CART'){

                     var Ourproducts = {...LocalStorage.getProduct(id) , amount:1}; 
                     console.log(Ourproducts);
                     // save Cart in local storage        
                     if(Ourproducts){ 
                        if(Cart === null || Cart.findIndex(item=>item.id === Ourproducts.id) === -1){
                            this.displayShopingCart([Ourproducts]); 
                            if(Cart === null) Cart = [Ourproducts];
                            Cart = [...Cart , Ourproducts];
                            e.target.innerText = "in the cart";
                            LocalStorage.saveCart(Cart);
                            this.displayCartTotal();
                        }
                        
                    }
                    this.setCartVAlues();
                 }
                this.showCarts();
                })
                
            })
         
        }
        setupApp(Cart , e){
            Cart &&
               Cart.forEach(item=>{
                this.displayShopingCart([item]);
            })
            this.displayCartTotal()
            this.removeCart(e);
            this.setCartVAlues();
     
        }
        showCarts(){    
           document.querySelector(".modale-container").classList.add("show");
        }
         displayCartTotal() {
            Cart = LocalStorage.getAllCart();
            let price=document.querySelector(".totalPrice"); 
            let total
            if(Cart){
                total = Cart.reduce((total, cartItem) => {
                 return (total += cartItem.price * cartItem.amount);
               }, 0);
               price.innerText=total.toFixed(2);
               this.totalShoping()

            }
        }
        setCartVAlues(){
            const  UP=[...document.querySelectorAll(".fa-angle-up")]; 
            const  down=[...document.querySelectorAll(".fa-angle-down")];
            // let price=document.querySelector(".totalPrice"); 
            // let prix ; 
            // prix = Number(price.innerText); 
            // if(d){
            //  price.innerText=(prix - cart.price*cart.amount).toFixed(2);
            // }
            // else {
            //     price.innerText =(prix + cart.price*cart.amount).toFixed(2);
             
            UP.forEach((item)=>{
                item.addEventListener("click",(e)=>{
                  console.log('click'); 
                    let otherCart , index;
                    let id = item.getAttribute("data-id");
                     
                                     otherCart = LocalStorage.getCart(id);
                                     index = LocalStorage.getCartIndex(id);
                                     otherCart.amount++;
                                     Cart[index] = otherCart ;
                                    localStorage.setItem("cart", JSON.stringify(Cart))
                                    item.parentNode.querySelector(".count").innerText =otherCart.amount;
                                    this.displayCartTotal();

                                     
                })
            })              
            down.forEach((item)=>{
                item.addEventListener("click",()=>{
                   
                    let otherCart , index;
                    let id = item.getAttribute("data-id");
                                     otherCart = LocalStorage.getCart(id);
                                     index = LocalStorage.getCartIndex(id) ;
                                     if(otherCart.amount >1){
                                     otherCart.amount--;
                                     Cart[index] = otherCart ;
                                    localStorage.setItem("cart", JSON.stringify(Cart))
                                    item.parentNode.querySelector(".count").innerText =otherCart.amount;
                                    this.displayCartTotal();

                                     }
                                     
                })
            })
        
 
        }
        displayShopingCart(products ){
            let text = "";
            if(products)
            products.forEach(item=>{
                text = `
                <div class=modaleContainer >
                <img src=/${item.image} alt="" />
                <div>

                    <h3>${item.title}</h3>
                        <h4 class=price style="margin-top: .5rem">${item.price}$</h4>
                         <button class='remove' data-id=${item.id} >remove</button>
                         </div>
                    <div style="display:grid">                      
                        <i class='fa-solid fa-angle-up' data-id=${item.id} ></i>
                        <p class=count>${item.amount}</p>
                        <i class="fa-solid fa-angle-down" data-id=${item.id}></i>
                        
                        </div>
                        </div>
                        ` ; 
                        btnModale.innerHTML += text ;
                    })
                }
        totalShoping(){
            let btnArray ;
            Cart = LocalStorage.getAllCart();
            if(Cart.length!=-1){
              btnArray = Cart.map(item=>(item.amount));
           let t=0;
           for(var i=0;i<btnArray.length;i++) t+=btnArray[i]; 
           this.increment(t);
            }
        }
        increment(a){
            document.querySelector(".cercle").innerText =  a;
        }
        filterCompany(){
            const btnCompany = document.querySelectorAll(".sidBare p");
            btnCompany.forEach(item=>{
            var  Cart = JSON.parse(localStorage.getItem("products"));
            
            let product=[];
                item.addEventListener("click",()=>{
                    if(item.innerText === 'All'){
                         product = Cart;
                    }
                    else{
                        product=Cart.filter(a=>a.Company ===item.innerText );
                    }  
                    const parent = document.querySelector(".cart"); 
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                    this.displayCart(product);
                    this.getBagButton('.banner-btn1');

                })
        })
        }
        filterInput(){
            const btnSearch= document.querySelector(".search");
            var  Cart = JSON.parse(localStorage.getItem("products"));
            
            let product=[];
            btnSearch.addEventListener("keyup",(e)=>{
                const parent = cart; 
                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                } 
                    product = Cart.filter(item=>item.title.indexOf(e.target.value.trim())>-1);
                    this.displayCart(product);
                    this.getBagButton('.banner-btn1');
            

                });
        
        }
        displayErrorResult(product){
            cart.style.display = "grid";
            if(product.length === 0) {
                const text = document.createElement("p"); 
                text.innerText="no result seaech !";
                 cart.style.display = "block";
                 text.style=`font-size: 2rem ;
                            color: red; `;
                cart.appendChild(text);
             } 
        }
    
        displaySearch(product){
            const btnProduct = document.querySelector(".cartProduct");
                btnProduct.innerHTML=`
                        <div>
                        <img src="/${product.image}" />
                        </div>
                        <div style="
                        margin-left: 3rem;">
                        <h1>${product.title}</h1>
                        <h3>${product.Company}</h3>
                        <h4 class=''>$ ${product.price}</h4>
                        <button class="btnBuy banner-btn12" data-id=${product.id}>add cart</button>
                        <p>description</p>
                        </div>`;
        }
         
        removeCart(ele){
         const divCart = document.querySelector('.divCart'); 
         let c;   
        
            divCart.addEventListener("click",(e)=>{ 
                const element = e.target;
                if (element.classList.contains('remove')) {

                    let id;
                    id=e.target.getAttribute('data-id');
                    c = JSON.parse(localStorage.getItem("cart"));
                    if(c.length!=0){
                        element.parentElement.parentElement.remove();
                    // this.setCartVAlues(...c.filter(a=>a.id === id),true)
                    LocalStorage.saveCart(c.filter(a=>a.id !== id))
                    this.displayCartTotal();
                    document.querySelectorAll(ele).forEach(item=>{
                         if(item.getAttribute('data-id') === id)
                            item.innerText='add cart';
                    })      
                         
                }
            }
            }); 
              
        }

 }

 // locale storage
 class LocalStorage{
    static saveProducts(products){
        localStorage.setItem("products" ,JSON.stringify(products))
    }
    static getProduct(id){
        const product =  localStorage.getItem("products");
        return JSON.parse(product).find(item=>item.id === id)
        
    }
    static getCart(id){
        let tab =  JSON.parse(localStorage.getItem("cart"));
        return tab.find(item=>item.id === id)

    }
    static getAllCart(){
        return JSON.parse(localStorage.getItem("cart"));

    }
    static getCartIndex(id){
        const product =  JSON.parse(localStorage.getItem("cart"));
        if(product)
        return product.findIndex(item=>item.id === id)
        else return -1

    }
    static saveCart(cart){
        localStorage.setItem("cart" , JSON.stringify(cart));
    }

 }

       
 
export   {Products , Ui , LocalStorage , Cart}

 