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

let listOfProducts = []; 
const cartList = [];

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

// Get selected Product
productList.addEventListener("click", (event) => {
  const addToCartBtn = event.target.closest(".add-to-cart");
  if (addToCartBtn) {
    const itemView = addToCartBtn.parentElement;
    const itemContainer = itemView.parentElement;
    const productCategory =
      itemContainer.querySelector(".item-category").innerHTML;

    // Check if product already exist
    const existingProduct = cartList.find(
      (product) => product.category === productCategory
    );

    if (existingProduct) {
      existingProduct.quantity += 0;
    } else {
      const selectedProductDetails = listOfProducts.find(
        (product) => product.category === productCategory
      );
      cartList.push({ ...selectedProductDetails, quantity: 1 });
    }
    updateCart(addToCartBtn, productCategory);
  }
});

function updateCart(button, productCategory) {
  const parentDiv = button.parentElement; // get the parent element
  const product = cartList.find(
    (product) => product.category === productCategory
  );

  parentDiv.classList.add(ACTIVE_CLASS);
  button.classList.add(ACTIVE_CLASS);
  button.innerHTML = `
    <div class="decrement-btn">
      <img class="decrement-icon" src="./assets/images/icon-decrement-quantity.svg" alt="decrement icon" />
    </div>
    <div class="counter">${product.quantity}</div>
    <div class="increment-btn">
      <img
        class="increment-icon" src="./assets/images/icon-increment-quantity.svg" alt="increment icon" />
    </div>`;

  const decrementBtn = parentDiv.querySelector(".decrement-btn");
  const incrementBtn = parentDiv.querySelector(".increment-btn");

  decrementBtn.addEventListener("click", () =>
    decreaseQuantity(button, productCategory, parentDiv)
  );
  incrementBtn.addEventListener("click", () =>
    increaseQuantity(button, productCategory)
  );
}

function decreaseQuantity(button, productCategory, parentDiv) {
  const product = cartList.find(
    (product) => product.category === productCategory
  );
  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    cartList = cartList.filter(
      (product) => product.category !== productCategory
    );
    resetCartButton(button, parentDiv);
    return;
  }

  const counter = button.querySelector(".counter");
  counter.innerHTML = product.quantity;
}

function increaseQuantity(button, productCategory) {
  const product = cartList.find(
    (product) => product.category === productCategory
  );
  if (product.quantity < 10) {
    product.quantity += 1;
  } else {
    alert(`You can't have more than 10 of this recipe!`);
    return;
  }
  const counter = button.querySelector(".counter");
  counter.innerHTML = product.quantity;
}

function resetCartButton(button, parentDiv) {
  parentDiv.classList.remove(ACTIVE_CLASS);
  button.classList.remove(ACTIVE_CLASS);
  button.innerHTML = `
    <img class="icon cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="cart icon" />
    Add to Cart`;
}
