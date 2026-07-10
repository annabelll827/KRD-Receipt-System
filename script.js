document.addEventListener("DOMContentLoaded", function () {

let products = [];

const addProductBtn = document.getElementById("addProductBtn");
const productsContainer = document.getElementById("productsContainer");
const discountInput = document.getElementById("discount");
const grandTotal = document.getElementById("grandTotal");


// زیادکردنی کاڵا

addProductBtn.onclick = function () {

    let paymentID = Date.now();

    let card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `

    <button class="delete-btn">🗑️</button>

    <input class="product-name" placeholder="ناوی کاڵا">


    <div class="payment">

        <label>
            <input type="radio" name="payment${paymentID}" value="credit">
            <span>قەرز</span>
        </label>


        <label>
            <input type="radio" name="payment${paymentID}" value="paid" checked>
            <span>پارەدراو</span>
        </label>

    </div>


    <div class="product-details">

        <input class="quantity" type="number" placeholder="ژمارە">

        <input class="price" type="number" placeholder="نرخ">

        <input class="total" type="number" placeholder="کۆی گشتی" readonly>

    </div>

    `;


    productsContainer.appendChild(card);


    let quantity = card.querySelector(".quantity");
    let price = card.querySelector(".price");
    let total = card.querySelector(".total");


    function calculate(){

        let q = Number(quantity.value) || 0;
        let p = Number(price.value) || 0;

        total.value = q * p;

        updateTotal();

    }


    quantity.oninput = calculate;
    price.oninput = calculate;


    card.querySelector(".delete-btn").onclick = function(){

        card.remove();

        updateTotal();

    };


};


// حسابکردنی کۆی گشتی

function updateTotal(){

    let sum = 0;


    document.querySelectorAll(".total").forEach(item => {

        sum += Number(item.value) || 0;

    });


    let discount = Number(discountInput.value) || 0;


    sum = sum - discount;


    if(sum < 0){
        sum = 0;
    }


    grandTotal.innerText = sum;

}


discountInput.oninput = updateTotal;



// دروستکردنی وەسڵ

document.getElementById("createReceipt").onclick = function(){

    window.print();

};


});
