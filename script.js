/* ==========================
   Dashboard
========================== */

if(dashboardBtn){

dashboardBtn.addEventListener("click",()=>{

window.location.href = "dashboard.html";

});

}

/* ==========================
   Settings Menu
========================== */

if(settingsBtn){

settingsBtn.addEventListener("click",()=>{

settingsMenu.style.display =
settingsMenu.style.display === "block"
? "none"
: "block";

});

}

/* ==========================
   Close Settings Outside
========================== */

document.addEventListener("click",(e)=>{

if(
settingsBtn &&
settingsMenu &&
!settingsBtn.contains(e.target) &&
!settingsMenu.contains(e.target)
){

settingsMenu.style.display = "none";

}

});

/* ==========================
   Dark Mode
========================== */

if(localStorage.getItem("darkMode") === "true"){

document.body.classList.add("dark");

if(darkModeBtn){
darkModeBtn.textContent = "☀️ Light Mode";
}

}

if(darkModeBtn){

darkModeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const active =
document.body.classList.contains("dark");

localStorage.setItem("darkMode",active);

darkModeBtn.textContent =
active
? "☀️ Light Mode"
: "🌙 Dark Mode";

});

}

/* ==========================
   Language
========================== */

const translations = {

ku:{
title:"KRD Receipt System",
add:"➕ زیادکردنی کاڵا",
create:"🖨️ دروستکردنی وەسڵ"
},

ar:{
title:"نظام الوصل KRD",
add:"➕ إضافة منتج",
create:"🖨️ إنشاء الوصل"
},

en:{
title:"KRD Receipt System",
add:"➕ Add Product",
create:"🖨️ Create Receipt"
}

};

function changeLanguage(lang){

if(!translations[lang]) return;

document.title = translations[lang].title;

if(addProductBtn){
addProductBtn.textContent = translations[lang].add;
}

if(createReceipt){
createReceipt.textContent = translations[lang].create;
}

localStorage.setItem("language",lang);

}

if(language){

const savedLanguage =
localStorage.getItem("language") || "ku";

language.value = savedLanguage;

changeLanguage(savedLanguage);

language.addEventListener("change",()=>{

changeLanguage(language.value);

});

}

/* ==========================
   Report Button
========================== */

if(reportBtn){

reportBtn.addEventListener("click",()=>{

window.location.href =
"mailto:krdreceiptsystem@gmail.com?subject=KRD Receipt System Report";

});

}

/* ==========================
   Close History Outside
========================== */

window.addEventListener("click",(e)=>{

if(e.target === historyModal){

historyModal.style.display = "none";

}

});

/* ==========================
   Escape Close
========================== */

document.addEventListener("keydown",(e)=>{

if(e.key === "Escape"){

historyModal.style.display = "none";

if(settingsMenu){
settingsMenu.style.display = "none";
}

}

});

/* ==========================
   Global Print
========================== */

window.printReceipt = function(id){

const receipt =
receipts.find(r => r.id === id);

if(receipt){

printReceipt(receipt);

}

};

/* ==========================
   Date Check
========================== */

if(receiptDate){

receiptDate.addEventListener("change",()=>{

if(receiptDate.value.trim() === ""){

alert("تکایە بەروار بنووسە.");

}

});

}

/* ==========================
   Initial Update
========================== */

updateGrandTotal();

/* ==========================
   End KRD Receipt System
========================== */

});
