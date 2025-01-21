const startNewOrderbtn = document.getElementById("order-btn-start");
const orderNotification = document.getElementById(
  "order-confirmation-notification"
);
const placeOrderBtn = document.getElementById("confirm-order-btn");
const overlay = document.getElementById("overlay");

const HIDDEN_CLASS = "hidden";
const ACTIVE_CLASS = "active";

function toggleOrderNotification() {
  orderNotification.classList.toggle(HIDDEN_CLASS);
}

placeOrderBtn.addEventListener("click", toggleOrderNotification);
overlay.addEventListener("click", toggleOrderNotification);
startNewOrderbtn.addEventListener("click", toggleOrderNotification);

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
const itemContainer = document.querySelectorAll("item-container");
const productList = document.querySelector(".product-items-list");
const listOfProducts = [];

async function fetchProductItems() {
  const res = await fetch("data.json");
  const data = await res.json();
  console.log(data);
  listOfProducts.push(data);
  // addProductsToHTML();
}

// function addProductsToHTML() {
//   productList.innerHTML = "";
//   // console.log(listOfProducts);
//   if (listOfProducts > 0) {
//     listOfProducts.forEach((product, index) => {
//       console.log(product);
//       const itemContainer = document.createElement("div");
//       itemContainer.classList.add("item-container");
//       itemContainer.innerHTML = `<div class="item-view">
//                   <img
//                     class="item-img"
//                     src="${product[index]?.images.thumbnail}"
//                     alt=""
//                   />
//                   <button class="add-to-cart-btn">
//                     <img
//                       class="icon"
//                       src="./assets/images/icon-add-to-cart.svg"
//                       alt="cart icon"
//                     />
//                     Add to Cart
//                   </button>
//                 </div>
//                 <div class="desc">
//                   <p class="item-faded-name">Waffle</p>
//                   <h2 class="item-name">Waffle with Berries</h2>
//                   <span class="price">$6.50</span>
//                 </div>`;
//     });
//   }
// }

productList.addEventListener("click", (event)=>{
  let selectedTagName = event.target.tagName; 
  if(selectedTagName === "BUTTON"){
    const parentContainer = event.target.parentElement;
    parentContainer.classList.add(ACTIVE_CLASS);
  }
});

fetchProductItems();
