function operation1(productId) {
    
    let productContainer = document.getElementById(productId);

    let productImage = productContainer.querySelector('img').src;
    let productName = productContainer.querySelector('h2').textContent;
  
    let productPriceText = productContainer.querySelector('.product-info span').textContent;

    let productPrice = parseFloat(productPriceText.replace('P', ''));
    let quantity = 1;

    let check = false;

    const productItem = {
      id: productId,
      image: productImage,
      name: productName,
      price: productPrice,
      quantity: quantity
    };
    
    if (sessionStorage.getItem("prodItemContainer") != null) {
        let temp = JSON.parse(sessionStorage.getItem("prodItemContainer"));
        temp.forEach((e) => {
            if (e.id == productId) {
                check = true;
                return;
            }
        });

        if(check == true){
            gotoNextPage('billings.html');
            return;
        }

        temp.push(productItem);

        sessionStorage.setItem("prodItemContainer", JSON.stringify(temp));
    } else {

    let prodItemContainer = [];
    prodItemContainer.push(productItem);

    sessionStorage.setItem("prodItemContainer", JSON.stringify(prodItemContainer));
    }
    gotoNextPage('billings.html');
    

}
function gotoNextPage(pageName){
    window.location.href = pageName;
}

function changeLogin() {
    let x = document.getElementById("login-in-id");
    let y = document.getElementById("sign-up-id");

    if (x.style.display === "flex") {
        x.style.display = "none";
        y.style.display = "flex";
    } else {
        x.style.display = "flex";
        y.style.display = "none";
    }
}


function updateRegistry() {
    let emailInput = document.getElementById("ch-email2").value;
    let passwordInput = document.getElementById("ch-pass2").value;

    let accountDetails = {
        email: emailInput,
        pass: passwordInput
    };

    let accountContainer = [];

    if (sessionStorage.getItem("prodItemContainer") == null) {
        sessionStorage.setItem('prodItemContainer', JSON.stringify(accountContainer));
    } else {
        accountContainer = JSON.parse(sessionStorage.getItem("prodItemContainer"));
    }

    accountContainer.push(accountDetails);

    sessionStorage.setItem('prodItemContainer', JSON.stringify(accountContainer));

    alert('Registration successful!');
    changeLogin();
}

function checkStorage() {

    let emailInput = document.getElementById("ch-email1").value;
    let passwordInput = document.getElementById("ch-pass1").value;

    let accountContainer = [];

    if (sessionStorage.getItem("prodItemContainer") == null) {
        sessionStorage.setItem('prodItemContainer', JSON.stringify(accountContainer));
    }

    accountContainer = JSON.parse(sessionStorage.getItem("prodItemContainer"));

    let foundAccount = accountContainer.find(account => account.email == emailInput);

    if (foundAccount) {

        if (foundAccount.pass == passwordInput) {
            alert('Login successful!');
            gotoNextPage("profile.html");
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('Email not found. Please register.');
    }
}


function subscribe(){
    let inputElement = document.getElementById('newsletter-input');

    let inputValue = inputElement.value;

    alert("Your email "+inputValue + " will shortly be sent a confirmation email");
}