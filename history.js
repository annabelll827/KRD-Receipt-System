document.addEventListener("DOMContentLoaded", function () {

    // پاراستنی پەڕە
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const table = document.getElementById("historyTable");

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

    if (receipts.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">هیچ وەسڵێک تۆمار نەکراوە</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = "";

    receipts.forEach(function (receipt, index) {

        table.innerHTML += `
            <tr>
                <td>${receipt.number}</td>
                <td>${receipt.customer}</td>
                <td>${receipt.date}</td>
                <td>${receipt.total} IQD</td>
                <td>
                    <button class="action-btn print-btn" onclick="window.print()">🖨️</button>

                    <button class="action-btn delete-btn" onclick="deleteReceipt(${index})">🗑️</button>
                </td>
            </tr>
        `;

    });

});

function deleteReceipt(index) {

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

    receipts.splice(index, 1);

    localStorage.setItem("receipts", JSON.stringify(receipts));

    location.reload();

}
