document.addEventListener("DOMContentLoaded",()=>{


const language=document.getElementById("language");


const text={

en:{
title:"KRD Receipt System",
customer:"Customer",
add:"Add",
print:"🖨️ Print Receipt",
product:"Product",
price:"Price",
qty:"Qty"
},


ku:{
title:"سیستەمی وەسڵی KRD",
customer:"کڕیار",
add:"زیادکردن",
print:"🖨️ چاپکردنی وەسڵ",
product:"کاڵا",
price:"نرخ",
qty:"ژمارە"
},


ar:{
title:"نظام الوصل KRD",
customer:"الزبون",
add:"إضافة",
print:"🖨️ طباعة الوصل",
product:"المنتج",
price:"السعر",
qty:"الكمية"
}


};



language.onchange=function(){


let lang=this.value;

let t=text[lang];


document.getElementById("title").innerText=t.title;

document.getElementById("customerText").innerText=t.customer;

document.getElementById("customer").placeholder=t.customer;

document.getElementById("addBtn").innerText=t.add;

document.getElementById("printBtn").innerText=t.print;

document.getElementById("pText").innerText=t.product;

document.getElementById("prText").innerText=t.price;

document.getElementById("qText").innerText=t.qty;


if(lang==="en"){

document.documentElement.dir="ltr";

}else{

document.documentElement.dir="rtl";

}


};



// settings

document.getElementById("settingsBtn").onclick=function(){

let menu=document.getElementById("settingsMenu");

menu.style.display =
menu.style.display==="block" ? "none":"block";

};



// dark

document.getElementById("darkBtn").onclick=function(){

document.body.classList.toggle("dark");

};



// print

document.getElementById("printBtn").onclick=function(){

window.print();

};


});
