const startNewOrderbtn = document.getElementById("order-btn-start");
const orderNotification = document.getElementById(
  "order-confirmation-notification"
);
const placeOrderBtn = document.getElementById("confirm-order-btn");
const overlay = document.getElementById("overlay");
const productList = document.querySelector(".product-items-list");

const HIDDEN_CLASS = "hidden";
const ACTIVE_CLASS = "active";

function toggleOrderNotification() {
  orderNotification.classList.toggle(HIDDEN_CLASS);
}

placeOrderBtn.addEventListener("click", toggleOrderNotification);
overlay.addEventListener("click", toggleOrderNotification);
startNewOrderbtn.addEventListener("click", toggleOrderNotification);

let listOfProducts = []; // creating an array
let cart = {};
let cartLIst = [];

// fetch products from the json file
async function fetchProductItems() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    listOfProducts = data;
    addProductsToHTML();
  } catch (error) {
    productList.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    console.log(error);
  }
}
fetchProductItems();

// Load item to HTML
function addProductsToHTML() {
  productList.innerHTML = "";
  if (listOfProducts.length > 0) {
    listOfProducts.forEach((product, index) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");
      itemContainer.innerHTML = `
        <div class="item-view" data-id="${index}">
          <img
            class="item-img"
            src="${product.image.mobile}"
            alt="Product image"
          />
          <div class="add-to-cart">
            <img
              class="icon cart-icon"
              src="./assets/images/icon-add-to-cart.svg"
              alt="cart icon"
            />
            Add to Cart
          </div>
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

//
productList.addEventListener("click", (event) => {
  const addToCartBtn = event.target.closest(".add-to-cart");
  if (addToCartBtn) {
    const itemView = addToCartBtn.parentElement;
    const itemContainer = itemView.parentElement;
    const productId = itemView.dataset.id;
    const productCategory =
      itemContainer.querySelector(".item-category").innerHTML;
    const selectedProduct = listOfProducts.filter(
      (product) => product.category == productCategory
    );

    if(!cart[productId]){
      cart[productId] = 1;
    }

    cartLIst.push({ ...selectedProduct, productId });
    updateCart(addToCartBtn, productId);
  }
});

console.log(cartLIst);

function updateCart(button, productId) {
  const parentDiv = button.parentElement; // get the parent element
  parentDiv.classList.add(ACTIVE_CLASS);

  button.classList.add(ACTIVE_CLASS);
  button.innerHTML = `
    <div class="decrement-btn">
      <img class="decrement-icon" src="./assets/images/icon-decrement-quantity.svg" alt="decrement icon" />
    </div>
    <div class="counter">${cart[productId]}</div>
    <div class="increment-btn">
      <img
        class="increment-icon" src="./assets/images/icon-increment-quantity.svg" alt="increment icon" />
    </div>`;

  const decrementBtn = parentDiv.querySelector(".decrement-btn");
  const incrementBtn = parentDiv.querySelector(".increment-btn");

  decrementBtn.addEventListener("click", () =>
    decreaseQuantity(button, productId, parentDiv)
  );
  incrementBtn.addEventListener("click", () =>
    increaseQuantity(button, productId)
  );
}

function decreaseQuantity(button, productId, parentDiv) {
  if (cart[productId] > 1) {
    cart[productId]--;
  } else {
    delete cart[productId];
    resetCartButton(button, parentDiv);
    return;
  }

  const counter = button.querySelector(".counter");
  counter.innerHTML = cart[productId];
}

function increaseQuantity(button, productId) {
  if (cart[productId] < 10) {
    cart[productId]++;
  } else {
    alert(`You can't have more than 10 of this recipe!`);
    return;
  }

  const counter = button.querySelector(".counter");
  counter.innerHTML = cart[productId];
}

function resetCartButton(button, parentDiv) {
  parentDiv.classList.remove(ACTIVE_CLASS);
  button.classList.remove(ACTIVE_CLASS);
  button.innerHTML = `
    <img class="icon cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="cart icon" />
    Add to Cart`;
}

// let currentQuantity = 1;
// const cartList = [];

// function addToCart(currentBtn) {
//   console.log("default", currentBtn);
//   currentBtn.classList.add(ACTIVE_CLASS);
//   console.log("add active class", currentBtn);
//   currentBtn.innerHTML = `<div class="decrement-btn">
//   <img
//     class="decrement-icon"
//     src="./assets/images/icon-decrement-quantity.svg"
//     alt="decrement icon" onclick="decreaseQuantity(this)"
//   />
//   </div>
//   <div class="counter">${currentQuantity}</div>
//   <div class="increment-btn">
//     <img
//       class="increment-icon"
//       src="./assets/images/icon-increment-quantity.svg"
//       alt="increment icon" onclick="increaseQuantity(this)"
//     />
//   </div>`;
//   const parentDiv = currentBtn.parentElement;
//   parentDiv.classList.add(ACTIVE_CLASS);
// }

// function decreaseQuantity(decrementBtn) {
//   const parentDiv = decrementBtn.parentElement;
//   const nextSibling = parentDiv.nextElementSibling;
//   if (currentQuantity < 1) {
//     let defaultCartbtn = parentDiv.parentElement;
//     console.log("before", defaultCartbtn);
//     defaultCartbtn.classList.remove(ACTIVE_CLASS);
//     console.log("after", defaultCartbtn);
//     // defaultCartbtn.innerHTML = `<button class="add-to-cart" onclick="addToCart(this)">
//     // <img class="icon cart-icon"
//     //   src="./assets/images/icon-add-to-cart.svg"
//     //   alt="cart icon"
//     // />Add to Cart
//     // </button>`;

//     // console.log(addToCartBtn);
//   } else {
//     nextSibling.innerHTML = currentQuantity;
//     currentQuantity--;
//   }
// }

// function increaseQuantity(increaseBtn) {
//   const parentDiv = increaseBtn.parentElement;
//   const previousSibling = parentDiv.previousElementSibling;
//   previousSibling.innerHTML = currentQuantity;
//   currentQuantity++;
// }

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
