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



// Show Products
function showProducts(){

    let table = document.getElementById("invoiceTable");

    table.innerHTML="";

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
        </tr>
        `;

    });


    document.getElementById("total").innerText = total;

}



// Delete
window.deleteProduct = function(index){

    products.splice(index,1);

    showProducts();

};




// Print Receipt
printBtn.onclick = function(){

    let receipt = document.querySelector(".container").innerHTML;


    let printWindow = window.open("", "", "width=800,height=600");


    printWindow.document.write(`
    
    <html>
    <head>
    <title>Receipt</title>

    <style>
    body{
        font-family:Arial;
        padding:20px;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    th,td{
        border:1px solid #000;
        padding:10px;
        text-align:center;
    }

    </style>

    </head>

    <body>

    ${receipt}

    </body>

    </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    printWindow.print();

};




// Settings
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");


settingsBtn.onclick = function(){

    settingsMenu.style.display =
    settingsMenu.style.display === "block" ? "none" : "block";

};



// Dark Mode
document.getElementById("darkBtn").onclick = function(){

    document.body.classList.toggle("dark");

};



// Language
document.getElementById("language").onchange = function(){

    document.documentElement.dir =
    this.value === "en" ? "ltr" : "rtl";

};


});
