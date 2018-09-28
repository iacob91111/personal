var lista = [];
var listaProduseCumparate = [];
function addProduct() {
    var product = document.getElementById('input').value;

    if (product) {
        
        var body = document.getElementById('body');
        
        document.getElementById('itemsAction').style.display = "block";
        var addProduct = `
        <tr>
            <td class="product">${product}</td>
            <td>
                <button onclick="markAsBought('${product}')">Mark as bought</button>
            </td>
        </tr>
        `;
        body.innerHTML = body.innerHTML + addProduct;
    
        product.value = '';
        document.getElementById("error").style.opacity = "0";
        lista.push(product);  
        displayItems();  
    } else {
        
        document.getElementById("error").style.opacity = "100";
    }
    
    
}


function displayItems() {
    var generatedHtml = ``;
    for (var i = 0; i < lista.length; i++) {
        var item = lista[i];
        var cssItem = '';
        if (listaProduseCumparate.includes(item)) {
            cssItem = "bought";
        }
        generatedHtml += `
        <tr>
            <td class="${cssItem}">
                ${item}
            </td>
            <td>
                <button id="bought" onclick="markAsBought('${item}')">Mark as bought</button>
            </td>
        </tr>
        `;
    }
    document.getElementById('body').innerHTML = generatedHtml;
}


function markAsBought(produs) {
    listaProduseCumparate.push(produs);
    displayItems();
}


function sortAsc() {
    lista.sort();
    displayItems();
}


function sortDesc() {
    lista.sort();
    lista.reverse();
    displayItems();
}