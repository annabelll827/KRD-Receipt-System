document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Elements
    // ==========================

    const dashboardBtn = document.getElementById("dashboardBtn");
    const historyBtn = document.getElementById("historyBtn");
    const settingsBtn = document.getElementById("settingsBtn");

    const settingsMenu = document.getElementById("settingsMenu");
    const language = document.getElementById("language");
    const darkModeBtn = document.getElementById("darkModeBtn");

    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");

    const receiptNumber = document.getElementById("receiptNumber");
    const receiptDate = document.getElementById("receiptDate");

    const notes = document.getElementById("notes");
    const discount = document.getElementById("discount");

    const addProductBtn = document.getElementById("addProductBtn");
    const productsContainer = document.getElementById("productsContainer");

    const grandTotal = document.getElementById("grandTotal");

    const createReceipt = document.getElementById("createReceipt");
    const clearReceipt = document.getElementById("clearReceipt");

    const historyModal = document.getElementById("historyModal");
    const closeHistoryBtn = document.getElementById("closeHistoryBtn");

    const paidHistory = document.getElementById("paidHistory");
    const debtHistory = document.getElementById("debtHistory");

    const searchReceipt = document.getElementById("searchReceipt");
    const reportBtn = document.getElementById("reportBtn");


    // ==========================
    // Data
    // ==========================

    let receipts =
        JSON.parse(localStorage.getItem("receipts")) || [];


    // ==========================
    // Date
    // ==========================

    if(receiptDate){

        const today = new Date();

        receiptDate.value =
            today.toISOString().split("T")[0];

    }


    // ==========================
    // Receipt Number
    // ==========================

    if(receiptNumber){

        receiptNumber.value =
            "KRD-" + Date.now();

    }
        // ==========================
    // Add Product Row
    // ==========================

    function addProductRow(){

        const row = document.createElement("div");

        row.className = "product-row";


row.innerHTML = `

<input 
class="product-name"
type="text"
placeholder="ناوی کاڵا">


<div class="product-details">

<input 
class="product-qty"
type="number"
min="1"
value="1"
placeholder="ژمارەی کاڵا">


<input 
class="product-price"
type="number"
placeholder="نرخ">


<input 
class="product-total"
type="text"
readonly
placeholder="کۆی گشتی">

</div>


<button 
class="delete-product"
type="button">
❌
</button>

`;


        productsContainer.appendChild(row);



        const price =
        row.querySelector(".product-price");


        const qty =
        row.querySelector(".product-qty");


        const total =
        row.querySelector(".product-total");



        function updateRowTotal(){

            const p =
            Number(price.value) || 0;


            const q =
            Number(qty.value) || 0;


            total.textContent =
            (p * q).toLocaleString() + " IQD";


            updateGrandTotal();

        }



        price.addEventListener(
            "input",
            updateRowTotal
        );


        qty.addEventListener(
            "input",
            updateRowTotal
        );



        row.querySelector(".delete-product")
        .addEventListener(
            "click",
            ()=>{

                row.remove();

                updateGrandTotal();

            }
        );


    }





    // ==========================
    // Add Product Button
    // ==========================

    if(addProductBtn){

        addProductBtn.addEventListener(
            "click",
            ()=>{

                addProductRow();

            }
        );

    }





    // ==========================
    // Calculate Total
    // ==========================

    function updateGrandTotal(){

        let total = 0;



        document
        .querySelectorAll(".product-row")
        .forEach(row=>{


            const price =
            Number(
                row.querySelector(".product-price").value
            ) || 0;



            const qty =
            Number(
                row.querySelector(".product-qty").value
            ) || 0;



            total += price * qty;


        });



        const discountValue =
        Number(discount.value) || 0;



        total -= discountValue;



        if(total < 0){

            total = 0;

        }



        if(grandTotal){

            grandTotal.textContent =
            total.toLocaleString();

        }


    }





    // ==========================
    // Discount
    // ==========================

    if(discount){

        discount.addEventListener(
            "input",
            updateGrandTotal
        );

    }



    // First Product

    addProductRow();
                    // ==========================
    // Create Receipt
    // ==========================

    if(createReceipt){

        createReceipt.addEventListener(
            "click",
            ()=>{


                let items = [];



                document
                .querySelectorAll(".product-row")
                .forEach(row=>{


                    const name =
                    row.querySelector(".product-name")
                    .value.trim();



                    const price =
                    Number(
                        row.querySelector(".product-price").value
                    ) || 0;



                    const qty =
                    Number(
                        row.querySelector(".product-qty").value
                    ) || 0;



                    if(
                        name &&
                        price > 0 &&
                        qty > 0
                    ){

                        items.push({

                            name,
                            price,
                            qty,
                            total: price * qty

                        });

                    }


                });




                if(items.length === 0){

                    alert(
                        "تکایە لانیکەم یەک کاڵا زیاد بکە"
                    );

                    return;

                }




                const payment =
                document.querySelector(
                    'input[name="paymentStatus"]:checked'
                )?.value || "paid";





                const receipt = {


                    id:
                    receiptNumber.value,


                    date:
                    receiptDate.value,


                    customer:
                    customerName.value.trim(),


                    phone:
                    customerPhone.value.trim(),


                    notes:
                    notes.value.trim(),


                    discount:
                    Number(discount.value) || 0,



                    total:
                    Number(
                        grandTotal.textContent
                        .replace(/,/g,"")
                    ) || 0,



                    payment,


                    items


                };





                receipts.push(receipt);



                localStorage.setItem(
                    "receipts",
                    JSON.stringify(receipts)
                );



                createPrint(receipt);



            }
        );

    }






    // ==========================
    // Print Receipt
    // ==========================

    function createPrint(receipt){


        const printWindow =
        window.open(
            "",
            "",
            "width=400,height=600"
        );



        let productsHTML = "";



        receipt.items.forEach(item=>{


            productsHTML += `

            <tr>

                <td>
                ${item.name}
                </td>


                <td>
                ${item.qty}
                </td>


                <td>
                ${item.total.toLocaleString()}
                </td>


            </tr>

            `;


        });




        printWindow.document.write(`

        <html lang="ku" dir="rtl">

        <head>

        <title>KRD Receipt</title>


        <style>

        body{

            font-family: Arial;
            text-align:center;
            padding:20px;

        }


        table{

            width:100%;
            border-collapse:collapse;

        }


        td,th{

            border-bottom:1px solid #ccc;
            padding:8px;

        }


        h2{

            margin:10px;

        }


        </style>


        </head>



        <body>


        <h2>
        KRD Receipt System
        </h2>


        <p>
        ژمارەی وەسڵ:
        ${receipt.id}
        </p>


        <p>
        کڕیار:
        ${receipt.customer || "-"}
        </p>


        <p>
        بەروار:
        ${receipt.date}
        </p>



        <hr>



        <table>


        <tr>

            <th>
            کاڵا
            </th>

            <th>
            ژمارە
            </th>

            <th>
            کۆ
            </th>

        </tr>


        ${productsHTML}


        </table>



        <hr>



        <h3>

        داشکاندن:
        ${receipt.discount.toLocaleString()}
        IQD

        </h3>



        <h2>

        کۆی گشتی:
        ${receipt.total.toLocaleString()}
        IQD

        </h2>



        <p>
        ${receipt.notes || ""}
        </p>


        </body>


        </html>

        `);



        printWindow.document.close();


        printWindow.print();


    }
        // ==========================
    // History Render
    // ==========================

    function renderHistory(search = ""){


        if(paidHistory){
            paidHistory.innerHTML = "";
        }


        if(debtHistory){
            debtHistory.innerHTML = "";
        }



        receipts
        .filter(receipt=>{


            const customer =
            (receipt.customer || "")
            .toLowerCase();


            const id =
            (receipt.id || "")
            .toLowerCase();



            return (
                customer.includes(
                    search.toLowerCase()
                )
                ||
                id.includes(
                    search.toLowerCase()
                )
            );


        })
        .forEach((receipt,index)=>{


            const card =
            document.createElement("div");


            card.className =
            "history-card";



            card.innerHTML = `

                <h3>
                🧾 ${receipt.id}
                </h3>


                <p>
                👤 ${receipt.customer || "-"}
                </p>


                <p>
                📅 ${receipt.date}
                </p>


                <p>
                💰 
                ${receipt.total.toLocaleString()}
                IQD
                </p>


                <p>
                ${
                    receipt.payment === "debt"
                    ?
                    "📒 قەرز"
                    :
                    "✅ پارەدراو"
                }
                </p>



                <button class="view-receipt">
                    👁️ بینین
                </button>


                <button class="delete-receipt">
                    🗑️ سڕینەوە
                </button>

                <hr>

            `;




            if(receipt.payment === "debt"){

                if(debtHistory){
                    debtHistory.appendChild(card);
                }


            }else{


                if(paidHistory){
                    paidHistory.appendChild(card);
                }


            }





            // View

            card
            .querySelector(".view-receipt")
            .addEventListener(
                "click",
                ()=>{


                    createPrint(receipt);


                }
            );





            // Delete

            card
            .querySelector(".delete-receipt")
            .addEventListener(
                "click",
                ()=>{


                    if(
                        confirm(
                        "دڵنیایت لە سڕینەوەی ئەم وەسڵە؟"
                        )
                    ){


                        receipts.splice(
                            index,
                            1
                        );



                        localStorage.setItem(
                            "receipts",
                            JSON.stringify(receipts)
                        );



                        renderHistory();


                    }


                }
            );



        });



    }





    // ==========================
    // Open History
    // ==========================

    if(historyBtn){

        historyBtn.addEventListener(
            "click",
            ()=>{


                renderHistory();


                if(historyModal){

                    historyModal.style.display =
                    "flex";

                }


            }
        );

    }





    // ==========================
    // Close History
    // ==========================

    if(closeHistoryBtn){

        closeHistoryBtn.addEventListener(
            "click",
            ()=>{


                historyModal.style.display =
                "none";


            }
        );

    }
        // ==========================
    // Search History
    // ==========================

    if(searchReceipt){

        searchReceipt.addEventListener(
            "input",
            ()=>{


                renderHistory(
                    searchReceipt.value
                );


            }
        );

    }





    // ==========================
    // Clear Receipt
    // ==========================

    if(clearReceipt){

        clearReceipt.addEventListener(
            "click",
            ()=>{


                const confirmClear =
                confirm(
                    "دڵنیایت لە سڕینەوەی زانیارییەکان؟"
                );



                if(!confirmClear){

                    return;

                }




                customerName.value = "";

                customerPhone.value = "";


                receiptNumber.value =
                "KRD-" + Date.now();



                notes.value = "";


                discount.value = 0;



                productsContainer.innerHTML = "";



                addProductRow();



                updateGrandTotal();



            }
        );

    }





    // ==========================
    // Dashboard Button
    // ==========================

    if(dashboardBtn){

        dashboardBtn.addEventListener(
            "click",
            ()=>{


                window.location.href =
                "dashboard.html";


            }
        );

    }





    // ==========================
    // Settings Menu
    // ==========================

    if(settingsBtn){

        settingsBtn.addEventListener(
            "click",
            (e)=>{


                e.stopPropagation();


                if(
                    settingsMenu.style.display === "block"
                ){


                    settingsMenu.style.display =
                    "none";


                }else{


                    settingsMenu.style.display =
                    "block";


                }


            }
        );

    }





    // Close settings outside

    document.addEventListener(
        "click",
        (e)=>{


            if(
                settingsMenu &&
                !settingsMenu.contains(e.target) &&
                e.target !== settingsBtn
            ){


                settingsMenu.style.display =
                "none";


            }


        }
    );





    // ==========================
    // Dark Mode
    // ==========================

    let darkMode =
    localStorage.getItem("darkMode") === "true";



    if(darkMode){

        document.body.classList.add("dark");


        if(darkModeBtn){

            darkModeBtn.textContent =
            "☀️ Light Mode";

        }

    }





    if(darkModeBtn){

        darkModeBtn.addEventListener(
            "click",
            ()=>{


                document.body
                .classList
                .toggle("dark");



                darkMode =
                document.body
                .classList
                .contains("dark");



                localStorage.setItem(
                    "darkMode",
                    darkMode
                );



                darkModeBtn.textContent =
                darkMode
                ?
                "☀️ Light Mode"
                :
                "🌙 Dark Mode";


            }
        );

    }
        // ==========================
    // Language System
    // ==========================

    const translations = {

        ku: {

            title:
            "سیستەمی وەسڵی KRD",

            add:
            "➕ زیادکردنی کاڵا",

            create:
            "🖨️ دروستکردنی وەسڵ"

        },


        ar: {

            title:
            "نظام الوصل KRD",

            add:
            "➕ إضافة منتج",

            create:
            "🖨️ إنشاء الوصل"

        },


        en: {

            title:
            "KRD Receipt System",

            add:
            "➕ Add Product",

            create:
            "🖨️ Create Receipt"

        }

    };





    function changeLanguage(lang){


        if(!translations[lang]) return;



        document.title =
        translations[lang].title;



        if(addProductBtn){

            addProductBtn.textContent =
            translations[lang].add;

        }



        if(createReceipt){

            createReceipt.textContent =
            translations[lang].create;

        }



        localStorage.setItem(
            "language",
            lang
        );


    }





    if(language){

        language.addEventListener(
            "change",
            ()=>{


                changeLanguage(
                    language.value
                );


            }
        );


    }





    const savedLanguage =
    localStorage.getItem("language");



    if(savedLanguage){

        language.value =
        savedLanguage;



        changeLanguage(
            savedLanguage
        );

    }





    // ==========================
    // Auto Save Current Receipt
    // ==========================

    function saveCurrentReceipt(){


        const data = {


            customerName:
            customerName.value,


            customerPhone:
            customerPhone.value,


            notes:
            notes.value,


            discount:
            discount.value,


            products: []

        };





        document
        .querySelectorAll(".product-row")
        .forEach(row=>{


            data.products.push({


                name:
                row.querySelector(".product-name")
                .value,



                price:
                row.querySelector(".product-price")
                .value,



                qty:
                row.querySelector(".product-qty")
                .value


            });



        });





        localStorage.setItem(
            "currentReceipt",
            JSON.stringify(data)
        );


    }
        // ==========================
    // Auto Save Inputs
    // ==========================

    [
        customerName,
        customerPhone,
        notes,
        discount
    ]
    .forEach(input=>{


        if(input){

            input.addEventListener(
                "input",
                saveCurrentReceipt
            );

        }


    });





    // ==========================
    // Load Saved Receipt
    // ==========================

    function loadCurrentReceipt(){


        const data =
        JSON.parse(
            localStorage.getItem("currentReceipt")
        );



        if(!data){

            return;

        }





        customerName.value =
        data.customerName || "";



        customerPhone.value =
        data.customerPhone || "";



        notes.value =
        data.notes || "";



        discount.value =
        data.discount || 0;





        if(data.products){


            productsContainer.innerHTML = "";



            data.products.forEach(product=>{


                addProductRow();



                const rows =
                document.querySelectorAll(
                    ".product-row"
                );



                const last =
                rows[rows.length - 1];



                last.querySelector(
                    ".product-name"
                ).value =
                product.name;



                last.querySelector(
                    ".product-price"
                ).value =
                product.price;



                last.querySelector(
                    ".product-qty"
                ).value =
                product.qty;



            });


        }





        updateGrandTotal();


    }





    loadCurrentReceipt();





    // ==========================
    // Report Button
    // ==========================

    if(reportBtn){


        reportBtn.addEventListener(
            "click",
            ()=>{


                window.location.href =
                "mailto:krdreceipsystem@gmail.com?subject=KRD Receipt System Report";


            }
        );


    }





    // ==========================
    // Save Before Close
    // ==========================

    window.addEventListener(
        "beforeunload",
        ()=>{


            saveCurrentReceipt();


        }
    );
        // ==========================
    // Close Modal By Outside Click
    // ==========================

    window.addEventListener(
        "click",
        (e)=>{


            if(
                historyModal &&
                e.target === historyModal
            ){

                historyModal.style.display =
                "none";

            }


        }
    );





    // ==========================
    // Escape Key Close
    // ==========================

    document.addEventListener(
        "keydown",
        (e)=>{


            if(e.key === "Escape"){


                if(historyModal){

                    historyModal.style.display =
                    "none";

                }



                if(settingsMenu){

                    settingsMenu.style.display =
                    "none";

                }


            }


        }
    );





    // ==========================
    // Initial Update
    // ==========================

    updateGrandTotal();





    // ==========================
    // End KRD Receipt System
    // ==========================

});
