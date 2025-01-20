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
const itemContainer = document.querySelectorAll(".item-container");

console.log(itemContainer);
console.log(addToCartBtn);

function selectedItem() {
  addToCartBtn.forEach((button, index) => {
    if(itemContainer[index]){
      button.addEventListener("click", ()=>{
        itemContainer[index].classList.add(ACTIVE_CLASS);
      })
    }
  });
}

selectedItem();
