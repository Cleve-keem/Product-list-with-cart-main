const startNewOrderbtn = document.getElementById("order-btn-start");
const orderNotification = document.getElementById(
  "order-confirmation-notification"
);
const placeOrderBtn = document.getElementById("confirm-order-btn");
const overlay = document.getElementById("overlay");
const productList = document.querySelector(".product-items-list");
const title = document.querySelector(".title");

const HIDDEN_CLASS = "hidden";
const ACTIVE_CLASS = "active";

let listOfProducts = [];
let cartList = [];

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
          <span class="price">$${product.price.toFixed(2)}</span>
        </div>`;
      productList.appendChild(itemContainer);
    });
  }
}

function findProduct(array, productCategory) {
  const product = array.find((product) => product.category === productCategory);
  return product;
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
    const existingProduct = findProduct(cartList, productCategory);

    if (existingProduct) {
      existingProduct.quantity += 0;
    } else {
      const selectedProductDetails = findProduct(
        listOfProducts,
        productCategory
      );
      cartList.push({ ...selectedProductDetails, quantity: 1 });
    }
    updateCart(addToCartBtn, productCategory);
    updateCartPreview();
    totalCartItem();
  }
});

function updateCart(button, productCategory) {
  const parentDiv = button.parentElement; // get the parent element
  const product = findProduct(cartList, productCategory);

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
  const product = findProduct(cartList, productCategory);
  if (product.quantity > 1) {
    product.quantity -= 1;
  } else {
    cartList = cartList.filter(
      (product) => product.category !== productCategory
    );
    resetCartButton(button, parentDiv);
    updateCartPreview();
    totalCartItem();
    return;
  }
  const counter = button.querySelector(".counter");
  counter.innerHTML = product.quantity;
}

function increaseQuantity(button, productCategory) {
  const product = findProduct(cartList, productCategory);
  if (product.quantity < 10) {
    product.quantity += 1;
  } else {
    alert(`You can't have more than 10 items of each recipes!`);
    return;
  }
  const counter = button.querySelector(".counter");
  counter.innerHTML = product.quantity;
  updateCartPreview();
  totalCartItem();
}

function resetCartButton(button, parentDiv) {
  parentDiv.classList.remove(ACTIVE_CLASS);
  button.classList.remove(ACTIVE_CLASS);
  button.innerHTML = `
   <img class="icon cart-icon" src="./assets/images/icon-add-to-cart.svg" alt="cart icon" />
   Add to Cart`;
}

const cart = document.querySelector(".cart");
const totalCartItems = cart.querySelector(".total-cart");
const cartPreview = cart.querySelector(".cart-preview");
const cartItemList = cart.querySelector(".cart-list");
const emptyCart = cart.querySelector(".cart-empty");
const orderTotalPrice = cart.querySelector(".order-price");

function updateCartPreview() {
  cartItemList.innerHTML = ""; // Clear current cart UI

  if (cartList.length > 0) {
    cartPreview.classList.remove(HIDDEN_CLASS); // Show cart preview
    emptyCart.classList.add(HIDDEN_CLASS); // Hide empty cart message

    cartList.map((product) => {
      const li = document.createElement("li");
      li.classList.add("list-item");
      li.innerHTML = `
        <h3>${product.name}</h3>
        <div class="item-detail">
          <div class="item-price-details">
            <span class="quantity">${product.quantity}x</span>
            <span class="price">@${product.price.toFixed(2)}</span>
            <span class="item-total">$${(
              product.quantity * product.price
            ).toFixed(2)}</span>
          </div>
          <button class="del">
            <img src="./assets/images/icon-remove-item.svg" alt="del" />
          </button>
        </div>`;
      cartItemList.appendChild(li);
      const delBtn = li.querySelector(".del");
      delBtn.addEventListener("click", () => {
        cartList = cartList.filter(
          (item) => item.category !== product.category
        );
        const productBtn = [...document.querySelectorAll(".add-to-cart")].find(
          (addToCartBtn) =>
            addToCartBtn.parentElement.parentElement.querySelector(".item-name")
              .textContent === product.name
        );
        if (productBtn) {
          resetCartButton(productBtn, productBtn.parentElement);
        }
        updateCartPreview(); // Re-render the cart list
        calcTotalPrice(orderTotalPrice);
        totalCartItem();
      });
      calcTotalPrice(orderTotalPrice);
      totalCartItem();
    });
  } else {
    cartPreview.classList.add(HIDDEN_CLASS);
    emptyCart.classList.remove(HIDDEN_CLASS);
  }
}

function calcTotalPrice(element) {
  const totalOrderPrice = cartList.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  element.innerHTML = `$${totalOrderPrice.toFixed(2)}`;
}

function totalCartItem() {
  const accQuantities = cartList.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  totalCartItems.innerHTML = accQuantities;
}

// Toggle the order buttons
function toggleOrderNotification() {
  orderNotification.classList.toggle(HIDDEN_CLASS);
}

const salesPreview = document.querySelector(".sales-preview");
const soldOutItems = salesPreview.querySelector(".sold-list");
const totalOrderSales = salesPreview.querySelector(".order-price");

placeOrderBtn.addEventListener("click", () => {
  soldOutItems.innerHTML = "";
  cartList.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("sold-item");
    li.innerHTML = `
      <div class="sold-desc">
        <img
          class="thumbnail"
          src="${product.image.thumbnail}"
          alt="${product.name + "image"}"
        />
        <div class="text">
          <h3>${product.name}</h3>
          <div class="item-detail">
            <div class="item-price-details order">
              <span class="quantity">${product.quantity}x</span>
              <span class="price">@${product.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sold-price">
        <span class="item-total">$${(product.quantity * product.price).toFixed(
          2
        )}</span>
      </div>`;
    soldOutItems.appendChild(li);
  });
  calcTotalPrice(totalOrderSales);
  toggleOrderNotification();
});
overlay.addEventListener("click", toggleOrderNotification);
startNewOrderbtn.addEventListener("click", () => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  addToCartBtns.forEach((btn) => resetCartButton(btn, btn.parentElement));
  cartList = [];
  updateCartPreview();
  title.scrollIntoView({
    top: 0,
    behavior: "smooth",
  });
  toggleOrderNotification();
});
