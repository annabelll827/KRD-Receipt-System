document.addEventListener("DOMContentLoaded", function () {

let products = [];

const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const darkBtn = document.getElementById("darkBtn");
const language = document.getElementById("language");


// Language translations
const translations = {

    en:{
        title:"KRD Receipt System",
        add:"Add",
        print:"🖨️ Print Receipt",
        dark:"🌙 Dark Mode",
        light:"☀️ Light Mode",
        total:"Total",
        supportTitle:"📧 Contact Support",
        supportText:"If you have any problem, contact us:",
        delete:"Delete"
    },

    ku:{
        title:"سیستەمی وەسڵی KRD",
        add:"زیادکردن",
        print:"🖨️ چاپکردنی وەسڵ",
        dark:"🌙 دۆخی تاریک",
        light:"☀️ دۆخی ڕووناک",
        total:"کۆی گشتی",
        supportTitle:"📧 پەیوەندی بە پشتگیری",
        supportText:"ئەگەر هەر کێشەیەکت هەبوو، پەیوەندیمان پێوە بکە:",
        delete:"سڕینەوە"
    },

    ar:{
        title:"نظام الوصل KRD",
        add:"إضافة",
        print:"🖨️ طباعة الوصل",
        dark:"🌙 الوضع الداكن",
        light:"☀️ الوضع الفاتح",
        total:"المجموع",
        supportTitle:"📧 التواصل مع الدعم",
        supportText:"إذا واجهتك أي مشكلة، تواصل معنا:",
        delete:"حذف"
    }

};


// Dark / Light button text
function updateDarkButton() {

    const lang = language.value || "en";
    const t = translations[lang];

    if (document.body.classList.contains("dark")) {
        darkBtn.innerText = t.light;
    } else {
        darkBtn.innerText = t.dark;
    }

}


// Add Product
addBtn.onclick = function () {

    let name = document.getElementById("productName").value.trim();
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);

    if (name === "" || price <= 0 || quantity <= 0) {
        alert("Enter product information");
        return;
    }

    products.push({
        name:name,
        price:price,
        quantity:quantity,
        total:price * quantity
    });

    showProducts();

    document.getElementById("productName").value="";
    document.getElementById("price").value="";
    document.getElementById("quantity").value="";

};
    // Show Products
function showProducts() {

    let table = document.getElementById("invoiceTable");
    table.innerHTML = "";

    let total = 0;

    products.forEach((item,index)=>{

        total += item.total;

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.price} IQD</td>
            <td>${item.quantity}</td>
            <td>${item.total} IQD</td>
            <td>
                <button onclick="deleteProduct(${index})">
                    ${translations[language.value].delete}
                </button>
            </td>
        </tr>
        `;

    });

    document.getElementById("total").innerText = total;

}


// Delete Product
window.deleteProduct = function(index){

    products.splice(index,1);
    showProducts();

};


// Print
printBtn.onclick = function(){

    window.print();

};


// Settings
settingsBtn.onclick = function(){

    settingsMenu.style.display =
        settingsMenu.style.display === "block"
        ? "none"
        : "block";

};


// Dark Mode
darkBtn.onclick = function(){

    document.body.classList.toggle("dark");
    updateDarkButton();

};


// Update Language
function updateLanguage(){

    const lang = language.value;
    const t = translations[lang];


    document.getElementById("title").innerText = t.title;

    addBtn.innerText = t.add;

    printBtn.innerText = t.print;

    document.getElementById("totalLabel").innerText = t.total;

    document.getElementById("supportTitle").innerText = t.supportTitle;

    document.getElementById("supportText").innerText = t.supportText;


    document.documentElement.dir =
        lang === "en" ? "ltr" : "rtl";


    updateDarkButton();

    showProducts();

}


// Change Language
language.onchange = function(){

    updateLanguage();

};


// Start
updateLanguage();


});
