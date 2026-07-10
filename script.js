let products = [];
let totalAmount = 0;


function addProduct(){

    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);


    if(name === "" || price <= 0 || quantity <= 0){
        alert("Please enter product name, price and quantity");
        return;
    }


    const product = {
        name: name,
        price: price,
        quantity: quantity,
        total: price * quantity
    };


    products.push(product);

    displayProducts();


    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";

}



function displayProducts(){

    const table = document.getElementById("invoiceTable");

    table.innerHTML = "";

    totalAmount = 0;


    products.forEach((item,index)=>{

        totalAmount += item.total;


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


    document.getElementById("total").innerText = totalAmount;

}



function deleteProduct(index){

    products.splice(index,1);

    displayProducts();

}



function printInvoice(){

    window.print();

}
document.getElementById("printBtn").addEventListener("click", function(){
    window.print();
});
const printButton = document.getElementById("printBtn");

if(printButton){
    printButton.addEventListener("click", function(){
        window.print();
    });
}
