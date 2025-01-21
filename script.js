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

// console.log(listOfProducts)

const productList = document.querySelector(".product-items-list");

function addProductsToHTML() {
  productList.innerHTML = "";
  if (listOfProducts.length > 0) {
    listOfProducts.forEach((product, index) => {
      console.log(product);
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("item-container");
      itemContainer.innerHTML = `<div class="item-view">
                  <img
                    class="item-img"
                    src="${product[index]?.images.thumbnail}"
                    alt=""
                  />
                  <button class="add-to-cart-btn">
                    <img
                      class="icon"
                      src="./assets/images/icon-add-to-cart.svg"
                      alt="cart icon"
                    />
                    Add to Cart
                  </button>
                </div>
                <div class="desc">
                  <p class="item-faded-name">Waffle</p>
                  <h2 class="item-name">Waffle with Berries</h2>
                  <span class="price">$6.50</span>
                </div>`;
    });
  }
}

productList.addEventListener("click", (event) => {
  let selectedTagName = event.target.tagName;
  if (selectedTagName === "BUTTON") {
    const parentContainer = event.target.parentElement;
    parentContainer.classList.add(ACTIVE_CLASS);
  }
});
