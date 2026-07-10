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
                <input class="quantity" type="number" placeholder="ژمارە">
                <input class="price" type="number" placeholder="نرخ">
                <input class="total" readonly placeholder="کۆی گشتی">
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

        product.querySelector(".delete-btn").addEventListener("click", function () {
            product.remove();
            calculateTotal();
        });

    });
        // حسابکردنی کۆی گشتی
    function calculateTotal() {

        let total = 0;

        document.querySelectorAll(".total").forEach(function (item) {
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

    // چاپی وەسڵ
    createReceiptBtn.addEventListener("click", function () {
        window.print();
    });

});
