document.addEventListener("DOMContentLoaded", function () {

    const addProductBtn = document.getElementById("addProductBtn");
    const productsContainer = document.getElementById("productsContainer");
    const discountInput = document.getElementById("discount");
    const grandTotal = document.getElementById("grandTotal");
    const createReceipt = document.getElementById("createReceipt");


    // زیادکردنی کاڵا
    addProductBtn.onclick = function () {

        let paymentID = Date.now();

        let productCard = document.createElement("div");
        productCard.className = "product-card";


        productCard.innerHTML = `

            <button class="delete-btn">🗑️</button>

            <input class="product-name" placeholder="ناوی کاڵا">


            <div class="payment">

                <label>
                    <input type="radio" name="payment${paymentID}" checked>
                    پارەدراو
                </label>

                <label>
                    <input type="radio" name="payment${paymentID}">
                    قەرز
                </label>

            </div>


            <div class="product-details">

                <input class="quantity" type="number" placeholder="ژمارە">

                <input class="price" type="number" placeholder="نرخ">

                <input class="total" type="number" placeholder="کۆی گشتی" readonly>

            </div>

        `;


        productsContainer.appendChild(productCard);



        let quantity = productCard.querySelector(".quantity");
        let price = productCard.querySelector(".price");
        let total = productCard.querySelector(".total");


        function calculateProduct(){

            let q = Number(quantity.value) || 0;
            let p = Number(price.value) || 0;

            total.value = q * p;

            calculateTotal();

        }


        quantity.oninput = calculateProduct;
        price.oninput = calculateProduct;



        // سڕینەوە
        productCard.querySelector(".delete-btn").onclick = function(){

            productCard.remove();

            calculateTotal();

        };

    });



    // کۆی گشتی
    function calculateTotal(){

        let total = 0;


        document.querySelectorAll(".total").forEach(function(item){

            total += Number(item.value) || 0;

        });


        let discount = Number(discountInput.value) || 0;


        total = total - discount;


        if(total < 0){
            total = 0;
        }


        grandTotal.innerText = total;

    }



    discountInput.oninput = calculateTotal;



    // دروستکردنی وەسڵ
    createReceipt.onclick = function(){

        window.print();

    };


});
