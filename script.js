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

let listOfProducts = []; // creating an array

async function fetchProductItems() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    listOfProducts = data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
  addProductsToHTML();
}
fetchProductItems();

const productList = document.querySelector(".product-items-list");

function addProductsToHTML() {
  productList.innerHTML = "";
  if (listOfProducts.length > 0) {
    listOfProducts.forEach((product) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");
      itemContainer.innerHTML = `<div class="item-view">
                  <img
                    class="item-img"
                    src="${product?.image.mobile}"
                    alt="Product image"
                  />
                  <button class="add-to-cart" onclick="addToCart(this)">
                    <img
                      class="icon cart-icon"
                      src="./assets/images/icon-add-to-cart.svg"
                      alt="cart icon"
                    />
                    Add to Cart
                  </button>
                </div>
                <div class="desc">
                  <p class="item-category">${product.category}</p>
                  <h2 class="item-name">${product.name}</h2>
                  <span class="price">$${product.price}</span>
                </div>`;
      productList.appendChild(itemContainer);
    });
  }
}

let currentQuantity = 1;

function addToCart(currentBtn) {
  currentBtn.classList.add(ACTIVE_CLASS);
  currentBtn.innerHTML = `<div class="decrement-btn">
                      <img
                        class="decrement-icon"
                        src="./assets/images/icon-decrement-quantity.svg"
                        alt="decrement icon" onclick="decreaseQuantity(this)"
                      />
                    </div>
                    <div class="counter">${currentQuantity}</div>
                    <div class="increment-btn">
                      <img
                        class="increment-icon"
                        src="./assets/images/icon-increment-quantity.svg"
                        alt="increment icon" onclick="increaseQuantity(this)"
                      />
                    </div>`;
  const parentDiv = currentBtn.parentElement;
  parentDiv.classList.add(ACTIVE_CLASS);
}

function decreaseQuantity(decrementBtn) {
  const parentDiv = decrementBtn.parentElement;
  const nextSibling = parentDiv.nextElementSibling;
  if (currentQuantity > 1) {
    currentQuantity--;
    nextSibling.innerHTML = currentQuantity;
  }
}

function increaseQuantity(increaseBtn) {
  const parentDiv = increaseBtn.parentElement;
  const previousSibling = parentDiv.previousElementSibling;
  previousSibling.innerHTML = currentQuantity;
  currentQuantity++;
}

// console.log(currentQuantity);

// const addToCartBtn = document.querySelectorAll(".add-to-cart");
// console.log(addToCartBtn.length)
// for (let i = 0; i < addToCartBtn.length; i++) {
//   console.log(addToCartBtn[i])
//   // addToCartBtn[i].addEventListener("click", function(){
//   //   console.log("Clicked")
//   //   this.classList.add(ACTIVE_CLASS)
//   //   console.log(this.parentElement())
//   // })
// }

// productList.addEventListener("click", (event) => {
//   let selectedTagName = event.target.tagName;
//   console.log(selectedTagName);
//   if (selectedTagName === "BUTTON") {
//     const parentContainer = event.target.parentElement;
//     parentContainer.classList.add(ACTIVE_CLASS);

//     const displayCounter = document.querySelectorAll(".add-to-cart");
//     displayCounter.forEach(item => {
//       item.classList.add(ACTIVE_CLASS)
//       item.innerHTML = `<div class="decrement-btn">
//       <img
//         class="decrement-icon"
//         src="./assets/images/icon-decrement-quantity.svg"
//         alt="decrement icon"
//       />
//     </div>
//     <span class="counter">1</span>
//     <div class="increment-btn">
//       <img
//         class="increment-icon"
//         src="./assets/images/icon-increment-quantity.svg"
//         alt="increment icon"
//       />
//     </div>`
//     })
//   //   displayCounter.classList.add(ACTIVE_CLASS);
//   //   displayCounter.innerHTML = `<div class="decrement-btn">
//   //                   <img
//   //                     class="decrement-icon"
//   //                     src="./assets/images/icon-decrement-quantity.svg"
//   //                     alt="decrement icon"
//   //                   />
//   //                 </div>
//   //                 <span class="counter">1</span>
//   //                 <div class="increment-btn">
//   //                   <img
//   //                     class="increment-icon"
//   //                     src="./assets/images/icon-increment-quantity.svg"
//   //                     alt="increment icon"
//   //                   />
//   //                 </div>`;
//   // }
// }});
