document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Elements
    // ==========================
    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");

    const receiptNumber = document.getElementById("receiptNumber");
    const receiptDate = document.getElementById("receiptDate");

    const notes = document.getElementById("notes");
    const discount = document.getElementById("discount");

    const addProductBtn = document.getElementById("addProductBtn");
    const createReceipt = document.getElementById("createReceipt");
    const historyBtn = document.getElementById("historyBtn");

    const productsContainer = document.getElementById("productsContainer");
    const grandTotal = document.getElementById("grandTotal");

    const paidHistory = document.getElementById("paidHistory");
    const debtHistory = document.getElementById("debtHistory");
    const historyModal = document.getElementById("historyModal");

    // ==========================
    // Variables
    // ==========================
    let products = [];

    let receiptHistory =
        JSON.parse(localStorage.getItem("receiptHistory")) || [];

    // ==========================
    // Today Date
    // ==========================
    if (receiptDate && receiptDate.value === "") {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        receiptDate.value = `${year}/${month}/${day}`;

    }

    // ==========================
    // Auto Receipt Number
    // ==========================
    if (receiptNumber && receiptNumber.value === "") {

        receiptNumber.value = Date.now();

    }
        // ==========================
    // Add Product Row
    // ==========================
    function addProductRow(name = "", price = "", qty = 1) {

        const row = document.createElement("div");
        row.className = "product-row";

        row.innerHTML = `
            <input type="text" class="product-name"
                placeholder="ناوی کاڵا" value="${name}">

            <input type="number" class="product-price"
                placeholder="نرخ" value="${price}">

            <input type="number" class="product-qty"
                placeholder="ژمارە" min="1" value="${qty}">

            <span class="product-total">0 IQD</span>

            <button type="button" class="delete-product">
                ❌
            </button>
        `;

        productsContainer.appendChild(row);

        const nameInput = row.querySelector(".product-name");
        const priceInput = row.querySelector(".product-price");
        const qtyInput = row.querySelector(".product-qty");
        const totalSpan = row.querySelector(".product-total");
        const deleteBtn = row.querySelector(".delete-product");

        function updateRowTotal() {

            const price = Number(priceInput.value) || 0;
            const qty = Number(qtyInput.value) || 0;

            totalSpan.textContent =
                (price * qty).toLocaleString() + " IQD";

            updateGrandTotal();
        }

        priceInput.addEventListener("input", updateRowTotal);
        qtyInput.addEventListener("input", updateRowTotal);

        deleteBtn.addEventListener("click", () => {
            row.remove();
            updateGrandTotal();
        });

        updateRowTotal();
    }

    // ==========================
    // Add New Product
    // ==========================
    if (addProductBtn) {

        addProductBtn.addEventListener("click", () => {

            addProductRow();

        });

    }
        // ==========================
    // Update Grand Total
    // ==========================
    function updateGrandTotal() {

        let total = 0;

        document.querySelectorAll(".product-row").forEach(row => {

            const price = Number(
                row.querySelector(".product-price").value
            ) || 0;

            const qty = Number(
                row.querySelector(".product-qty").value
            ) || 0;

            total += price * qty;

        });

        const discountValue = Number(discount.value) || 0;

        total -= discountValue;

        if (total < 0) total = 0;

        grandTotal.textContent = total.toLocaleString();
    }

    // ==========================
    // Discount Change
    // ==========================
    if (discount) {

        discount.addEventListener("input", () => {

            updateGrandTotal();

        });

    }

    // ==========================
    // First Product Row
    // ==========================
    if (productsContainer.children.length === 0) {

        addProductRow();

    }
        // ==========================
    // Create Receipt
    // ==========================
    if (createReceipt) {

        createReceipt.addEventListener("click", () => {

            const items = [];

            document.querySelectorAll(".product-row").forEach(row => {

                const name = row.querySelector(".product-name").value.trim();
                const price = Number(row.querySelector(".product-price").value) || 0;
                const qty = Number(row.querySelector(".product-qty").value) || 0;

                if (name !== "" && price > 0 && qty > 0) {

                    items.push({
                        name,
                        price,
                        qty,
                        total: price * qty
                    });

                }

            });

            if (items.length === 0) {
                alert("تکایە لانیکەم یەک کاڵا زیاد بکە.");
                return;
            }

            const receipt = {
                id: receiptNumber.value,
                date: receiptDate.value,
                customer: customerName.value.trim(),
                phone: customerPhone.value.trim(),
                notes: notes.value.trim(),
                discount: Number(discount.value) || 0,
                grandTotal: Number(
                    grandTotal.textContent.replace(/,/g, "")
                ) || 0,
                status: "paid",
                items
            };

            receiptHistory.push(receipt);

            localStorage.setItem(
                "receiptHistory",
                JSON.stringify(receiptHistory)
            );

            window.print();

        });

    }
        // ==========================
    // Show Receipt History
    // ==========================
    function renderHistory() {

        if (paidHistory) paidHistory.innerHTML = "";
        if (debtHistory) debtHistory.innerHTML = "";

        receiptHistory.forEach((receipt, index) => {

            const item = document.createElement("div");
            item.className = "history-item";

            item.innerHTML = `
                <strong>#${receipt.id}</strong><br>
                👤 ${receipt.customer || "-"}<br>
                📅 ${receipt.date}<br>
                💰 ${Number(receipt.grandTotal).toLocaleString()} IQD
                <br><br>

                <button class="view-receipt" data-index="${index}">
                    👁️ بینین
                </button>

                <button class="delete-receipt" data-index="${index}">
                    🗑️ سڕینەوە
                </button>

                <hr>
            `;

            if (receipt.status === "debt") {
                debtHistory.appendChild(item);
            } else {
                paidHistory.appendChild(item);
            }

        });

        addHistoryEvents();
    }

    // ==========================
    // Open History
    // ==========================
    if (historyBtn) {

        historyBtn.addEventListener("click", () => {

            renderHistory();

            historyModal.style.display = "block";

        });

    }

    // ==========================
    // Close History
    // ==========================
    window.closeHistory = function () {

        historyModal.style.display = "none";

    };
        // ==========================
    // History Buttons
    // ==========================
    function addHistoryEvents() {

        // View Receipt
        document.querySelectorAll(".view-receipt").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);
                const receipt = receiptHistory[index];

                let message =
                    `ژمارەی وەسڵ: ${receipt.id}\n` +
                    `کڕیار: ${receipt.customer || "-"}\n` +
                    `مۆبایل: ${receipt.phone || "-"}\n` +
                    `بەروار: ${receipt.date}\n\n`;

                receipt.items.forEach(item => {
                    message +=
                        `${item.name} | ${item.qty} × ${item.price.toLocaleString()} = ${item.total.toLocaleString()} IQD\n`;
                });

                message +=
                    `\nداشکاندن: ${receipt.discount.toLocaleString()} IQD`;
                message +=
                    `\nکۆی گشتی: ${receipt.grandTotal.toLocaleString()} IQD`;

                alert(message);

            });

        });

        // Delete Receipt
        document.querySelectorAll(".delete-receipt").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                if (!confirm("دڵنیایت لە سڕینەوەی ئەم وەسڵە؟")) {
                    return;
                }

                receiptHistory.splice(index, 1);

                localStorage.setItem(
                    "receiptHistory",
                    JSON.stringify(receiptHistory)
                );

                renderHistory();

            });

        });

    }
        // ==========================
    // Save Form Data
    // ==========================
    function saveForm() {

        const formData = {
            customerName: customerName.value,
            customerPhone: customerPhone.value,
            receiptNumber: receiptNumber.value,
            receiptDate: receiptDate.value,
            notes: notes.value,
            discount: discount.value
        };

        localStorage.setItem(
            "currentReceipt",
            JSON.stringify(formData)
        );

    }

    // ==========================
    // Load Form Data
    // ==========================
    function loadForm() {

        const data = JSON.parse(
            localStorage.getItem("currentReceipt")
        );

        if (!data) return;

        customerName.value = data.customerName || "";
        customerPhone.value = data.customerPhone || "";
        receiptNumber.value = data.receiptNumber || receiptNumber.value;
        receiptDate.value = data.receiptDate || receiptDate.value;
        notes.value = data.notes || "";
        discount.value = data.discount || "";

        updateGrandTotal();

    }

    // ==========================
    // Auto Save
    // ==========================
    [
        customerName,
        customerPhone,
        receiptNumber,
        receiptDate,
        notes,
        discount
    ].forEach(input => {

        if (!input) return;

        input.addEventListener("input", saveForm);

    });

    // ==========================
    // Load on Start
    // ==========================
    loadForm();
        // ==========================
    // Go Dashboard
    // ==========================
    window.goDashboard = function () {
        window.location.href = "dashboard.html";
    };

    // ==========================
    // Refresh Totals
    // ==========================
    updateGrandTotal();

    // ==========================
    // Close History When Clicking Outside
    // ==========================
    window.addEventListener("click", (e) => {
        if (e.target === historyModal) {
            historyModal.style.display = "none";
        }
    });

    // ==========================
    // Save Before Leaving Page
    // ==========================
    window.addEventListener("beforeunload", saveForm);

    // ==========================
    // End of Script
    // ==========================
});
