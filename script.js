let products = [];

const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");


// Add Product
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


    document.getElementById("productName").value="";
    document.getElementById("price").value="";
    document.getElementById("quantity").value="";

};



// Show Products
function showProducts(){

    const table = document.getElementById("invoiceTable");

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




// Delete Product
function deleteProduct(index){

    products.splice(index,1);

    showProducts();

}




// Print
printBtn.onclick = function(){

    window.print();

};





// Settings
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");


settingsBtn.onclick = function(){

    if(settingsMenu.style.display === "block"){

        settingsMenu.style.display="none";

    }else{

        settingsMenu.style.display="block";

    }

};




// Dark Mode
const darkBtn = document.getElementById("darkBtn");


darkBtn.onclick = function(){

    document.body.classList.toggle("dark");

};




// Language
const language = document.getElementById("language");


language.onchange = function(){


    if(this.value === "ku"){

        document.documentElement.dir="rtl";

    }


    if(this.value === "ar"){

        document.documentElement.dir="rtl";

    }


    if(this.value === "en"){

        document.documentElement.dir="ltr";

    }

};
