let products = [];


const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");



addBtn.addEventListener("click", function(){

    let name = document.getElementById("productName").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);


    if(name === "" || price <= 0 || quantity <= 0){

        alert("Please fill product information");
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


});




function showProducts(){

    let table = document.getElementById("invoiceTable");

    table.innerHTML="";


    let total = 0;



    products.forEach(function(product,index){


        total += product.total;


        table.innerHTML += `

        <tr>

        <td>${product.name}</td>

        <td>$${product.price}</td>

        <td>${product.quantity}</td>

        <td>$${product.total}</td>

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




function deleteProduct(index){

    products.splice(index,1);

    showProducts();

}





// Print

printBtn.addEventListener("click",function(){

    window.print();

});






// Settings Menu

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");


settingsBtn.addEventListener("click",function(){

    if(settingsMenu.style.display === "block"){

        settingsMenu.style.display="none";

    }else{

        settingsMenu.style.display="block";

    }

});





// Dark Mode

const darkBtn = document.getElementById("darkBtn");


darkBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

});





// Language

const language = document.getElementById("language");


language.addEventListener("change",function(){


    if(this.value === "ku"){

        document.documentElement.dir="rtl";
        alert("زمان گۆڕدرا بۆ کوردی");

    }


    if(this.value === "ar"){

        document.documentElement.dir="rtl";
        alert("تم تغيير اللغة إلى العربية");

    }


    if(this.value === "en"){

        document.documentElement.dir="ltr";
        alert("Language changed to English");

    }


});
