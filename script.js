const startNewOrderbtn = document.getElementById("order-btn-start");
const orderNotification = document.getElementById("order-confirmation-notification");
const placeOrderBtn = document.getElementById("confirm-order-btn");
const overlay = document.getElementById("overlay");

placeOrderBtn.addEventListener("click", ()=>{
    orderNotification.classList.add("hidden");
})

overlay.addEventListener("click", ()=>{
    orderNotification.classList.remove("hidden");
})

startNewOrderbtn.addEventListener("click", ()=>{
    orderNotification.classList.remove("hidden");
})