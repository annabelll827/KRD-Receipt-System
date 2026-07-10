document.addEventListener("DOMContentLoaded", function () {

    let products = [];

    const addBtn = document.getElementById("addBtn");
    const printBtn = document.getElementById("printBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsMenu = document.getElementById("settingsMenu");
    const darkBtn = document.getElementById("darkBtn");
    const language = document.getElementById("language");


    // Add Product
    addBtn.addEventListener("click", function () {

        let name = document.getElementById("productName").value;
        let price = Number(document.getElementById("price").value);
        let quantity = Number(document.getElementById("quantity").value);


        if (name === "" || price <= 0 || quantity <= 0) {
            alert("Please enter product information");
            return;
        }


        products.push({
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        });


        showProducts();


        document.getElementById("productName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";

    });



    // Show Products
    function showProducts() {

        let table = document.getElementById("invoiceTable");

        table.innerHTML = "";

        let total = 0;


        products.forEach(function (item, index) {

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
    window.deleteProduct = function (index) {

        products.splice(index, 1);

        showProducts();

    };



    // Print Receipt
    printBtn.addEventListener("click", function () {

        window.print();

    });



    // Settings Menu
    settingsBtn.addEventListener("click", function () {

        if (settingsMenu.style.display === "block") {
            settingsMenu.style.display = "none";
        } else {
            settingsMenu.style.display = "block";
        }

    });



    // Dark Mode
    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark");

    });



    // Language Direction
    language.addEventListener("change", function () {

        if (this.value === "en") {

            document.documentElement.dir = "ltr";

        } else {

            document.documentElement.dir = "rtl";

        }

    });


});
