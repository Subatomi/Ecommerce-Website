

let cartElement = document.querySelector('.cart');
function toggleCart() {
    if (cartElement.style.right === '-150%') {
        cartElement.style.right = '0';
    } else {
        cartElement.style.right = '-150%';
    }
}

function operation1(productId) {
    let x = document.getElementById(productId);
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "grid";
        updateTotalQuantity(1);
    } else {
        x.style.display = "none";
        updateTotalQuantity(-1);
    }
    
}

function decrementQuantity(productId) {
    let quantityElement = document.querySelector('#' + productId + ' .quantity .value');
    let currentValue = parseInt(quantityElement.textContent);

    if (currentValue < 1) {
        operation1(productId);
    }else{
        quantityElement.textContent = currentValue - 1;
        updateTotalQuantity(-1);
    }
}

function incrementQuantity(productId) {
    let quantityElement = document.querySelector('#' + productId + ' .quantity .value');
    let currentValue = parseInt(quantityElement.textContent);

    if (currentValue < 99) {
        quantityElement.textContent = currentValue + 1;
        updateTotalQuantity(1);
    }
}

function calculate_total() {
    let total_quantity = 0;
    let total_price = 0;
    let checkedProductIds = [];

    for (let i = 1; i <= 12; i++) {
        let productId = 'product' + i;
        let x = document.getElementById(productId);


        if (x.style.display === "grid") {
            let product_quantity = parseInt(document.querySelector('#' + productId + ' .quantity .value').textContent);
            let product_price_string = document.querySelector('#' + productId + ' .price').textContent;
            let product_price = parseInt(product_price_string.match(/\d+/)[0]);

            if (!isNaN(product_quantity)) {
                total_quantity += product_quantity;
                total_price += product_quantity * product_price;
                checkedProductIds.push(productId);
                checkedProductIds.push(product_quantity);
            }
        }
    }

    localStorage.setItem('totalQuantity', total_quantity);
    localStorage.setItem('totalPrice', total_price);
    localStorage.setItem('arrOfProd', checkedProductIds);
    alert("Processing...");
}



function updateCheckoutPage() {

    let storedTotalQuantity = localStorage.getItem('totalQuantity');
    let storedTotalPrice = localStorage.getItem('totalPrice');

    let x = document.getElementById('checkoutX');
    let y = document.getElementById('checkoutY');
    if(x && y){
        x.innerText = storedTotalQuantity;
        y.innerText = "P" + storedTotalPrice;
    }

}

function updateTotalQuantity(newQuantity) {
    let totalQuantityElement = document.getElementById('total-quantity-icons');
    if (totalQuantityElement) {
        let currentQuantity = parseInt(totalQuantityElement.innerText);
        totalQuantityElement.innerText = (currentQuantity + newQuantity).toString();
    }
}

function updateCart() {
    let storedTotalQuantity = localStorage.getItem('totalQuantity');
    let totalQuantityElement = document.getElementById('total-quantity-icons');
    
    let arrProd = localStorage.getItem('arrOfProd');

    if (arrProd) {
        arrProd = arrProd.split(',');

        for (let i = 0; i < arrProd.length; i += 2) {
            let productId = arrProd[i];
            let productQuantity = parseInt(arrProd[i + 1]);

            operation1(productId);
            let quantityElement = document.querySelector('#' + productId + ' .quantity .value');
            quantityElement.textContent = productQuantity.toString();
        }
        totalQuantityElement.innerText = storedTotalQuantity.toString();
    }
}

function subscribe(){
    let inputElement = document.getElementById('newsletter-input');

    let inputValue = inputElement.value;

    alert("Your email "+inputValue + " will shortly be sent a confirmation email");
}

document.addEventListener('DOMContentLoaded', function() {
    updateCheckoutPage();
    updateCart();
});
