let products = [];

const addBtn = document.getElementById("addBtn");
const printBtn = document.getElementById("printBtn");


addBtn.addEventListener("click", function(){

    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);


    if(name === "" || price <= 0 || quantity <= 0){
        alert("Please fill all product fields");
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
                <button onclick="removeProduct(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });


    document.getElementById("total").innerText = total;

}



function removeProduct(index){

    products.splice(index,1);

    showProducts();

}



printBtn.addEventListener("click", function(){

    window.print();

});
