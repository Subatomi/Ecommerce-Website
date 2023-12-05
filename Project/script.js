
let cartElement = document.querySelector('.cart');
function toggleCart() {
    if (cartElement.style.right === '-150%') {
        cartElement.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cartElement.style.right = '-150%';
        container.style.transform = 'translateX(0)';
    }
}

function operation1(productId) {
    var x = document.getElementById(productId);
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "grid";
    } else {
        x.style.display = "none";
    }
}

function decrementQuantity(productId) {
    var quantityElement = document.querySelector('#' + productId + ' .quantity .value');
    var currentValue = parseInt(quantityElement.textContent);

    if (currentValue == 0) {
        operation1(productId);
    }else{
        quantityElement.textContent = currentValue - 1;
    }
}

function incrementQuantity(productId) {
    var quantityElement = document.querySelector('#' + productId + ' .quantity .value');
    var currentValue = parseInt(quantityElement.textContent);

    if (currentValue < 99) {
        quantityElement.textContent = currentValue + 1;
    }
}

