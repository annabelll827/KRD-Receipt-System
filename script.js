document.addEventListener("DOMContentLoaded", function(){

let products = [];


const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");



// Add Product

addBtn.onclick = function(){

    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);


    if(name === "" || price <= 0 || quantity <= 0){

        alert("Fill product information");
        return;

    }


    products.push({

        name:name,
        price:price,
        quantity:quantity,
        total:price * quantity

    });


    showProducts();


};




// Show Products

function showProducts(){

    let table = document.getElementById("invoiceTable");

    table.innerHTML="";


    let total = 0;


    products.forEach(function(item,index){


        total += item.total;


        table.innerHTML += `

        <tr>

        <td>${item.name}</td>

        <td>$${item.price}</td>

        <td>${item.quantity}</td>

        <td>$${item.total}</td>


        <td>

        <button onclick="removeProduct(${index})">
        Delete
        </button>

        </td>


        </tr>

        `;


    });



    document.getElementById("total").innerText = total;


}




// Delete

window.removeProduct = function(index){

    products.splice(index,1);

    showProducts();

};




// PRINT

printBtn.onclick = function(){

    window.print();

};




// SETTINGS

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");


settingsBtn.onclick = function(){

    if(settingsMenu.style.display === "block"){

        settingsMenu.style.display="none";

    }else{

        settingsMenu.style.display="block";

    }

};




// DARK MODE

const darkBtn = document.getElementById("darkBtn");


darkBtn.onclick = function(){

    document.body.classList.toggle("dark");

};




// LANGUAGE

const language = document.getElementById("language");


language.onchange = function(){

    if(this.value === "en"){

        document.documentElement.dir="ltr";

    }
    else{

        document.documentElement.dir="rtl";

    }

};



});
