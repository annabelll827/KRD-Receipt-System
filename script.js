document.addEventListener("DOMContentLoaded", function () {

    // پاراستنی پەڕە
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }


    const addProductBtn = document.getElementById("addProductBtn");
    const productsContainer = document.getElementById("productsContainer");
    const discountInput = document.getElementById("discount");
    const grandTotal = document.getElementById("grandTotal");
    const createReceiptBtn = document.getElementById("createReceipt");


    // زیادکردنی کاڵا
    addProductBtn.addEventListener("click", function () {

        const id = Date.now();

        const product = document.createElement("div");
        product.className = "product-card";


        product.innerHTML = `
            <button class="delete-btn">🗑️</button>

            <input class="product-name" placeholder="ناوی کاڵا">


            <div class="payment">
                <label>
                    <input type="radio" name="pay${id}" checked>
                    پارەدراو
                </label>

                <label>
                    <input type="radio" name="pay${id}">
                    قەرز
                </label>
            </div>


            <div class="product-details">

                <input class="quantity" 
                       type="number" 
                       placeholder="ژمارە">


                <input class="price" 
                       type="number" 
                       placeholder="نرخ">


                <input class="total" 
                       readonly 
                       placeholder="کۆی گشتی">

            </div>
        `;


        productsContainer.appendChild(product);


        const quantity = product.querySelector(".quantity");
        const price = product.querySelector(".price");
        const total = product.querySelector(".total");



        function calculateProduct() {

            let q = Number(quantity.value) || 0;
            let p = Number(price.value) || 0;


            total.value = q * p;

            calculateTotal();

        }



        quantity.addEventListener("input", calculateProduct);

        price.addEventListener("input", calculateProduct);



        product.querySelector(".delete-btn")
        .addEventListener("click", function () {

            product.remove();

            calculateTotal();

        });


    });



    // حسابکردنی کۆی گشتی
    function calculateTotal() {


        let total = 0;


        document.querySelectorAll(".total")
        .forEach(function (item) {

            total += Number(item.value) || 0;

        });



        let discount = Number(discountInput.value) || 0;


        total -= discount;



        if (total < 0) {
            total = 0;
        }



        grandTotal.innerText = total;


    }
       // گۆڕینی داشکاندن
    discountInput.addEventListener("input", calculateTotal);



    // چاپی وەسڵ + پاشەکەوتکردن
    createReceiptBtn.addEventListener("click", function () {

        saveReceiptHistory();

        window.print();

    });



    // کۆتایی DOMContentLoaded
});
const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const historyList = document.getElementById("historyList");


// کردنەوەی مێژووی وەسڵ
if (historyBtn) {

    historyBtn.addEventListener("click", function () {

        showHistory();

    });

}


// پاشەکەوتکردنی وەسڵ
function saveReceiptHistory() {

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];


    let receipt = {

        date: new Date().toLocaleString(),

        total: document.getElementById("grandTotal").innerText

    };


    receipts.push(receipt);


    localStorage.setItem(
        "receipts",
        JSON.stringify(receipts)
    );

}



// پیشاندانی مێژووی وەسڵ
function showHistory() {


    if (!historyModal || !historyList) return;


    historyModal.style.display = "flex";


    let receipts =
    JSON.parse(localStorage.getItem("receipts")) || [];



    historyList.innerHTML = "";



    if (receipts.length === 0) {

        historyList.innerHTML =
        "<p>هیچ وەسڵێک نییە</p>";

        return;

    }



    receipts.forEach(function (receipt, index) {


        historyList.innerHTML += `

        <div class="receipt-card">

            <h3>
                وەسڵ #${index + 1}
            </h3>


            <p>
                📅 ${receipt.date}
            </p>


            <p>
                💰 ${receipt.total} IQD
            </p>


            <button onclick="deleteReceipt(${index})">
                🗑️ سڕینەوە
            </button>


        </div>

        `;


    });


}



// داخستنی مێژوو
function closeHistory() {

    historyModal.style.display = "none";

}



// سڕینەوەی وەسڵ
function deleteReceipt(index) {


    let receipts =
    JSON.parse(localStorage.getItem("receipts")) || [];



    receipts.splice(index, 1);



    localStorage.setItem(
        "receipts",
        JSON.stringify(receipts)
    );



    showHistory();

}
