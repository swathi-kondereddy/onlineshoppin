// const container = document.getElementById("container");
const productscontainer = document.getElementById("productscontainer");
const cartcontainer = document.getElementById("cartcontainer");
const feedbackelement = document.getElementById("feedbackelement");
const clearcart = document.getElementById("clearcart");
const sotybyprice = document.getElementById("sotybyprice")
const prodtcs =[{ id: 1, name: "Laptop", price: 20000 },
    { id: 2, name: "Mobile", price: 200 },
    { id: 3, name: "Prize", price: 15000 },
    { id: 4, name: "Smartwatch", price: 1000 },
    { id: 5, name: "Headphones", price: 1000 },
];
// prodtcs.forEach(function(prodct){
//     const productrow = `<div class="products-row">
//                 <p>${prodct.name} - Rs.${prodct.price}</p>
//                 <button>Add to cart</button>

//             </div>`;
//             productscontainer.insertAdjacentHTML("beforeend",productrow);

// });
let Cart =[];
prodtcs.forEach(function(prodct){
    const divelement = document.createElement("div");
    divelement.className =" products-row";
    divelement.innerHTML =  `
             <p>${prodct.name} - Rs.${prodct.price}</p>
                 <button onclick ="addToCart(${prodct.id})">Add to cart</button>

            </div>`;
            productscontainer.appendChild(divelement);
});
function addToCart(id){
    // console.log("card item is coimimg",id);
    const alredyexist = Cart.some((product)=>{return product.id === id});
    // console.log("alredyexist",alredyexist);
    if(alredyexist){
        const product = prodtcs.find(p => p.id === id); // ✅ get the product name to show in feedback
        updateelement(`${product.name} already exists in the cart.`,"error");
        return;
    }
    const productToCart = prodtcs.find((prodct)=>{return prodct.id === id});
    
    Cart.push(productToCart);
    console.log(Cart);
    renderdetails();
   
           
           
             updateelement(`${productToCart.name} add to the cart`,"success");


};
function renderdetails(){
    cartcontainer.innerHTML ="";
    Cart.forEach(function(productToCart){
        
         const productsitem = `<div class="products-row">
                 <p>${productToCart.name} - Rs.${productToCart.price}</p>
                 <button onclick ="removeToCart(${productToCart.id})">remove</button>

             </div>`;
             cartcontainer.insertAdjacentHTML("beforeend",productsitem);
    });
    let totalprice = 0;
    console.log("Cart",Cart);
    for(let i = 0 ; i <Cart.length;i++){
        totalprice = totalprice+ Cart[i].price
    }
    document.getElementById("total").textContent = `Rs.${totalprice}`;
}

function removeToCart(id){
    // const uodatecart = Cart.filter(function(prodct){
    //     return prodct.id !== id
    // });
//    Cart.pop(productToCart);
    const productindex = Cart.findIndex((prodct)=> prodct.id === id);
   Cart.splice(productindex,1);
//    Cart.pop(uodatecart);
//    console.log(uodatecart);
   updateelement('remove the element ','green');
   renderdetails();
}

function updateelement(msg,type){
     feedbackelement.style.display ="block";
    
    if(type === "success"){
        feedbackelement.style.backgroundColor="green";
    }

    else if (type === "error"){
        feedbackelement.style.backgroundColor="red";
    }
    feedbackelement.textContent = msg;
    setTimeout(function(){
        feedbackelement.style.display ="none";
    },3000);
    

}
clearcart.addEventListener("click",() =>{
    console.log("clear the button");
    console.log("Cart",Cart);
    Cart.length = 0;
    console.log(Cart);
     renderdetails();

    updateelement('Cart is clear','green');
});
sotybyprice.addEventListener("click",()=>{
    Cart.sort(function(item1,item2){
        return item1.price - item2.price
    });
    renderdetails();

});


// function addToCart(id){
//     // console.log("add to car clicking",id)
//     const productToCart = prodtcs.find(function(prodct){
//         return prodct.id === id

//     });
//     Cart.push(productToCart);
//     console.log(Cart);
//     const cartitems = `<div class="products-row">
//                 <p>${productToCart.name}-Rs.${productToCart.id}</p>
//                 <button>REmove</button>

//             </div>`;
//                cartcontainer.insertAdjacentHTML("beforeend",cartitems);
// }
