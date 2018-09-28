var productsUrlList = 'https://finalonlineshop.firebaseio.com/.json';
var cartItems = 0;
var prOcc = 1;
async function getProductsFromServer() {
    var productsResponse = await fetch(productsUrlList)
    var products = await productsResponse.json();
    return products;
}

async function showProducts(productsPromise) {

    var products = await productsPromise;
    var generatedHTML = '';
    var productsIDs = Object.keys(products);
    productsIDs.forEach(productID => {
        var product = products[productID];
        generatedHTML += getGeneratedHTMLForProduct(productID, product);
    });
    document.getElementById('categories').innerHTML = generatedHTML;
}

function getGeneratedHTMLForProduct(productID, product) {
    var generatedHTML = `
        <div id = categoriesDiv>
            <img class = "categoryImage" src = ${product.Image} />
            <div class = "categoryName">${product.Name}</div>
            <div class = "categoryPrice">$ ${product.Price}</div>
            <button id = "seeMore" onclick = "seeMore('${productID}')">See more</button>
        </div>
    `;
    return generatedHTML;
}

function loadingGif() {
    var body = document.getElementById('details');
    var generatedBody =
        `
            <div id = "loadingDiv">
                <img id = "loader" src = "source.gif" alt = "loader">
            </div>
        `;
    body.innerHTML = generatedBody;
}

function seeMore(productID) {
    window.location = `./productDetails.html?productID=${productID}`;
}

function getProductIDFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var productID = params.get('productID');

    return productID;
}

async function getDetailsFromServer(productID) {
    var detailsResponse = await fetch(`https://finalonlineshop.firebaseio.com/${productID}.json`);
    var details = await detailsResponse.json();

    return details;
}


async function seeDetails(detailsPromise) {

    loadingGif();
    var details = await detailsPromise;
    setTimeout(() => {
        var generatedHTML = `
    <div id = "addedMessage" style = "display: none;">Added to cart!</div>
    <div id = "imageDetailDiv"><img id = "imageDetail" src = "${details.Image}" /></div>
    <div id = "detailsAboutProduct"> 
        <div>${details.Name}</div>
        <div>Price: $${details.Price}</div>
        <div>Qty: ${details.Qty}</div>
    </div>
    <button id = "addToCart" onclick = "addToCart(getDetailsFromServer(getProductIDFromUrl()));">Add to cart</button>
    <div id = "detailsFromServer">${details.Details}</div>
        `
        document.getElementById('details').innerHTML = generatedHTML;
    }, 3000);

}

function showCounter() {
    if (localStorage.getItem('cartItems') != null) {
        var crtIts = localStorage.getItem('cartItems');
        document.getElementById('itemsCounter').innerHTML = "(" + crtIts + ")";
    }
    else {
        document.getElementById('itemsCounter').innerHTML = "(" + 0 + ")";x

    }

}

function showTableCart() {
    var x = localStorage.getItem('cartItems');
    if (x != null && x != 0) {

        document.getElementById('tableCart').style.display = "block";
        document.getElementById('emptyCartMessage').style.display = "none";
    }
    else {
        document.getElementById('emptyCartMessage').style.display = "block";
        document.getElementById('tableCart').style.display = "none";
    }

    if (localStorage.getItem('cartItems') == 0) {
        document.getElementById('tBodyCart').innerHTML = " ";
    }
    else {
        document.getElementById('tBodyCart').innerHTML = localStorage.getItem('tableContentCart');
    }

}

async function addToCart(detailsCartPromise) {
    var previousItemCounter;
    var detailsCart = await detailsCartPromise;
    var generatedHTML;
    if (localStorage.getItem('tableContentCart') == null || localStorage.getItem('tableContentCart') == undefined) {
        generatedHTML = `
        <tr> 
    <td class="image"><img id = "imgCart" src="${detailsCart.Image}"></td>
    <td>${detailsCart.Name}</td>
    <td><input type = "number" value = "1"></input></td>
    <td>${detailsCart.Price}</td>
    <td>${1.19 * detailsCart.Price}</td>
    <td>a</td>
    <td><button id = "deleteButton" onclick = "deleteItem(this)">Delete</button></td>
    </tr>
    `
        localStorage.setItem('tableContentCart', generatedHTML);
    }
    else {
        generatedHTML = localStorage.getItem('tableContentCart');


        if (localStorage.getItem('tableContentCart').split(detailsCart.Name).length > 1) {
            var jkl;
            if (localStorage.getItem('countProductOcc') == null ||localStorage.getItem('countProductOcc') == undefined ) {
                previousItemCounter = prOcc;
                prOcc += 1;
            }
            else {
                previousItemCounter = localStorage.getItem('countProductOcc');
                prOcc = Number(localStorage.getItem('countProductOcc')) + 1;
            }
            
            localStorage.setItem('countProductOcc', prOcc);
            
            jkl = prOcc;
           
            generatedHTML = generatedHTML.replace("<td>" + previousItemCounter +  "</td>", "<td>" + jkl + "</td>")
        }
        else {
            generatedHTML += `
        <tr>
        <td class="image"><img id = "imgCart" src="${detailsCart.Image}"></td>
        <td>${detailsCart.Name}</td>
        <td><input type = "number" value = "${localStorage.getItem('tableContentCart').split(detailsCart.Name).length}"></input></td>
        <td>${detailsCart.Price}</td>
        <td>a</td>
        <td>a</td>
        <td><button id = "deleteButton" onclick = "deleteItem(this)">Delete</button></td>
        </tr>
        `}

        localStorage.setItem('tableContentCart', generatedHTML);
    }
    var productID = getProductIDFromUrl();
    getDetailsFromServer(productID);

    document.getElementById('addedMessage').style.display = "block";
    setTimeout(() => {
        document.getElementById('addedMessage').style.display = "none";
    }, 2000);
    if (localStorage.getItem('cartItems') == null) {
        cartItems += 1;
    }
    else {
        cartItems = Number(localStorage.getItem("cartItems")) + 1;
    }

    localStorage.setItem("cartItems", cartItems)

    document.getElementById('itemsCounter').innerHTML = "(" + cartItems + ")";
}

function deleteItem(entry) {
    lowItemsCounter();
    var row = entry.parentNode.parentNode;
    row.parentNode.removeChild(row);
    var x = document.getElementById("tBodyCart");
    var ctr = localStorage.getItem('cartItems');
    if (ctr == null || ctr == 0) {
        localStorage.setItem('tableContentCart', " ");
        document.getElementById('emptyCartMessage').style.display = "block";
        document.getElementById('tableCart').style.display = "none";

    }
    else {

        localStorage.setItem('tableContentCart', x);
    }

}

function lowItemsCounter() {
    var itemsCounter = localStorage.getItem('cartItems');
    if (itemsCounter > 0) {
        itemsCounter -= 1;
    }
    localStorage.setItem('cartItems', itemsCounter);
    document.getElementById('itemsCounter').innerHTML = "(" + itemsCounter + ")";
}

function ValidateEmail() {

    var email = document.getElementById("em").value;
    var par = document.getElementById("parola").value;
    var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var parformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    if (email == "") {
        document.getElementById("invalid").innerHTML = ("Please type a valid email address and a valid password!");
    }

    if (email.match(mailformat)) {
        document.getElementById("invalid").innerHTML = ("Please type a valid password! - must contain uppercase, number, letter and at least 6 characters!")
    }
    if (par != "" && par.match(parformat)) {
        document.getElementById("invalid").innerHTML = ("Valid inputs!")
        setTimeout(() => {
            window.location.assign('adminSecond.html')
        }, 2000);

    }
}

