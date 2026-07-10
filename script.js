document.addEventListener("DOMContentLoaded", function(){

let products = [];

const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const darkBtn = document.getElementById("darkBtn");
const language = document.getElementById("language");


addBtn.onclick = function(){

    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);

    if(name === "" || price <= 0 || quantity <= 0){
        alert("Please enter product information");
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


function showProducts(){

    const table = document.getElementById("invoiceTable");
    table.innerHTML = "";

    let total = 0;

    products.forEach((item,index)=>{

        total += item.total;

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${item.total}</td>
            <td>
            <button onclick="deleteProduct(${index})">
            Delete
            </button>
            </td>
        </tr>`;
    });

    document.getElementById("total").innerText = total;
}


window.deleteProduct = function(index){

    products.splice(index,1);
    showProducts();

};


printBtn.onclick = function(){
    window.print();
};


settingsBtn.onclick = function(){

    settingsMenu.style.display =
    settingsMenu.style.display === "block" ? "none" : "block";

};


darkBtn.onclick = function(){

    document.body.classList.toggle("dark");

};


language.onchange = function(){

    document.documentElement.dir =
    this.value === "en" ? "ltr" : "rtl";

};


});
