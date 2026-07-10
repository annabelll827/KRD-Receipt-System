document.addEventListener("DOMContentLoaded", function(){

let products = [];

const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const darkBtn = document.getElementById("darkBtn");
const language = document.getElementById("language");


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

    table.innerHTML = "";

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




// Print

printBtn.onclick = function(){

    window.print();

};




// Settings Menu

settingsBtn.onclick = function(){

    settingsMenu.style.display =
    settingsMenu.style.display === "block"
    ? "none"
    : "block";

};





// Dark Mode

darkBtn.onclick = function(){

    document.body.classList.toggle("dark");

};





// Languages

const translations = {

en:{
    title:"KRD Receipt System",
    customer:"Customer",
    add:"Add",
    print:"🖨️ Print Receipt",
    product:"Product Name",
    price:"Price",
    quantity:"Quantity"
},


ku:{
    title:"سیستەمی وەسڵی KRD",
    customer:"کڕیار",
    add:"زیادکردن",
    print:"🖨️ چاپکردنی وەسڵ",
    product:"ناوی کاڵا",
    price:"نرخ",
    quantity:"ژمارە"
},


ar:{
    title:"نظام الوصل KRD",
    customer:"الزبون",
    add:"إضافة",
    print:"🖨️ طباعة الوصل",
    product:"اسم المنتج",
    price:"السعر",
    quantity:"الكمية"
}

};




language.onchange = function(){

    let lang = this.value;


    let t = translations[lang];


    let title = document.querySelector("h1");

    if(title)
        title.innerText = t.title;



    let customer = document.getElementById("customer");

    if(customer)
        customer.placeholder = t.customer;



    let product = document.getElementById("productName");

    if(product)
        product.placeholder = t.product;



    let price = document.getElementById("price");

    if(price)
        price.placeholder = t.price;



    let quantity = document.getElementById("quantity");

    if(quantity)
        quantity.placeholder = t.quantity;



    addBtn.innerText = t.add;

    printBtn.innerText = t.print;



    if(lang === "en"){

        document.documentElement.dir="ltr";

    }else{

        document.documentElement.dir="rtl";

    }

};



});
