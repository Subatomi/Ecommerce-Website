document.addEventListener('DOMContentLoaded', function () {
    addFromSession();
});



function addFromSession() {
    let prodItemContainer = JSON.parse(sessionStorage.getItem("prodItemContainer"));
    let billingItemContainer;

    if (sessionStorage.getItem("billingItemContainer") != null) {
        billingItemContainer = JSON.parse(sessionStorage.getItem("billingItemContainer"));
    } else {
        billingItemContainer = [];
        sessionStorage.setItem("billingItemContainer", JSON.stringify(billingItemContainer));
    }

    if (sessionStorage.getItem("totalQuQuantity") == null || sessionStorage.getItem("totalPriPrice") == null) {
        sessionStorage.setItem("totalQuQuantity", 0);
        sessionStorage.setItem("totalPriPrice", 0);
    }


    if (prodItemContainer && prodItemContainer.length > 0) {
        prodItemContainer.forEach(function (productItem) {

            const itemNotInBilling = !billingItemContainer.some(item => item.id === productItem.id);
    
            if (itemNotInBilling) {
                const newProductItem = {
                    id: productItem.id,
                    image: productItem.image,
                    name: productItem.name,
                    price: productItem.price,
                    quantity: productItem.quantity
                };
    
                billingItemContainer.push(newProductItem);
    
                sessionStorage.setItem("billingItemContainer", JSON.stringify(billingItemContainer));

            }
        });
        construct(billingItemContainer);
        sessionStorage.removeItem("prodItemContainer");
    }
    

}


function updateContent(){
    let paymentMethod = document.getElementById("paymentMethod").value;

        document.getElementById("CardContent").style.display = "none";
        document.getElementById("OnlineContent").style.display = "none";

        if(paymentMethod == "Online"){
            document.getElementById(paymentMethod + "Content").style.display = "flex";
        }else{
            document.getElementById(paymentMethod + "Content").style.display = "block";
        }
        
}

function deleteProd(id){
    let x = document.getElementById(id);
    x.remove();
}

function changeQuantity(num, id) {
    let x = document.getElementById(id);
    let y = x.querySelector('.quantity');
    let currentValue = parseInt(y.textContent);
    y.innerText = currentValue += num;
    if(currentValue <= 0){
        document.getElementById(id).remove();
    }
}

function updateTotal(price, quantity){
    let x = document.getElementById('checkoutX');
    let y = document.getElementById('checkoutY');
    x.innerText = quantity;
    y.innerText = price;
}

function updateTotal4quan(num, price){
    let x = document.getElementById('checkoutX');
    let y = document.getElementById('checkoutY');

    let currTotalQuantity = parseInt(x.innerText);
    let currTotalPrice = parseFloat(y.innerText);

    x.innerText = currTotalQuantity+num;
    y.innerText = (currTotalPrice += (num*price));
}

function saveDataBeforeUnload() {
    let itemBoxes = document.querySelectorAll('.item-box');
    let temp = [];

    itemBoxes.forEach(function (itemBox) {
        let id = itemBox.id;
        let name = itemBox.querySelector('h3').textContent;
        let priceText = itemBox.querySelector('p').textContent;
        let price = parseFloat(priceText.replace('Price: ', ''));
        let quantity = parseInt(itemBox.querySelector('.quantity').textContent);
        let imageSrc = itemBox.querySelector('img').src;

        let itemBoxData = {
            id: id,
            image: imageSrc,
            name: name,
            price: price,
            quantity: quantity
        };

        temp.push(itemBoxData);
    });

    sessionStorage.setItem("billingItemContainer", JSON.stringify(temp));
    alert("Data saved to sessionStorage!");
}

function construct(ching){
    let currentTotalPrice = parseFloat(sessionStorage.getItem("totalPriPrice"));
    let currentTotalQuantity = parseInt(sessionStorage.getItem("totalQuQuantity"));

    let container = document.getElementById("here-container");
    ching.forEach(function (itemzzz){
        let productElement = document.createElement("div");
        productElement.className = "item-box";
        productElement.id = itemzzz.id;

        let productExit = document.createElement("button");
        productExit.className = "exit-button";
        productExit.innerHTML = "<i class='bx bx-x'></i>";

        productExit.addEventListener("click", function () {
            console.log("Clicked on exit button");
            deleteProd(itemzzz.id);
        });

        productElement.appendChild(productExit);

        let imgElement = document.createElement("img");
        imgElement.src = itemzzz.image;
        productElement.appendChild(imgElement);

        let nameElement = document.createElement("h3");
        nameElement.textContent = itemzzz.name;
        productElement.appendChild(nameElement);

        let priceElement = document.createElement("p");
        priceElement.textContent = `Price: ${itemzzz.price}`;
        productElement.appendChild(priceElement);

        let divQuantity = document.createElement("div");
        divQuantity.className = "div-Quantity";

        let decrement = document.createElement("button");
        decrement.addEventListener("click", function () {
            console.log("decrement");
            changeQuantity(-1, itemzzz.id);
            updateTotal4quan(-1, itemzzz.price);
        });
        decrement.innerHTML = "-";
        divQuantity.appendChild(decrement);

        let quantityElement = document.createElement("div");
        quantityElement.innerText = itemzzz.quantity;
        quantityElement.className = "quantity";
        divQuantity.appendChild(quantityElement);

        let increment = document.createElement("button");
        increment.addEventListener("click", function () {
            console.log("increment");
            changeQuantity(1, itemzzz.id);
            updateTotal4quan(1, itemzzz.price);
        });
        increment.innerHTML = "+";
        divQuantity.appendChild(increment);

        productElement.appendChild(divQuantity);
        container.appendChild(productElement);

        currentTotalQuantity += itemzzz.quantity;
        currentTotalPrice += itemzzz.price * itemzzz.quantity;
        
    });

    updateTotal(currentTotalPrice, currentTotalQuantity);

}


function processCart() {
    let selectedPaymentMethod = document.getElementById("paymentMethod").value;

    let x = document.getElementById('checkoutX');
    let y = document.getElementById('checkoutY');
    let currentTotalQuantity = parseInt(x.innerText);
    let currentTotalPrice = parseFloat(y.innerText);

    if (selectedPaymentMethod == "Card") {
        let fullName = document.getElementById("cc-name").value;
        let cardNumber = document.getElementById("cc-number").value;
        let cardPin = document.getElementById("cc-pin").value;

        alert("Payment Method: " + selectedPaymentMethod 
            + "\nFull Name: "+ fullName 
            + "\nCard Number: " + cardNumber 
            + "\nTotal Quantity: " + currentTotalQuantity 
            + "\nTotal Price: " + currentTotalPrice 
            + "\n PROCESSING.... " );
    } else if (selectedPaymentMethod == "Online") {

        let email = document.getElementById("cc-email").value;

        alert("Payment Method: " +selectedPaymentMethod
            + "\nEmail: " + email
            + "\nTotal Quantity: " + currentTotalQuantity 
            + "\nTotal Price: " + currentTotalPrice 
            + "PROCESSING.... " );
    } else {
        alert("Invalid payment method selected");
    }
}






