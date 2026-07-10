document.addEventListener("DOMContentLoaded", () => {

/* ==========================
   Elements
========================== */

const addProductBtn = document.getElementById("addProductBtn");
const productsContainer = document.getElementById("productsContainer");

const grandTotal = document.getElementById("grandTotal");
const discount = document.getElementById("discount");

const createReceipt = document.getElementById("createReceipt");
const clearReceipt = document.getElementById("clearReceipt");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const receiptNumber = document.getElementById("receiptNumber");
const receiptDate = document.getElementById("receiptDate");

const notes = document.getElementById("notes");

const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");

const paidHistory = document.getElementById("paidHistory");
const debtHistory = document.getElementById("debtHistory");

const dashboardBtn = document.getElementById("dashboardBtn");


/* ==========================
   Data
========================== */

let receipts =
JSON.parse(localStorage.getItem("receipts")) || [];



/* ==========================
   Receipt Number
========================== */

if(receiptNumber.value === ""){
    receiptNumber.value = "KRD-" + Date.now();
}



/* ==========================
   Add Product
========================== */

function addProductRow(){


const row = document.createElement("div");

row.className = "product-row";


row.innerHTML = `

<input 
class="product-name"
placeholder="ناوی کاڵا">


<div class="payment-options">

<label>
<input 
type="radio"
name="payment-${Date.now()}"
value="paid"
checked>

✅ پارەدراو
</label>


<label>
<input 
type="radio"
name="payment-${Date.now()}"
value="debt">

📒 قەرز
</label>

</div>



<input
class="product-qty"
type="number"
min="1"
value="1"
placeholder="ژمارە">



<input
class="product-price"
type="number"
placeholder="نرخ">



<span class="product-total">
0 IQD
</span>



<button 
class="delete-product"
type="button">

❌

</button>


`;


productsContainer.appendChild(row);



const price =
row.querySelector(".product-price");

const qty =
row.querySelector(".product-qty");

const total =
row.querySelector(".product-total");



function updateRow(){


const p =
Number(price.value) || 0;


const q =
Number(qty.value) || 0;



total.textContent =
(p*q).toLocaleString() + " IQD";


updateGrandTotal();


}



price.addEventListener(
"input",
updateRow
);


qty.addEventListener(
"input",
updateRow
);



row.querySelector(".delete-product")
.addEventListener("click",()=>{


row.remove();

updateGrandTotal();


});



}


addProductBtn.addEventListener(
"click",
()=>{

addProductRow();

}

);


addProductRow();
  /* ==========================
   Calculate Total
========================== */


function updateGrandTotal(){


let total = 0;



document.querySelectorAll(".product-row")
.forEach(row=>{


const price =
Number(
row.querySelector(".product-price").value
) || 0;



const qty =
Number(
row.querySelector(".product-qty").value
) || 0;



total += price * qty;



});




const discountValue =
Number(discount.value) || 0;



total -= discountValue;



if(total < 0){

total = 0;

}



grandTotal.textContent =
total.toLocaleString();



}







/* ==========================
   Discount
========================== */


discount.addEventListener(
"input",
()=>{

updateGrandTotal();

}

);







/* ==========================
   Create Receipt
========================== */


createReceipt.addEventListener(
"click",
()=>{


let items = [];





document.querySelectorAll(".product-row")
.forEach(row=>{


const name =
row.querySelector(".product-name")
.value.trim();



const price =
Number(
row.querySelector(".product-price").value
) || 0;



const qty =
Number(
row.querySelector(".product-qty").value
) || 0;



const payment =
row.querySelector(
'input[type="radio"]:checked'
).value;





if(
name &&
price > 0 &&
qty > 0
){


items.push({

name,

price,

qty,

payment,

total:
price * qty

});


}



});






if(items.length === 0){


alert(
"تکایە کاڵا زیاد بکە"
);


return;


}






const receipt = {


id:
receiptNumber.value,


date:
receiptDate.value,


customer:
customerName.value,


phone:
customerPhone.value,


notes:
notes.value,


discount:
Number(discount.value) || 0,


total:
Number(
grandTotal.textContent.replace(/,/g,"")
),


items


};





receipts.push(receipt);



localStorage.setItem(
"receipts",
JSON.stringify(receipts)
);




printReceipt(receipt);



});
    /* ==========================
   Print Receipt
========================== */


function printReceipt(receipt){


const printWindow =
window.open(
"",
"",
"width=400,height=600"
);



let rows = "";



receipt.items.forEach(item=>{


rows += `

<tr>

<td>
${item.name}
</td>


<td>
${item.qty}
</td>


<td>
${item.total.toLocaleString()}
</td>


</tr>

`;



});






printWindow.document.write(`

<html dir="rtl">

<head>

<title>
KRD Receipt
</title>


<style>

body{

font-family:Arial;

text-align:center;

}


table{

width:100%;

border-collapse:collapse;

}


td,th{

border-bottom:1px solid #ccc;

padding:8px;

}


</style>


</head>


<body>


<h2>
KRD Receipt System
</h2>



<p>
ژمارەی وەسڵ:
${receipt.id}
</p>



<p>
بەروار:
${receipt.date || "-"}
</p>



<p>
کڕیار:
${receipt.customer || "-"}
</p>



<p>
مۆبایل:
${receipt.phone || "-"}
</p>



<hr>



<table>


<tr>

<th>
کاڵا
</th>


<th>
ژمارە
</th>


<th>
کۆ
</th>


</tr>



${rows}



</table>



<h3>

کۆی گشتی:

${receipt.total.toLocaleString()}

IQD

</h3>



<p>
${receipt.notes || ""}
</p>



</body>

</html>

`);



printWindow.document.close();


printWindow.print();



}






/* ==========================
   History Open
========================== */


historyBtn.addEventListener(
"click",
()=>{


renderHistory();


historyModal.style.display =
"flex";


}

);







/* ==========================
   Close History
========================== */


closeHistoryBtn.addEventListener(
"click",
()=>{


historyModal.style.display =
"none";


}

);
    /* ==========================
   Render History
========================== */


function renderHistory(){


paidHistory.innerHTML = "";

debtHistory.innerHTML = "";




receipts.forEach((receipt,index)=>{


const box =
document.createElement("div");


box.className =
"history-card";



let hasDebt =
receipt.items.some(
item => item.payment === "debt"
);



box.innerHTML = `

<h3>
🧾 ${receipt.id}
</h3>


<p>
👤 ${receipt.customer || "-"}
</p>


<p>
📅 ${receipt.date || "-"}
</p>


<p>
💰 ${receipt.total.toLocaleString()} IQD
</p>


<button class="view-btn">

👁️ بینین

</button>



<button class="delete-btn">

🗑️ سڕینەوە

</button>


<hr>

`;





if(hasDebt){

debtHistory.appendChild(box);


}else{


paidHistory.appendChild(box);


}





box.querySelector(".view-btn")
.addEventListener(
"click",
()=>{


printReceipt(receipt);


}

);






box.querySelector(".delete-btn")
.addEventListener(
"click",
()=>{


if(
confirm("دڵنیایت لە سڕینەوەی ئەم وەسڵە؟")
){


receipts.splice(index,1);



localStorage.setItem(
"receipts",
JSON.stringify(receipts)
);



renderHistory();



}


}

);





});



}







/* ==========================
   Search Receipt
========================== */


const searchReceipt =
document.getElementById("searchReceipt");



if(searchReceipt){


searchReceipt.addEventListener(
"input",
()=>{


const value =
searchReceipt.value.toLowerCase();



paidHistory.innerHTML = "";

debtHistory.innerHTML = "";




receipts
.filter(receipt=>{


return (

receipt.id.toLowerCase()
.includes(value)


||


receipt.customer.toLowerCase()
.includes(value)


);


})
.forEach((receipt)=>{


const box =
document.createElement("div");


box.className =
"history-card";



box.innerHTML = `

<h3>
🧾 ${receipt.id}
</h3>

<p>
👤 ${receipt.customer || "-"}
</p>

<p>
💰 ${receipt.total.toLocaleString()} IQD
</p>


`;



paidHistory.appendChild(box);


});



}

);


}
    /* ==========================
   Clear Receipt
========================== */


clearReceipt.addEventListener(
"click",
()=>{


const ok =
confirm(
"دڵنیایت لە سڕینەوەی زانیارییەکان؟"
);



if(!ok){

return;

}



customerName.value = "";

customerPhone.value = "";

notes.value = "";

discount.value = 0;



receiptNumber.value =
"KRD-" + Date.now();



receiptDate.value = "";



productsContainer.innerHTML = "";



addProductRow();



updateGrandTotal();



}

);







/* ==========================
   Dashboard
========================== */


if(dashboardBtn){


dashboardBtn.addEventListener(
"click",
()=>{


window.location.href =
"dashboard.html";


}

);


}







/* ==========================
   Save Current Data
========================== */


function saveCurrentReceipt(){


const data = {


customerName:
customerName.value,


customerPhone:
customerPhone.value,


receiptNumber:
receiptNumber.value,


receiptDate:
receiptDate.value,


notes:
notes.value,


discount:
discount.value,


products: []



};






document.querySelectorAll(".product-row")
.forEach(row=>{


data.products.push({


name:
row.querySelector(".product-name").value,


qty:
row.querySelector(".product-qty").value,


price:
row.querySelector(".product-price").value,


payment:
row.querySelector(
'input[type="radio"]:checked'
).value



});



});





localStorage.setItem(
"currentReceipt",
JSON.stringify(data)
);



}






/* ==========================
   Auto Save
========================== */


[
customerName,
customerPhone,
receiptNumber,
receiptDate,
notes,
discount
]
.forEach(input=>{


if(input){


input.addEventListener(
"input",
saveCurrentReceipt
);


}


});




window.addEventListener(
"beforeunload",
saveCurrentReceipt
);
    /* ==========================
   Load Saved Receipt
========================== */


function loadCurrentReceipt(){


const data =
JSON.parse(
localStorage.getItem("currentReceipt")
);



if(!data){

return;

}




customerName.value =
data.customerName || "";



customerPhone.value =
data.customerPhone || "";



receiptNumber.value =
data.receiptNumber || 
("KRD-" + Date.now());



receiptDate.value =
data.receiptDate || "";



notes.value =
data.notes || "";



discount.value =
data.discount || 0;




productsContainer.innerHTML = "";





if(data.products && data.products.length > 0){


data.products.forEach(product=>{


addProductRow();



const rows =
document.querySelectorAll(".product-row");



const last =
rows[rows.length - 1];



last.querySelector(".product-name").value =
product.name;



last.querySelector(".product-qty").value =
product.qty;



last.querySelector(".product-price").value =
product.price;



const payment =
last.querySelectorAll(
'input[type="radio"]'
);



if(product.payment === "debt"){

payment[1].checked = true;

}else{

payment[0].checked = true;

}



});



}



updateGrandTotal();


}





loadCurrentReceipt();








/* ==========================
   Close Modal Outside
========================== */


window.addEventListener(
"click",
(e)=>{


if(e.target === historyModal){


historyModal.style.display =
"none";


}


}

);






/* ==========================
   Escape Close
========================== */


document.addEventListener(
"keydown",
(e)=>{


if(e.key === "Escape"){


historyModal.style.display =
"none";


}


}
    
);
   /* ==========================
   Settings Menu
========================== */


const settingsBtn =
document.getElementById("settingsBtn");


const settingsMenu =
document.getElementById("settingsMenu");



if(settingsBtn){


settingsBtn.addEventListener(
"click",
()=>{


if(
settingsMenu.style.display === "block"
){


settingsMenu.style.display =
"none";


}else{


settingsMenu.style.display =
"block";


}


}

);


}






/* ==========================
   Close Settings Outside
========================== */


document.addEventListener(
"click",
(e)=>{


if(
settingsBtn &&
settingsMenu &&
!settingsBtn.contains(e.target)
&&
!settingsMenu.contains(e.target)
){


settingsMenu.style.display =
"none";


}


}

);








/* ==========================
   Dark Mode
========================== */


const darkModeBtn =
document.getElementById("darkModeBtn");



let dark =
localStorage.getItem("darkMode") === "true";




if(dark){


document.body.classList.add("dark");


if(darkModeBtn){

darkModeBtn.textContent =
"☀️ Light Mode";

}


}




if(darkModeBtn){


darkModeBtn.addEventListener(
"click",
()=>{


document.body.classList.toggle("dark");



const active =
document.body.classList.contains("dark");



localStorage.setItem(
"darkMode",
active
);



darkModeBtn.textContent =
active
?
"☀️ Light Mode"
:
"🌙 Dark Mode";



}

);


}






/* ==========================
   Language System
========================== */


const language =
document.getElementById("language");



const translations = {


ku:{

title:
"سیستەمی وەسڵی KRD",

add:
"➕ زیادکردنی کاڵا",

create:
"🖨️ دروستکردنی وەسڵ"

},



ar:{

title:
"نظام الوصل KRD",

add:
"➕ إضافة منتج",

create:
"🖨️ إنشاء الوصل"

},



en:{

title:
"KRD Receipt System",

add:
"➕ Add Product",

create:
"🖨️ Create Receipt"

}


};



function changeLanguage(lang){


if(!translations[lang]){

return;

}



document.title =
translations[lang].title;



if(addProductBtn){

addProductBtn.textContent =
translations[lang].add;

}



if(createReceipt){

createReceipt.textContent =
translations[lang].create;

}



localStorage.setItem(
"language",
lang
);



}





if(language){


language.addEventListener(
"change",
()=>{


changeLanguage(
language.value
);


}

);



const savedLanguage =
localStorage.getItem("language");



if(savedLanguage){


language.value =
savedLanguage;


changeLanguage(
savedLanguage
);


}


}
    /* ==========================
   Report Button
========================== */


const reportBtn =
document.getElementById("reportBtn");


if(reportBtn){


reportBtn.addEventListener(
"click",
()=>{


window.location.href =
"mailto:krdreceipsystem@gmail.com?subject=KRD Receipt System Report";


}

);


}







/* ==========================
   Initial Update
========================== */


updateGrandTotal();







/* ==========================
   Print Function Global
========================== */


window.printReceipt = function(id){


const receipt =
receipts.find(
item => item.id === id
);



if(receipt){


printReceipt(receipt);


}


};








/* ==========================
   Date Check
========================== */


if(receiptDate){


receiptDate.addEventListener(
"change",
()=>{


if(receiptDate.value === ""){


alert(
"تکایە بەروار بنووسە"
);



}


}

);


}







/* ==========================
   Save Before Close
========================== */


window.addEventListener(
"beforeunload",
()=>{


saveCurrentReceipt();


}

);






/* ==========================
   End KRD Receipt System
========================== */


});
