document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Login Check
    // ==========================
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // ==========================
    // Elements
    // ==========================
    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productQty = document.getElementById("productQty");

    const addBtn = document.getElementById("addBtn");
    const printBtn = document.getElementById("printBtn");
    const clearBtn = document.getElementById("clearBtn");

    const productsContainer = document.getElementById("productsContainer");
    const totalElement = document.getElementById("total");

    const settingsBtn = document.getElementById("settingsBtn");
    const settingsMenu = document.getElementById("settingsMenu");

    const languageSelect = document.getElementById("language");
    const darkBtn = document.getElementById("darkBtn");

    const logoutBtn = document.getElementById("logoutBtn");

    // Dashboard
    const totalSales = document.getElementById("totalSales");
    const totalOrders = document.getElementById("totalOrders");
    const totalProducts = document.getElementById("totalProducts");

    // ==========================
    // Variables
    // ==========================
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let darkMode = localStorage.getItem("darkMode") === "true";

    let currentLanguage =
        localStorage.getItem("language") || "ku";

    // ==========================
    // Apply Dark Mode
    // ==========================
    if (darkMode) {
        document.body.classList.add("dark");
    }

    // ==========================
    // Close Settings Menu
    // ==========================
    document.addEventListener("click", (e) => {
        if (
            settingsBtn &&
            settingsMenu &&
            !settingsBtn.contains(e.target) &&
            !settingsMenu.contains(e.target)
        ) {
            settingsMenu.style.display = "none";
        }
    });

    // ==========================
    // Toggle Settings
    // ==========================
    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {

            if (settingsMenu.style.display === "block") {
                settingsMenu.style.display = "none";
            } else {
                settingsMenu.style.display = "block";
            }

        });
    }
    // ==========================
    // Languages
    // ==========================
    const translations = {

        ku: {
            title: "سیستەمی وەسڵی KRD",
            add: "زیادکردن",
            print: "🖨️ چاپکردنی وەسڵ",
            clear: "🗑️ سڕینەوە",
            total: "کۆی گشتی",
            dark: "🌙 دۆخی تاریک",
            light: "☀️ دۆخی ڕووناک",
            logout: "دەرچوون",
            name: "ناوی کاڵا",
            price: "نرخ",
            qty: "ژمارە",
            reports: "ڕاپۆرت"
        },

        en: {
            title: "KRD Receipt System",
            add: "Add",
            print: "🖨️ Print Receipt",
            clear: "🗑️ Clear",
            total: "Total",
            dark: "🌙 Dark Mode",
            light: "☀️ Light Mode",
            logout: "Logout",
            name: "Product Name",
            price: "Price",
            qty: "Quantity",
            reports: "Reports"
        },

        ar: {
            title: "نظام الوصل KRD",
            add: "إضافة",
            print: "🖨️ طباعة الوصل",
            clear: "🗑️ مسح",
            total: "المجموع",
            dark: "🌙 الوضع الداكن",
            light: "☀️ الوضع الفاتح",
            logout: "تسجيل الخروج",
            name: "اسم المنتج",
            price: "السعر",
            qty: "الكمية",
            reports: "التقارير"
        }

    };

    // ==========================
    // Update Language
    // ==========================
    function updateLanguage(lang) {

        currentLanguage = lang;

        localStorage.setItem("language", lang);

        document.documentElement.lang = lang;
        document.documentElement.dir =
            lang === "en" ? "ltr" : "rtl";

        const t = translations[lang];

        document.title = t.title;

        if (addBtn) addBtn.textContent = t.add;
        if (printBtn) printBtn.textContent = t.print;
        if (clearBtn) clearBtn.textContent = t.clear;
        if (logoutBtn) logoutBtn.textContent = t.logout;

        if (productName) productName.placeholder = t.name;
        if (productPrice) productPrice.placeholder = t.price;
        if (productQty) productQty.placeholder = t.qty;

        if (darkBtn) {
            darkBtn.textContent =
                document.body.classList.contains("dark")
                    ? t.light
                    : t.dark;
        }

    }
        // ==========================
    // Language Selector
    // ==========================
    if (languageSelect) {

        languageSelect.value = currentLanguage;

        updateLanguage(currentLanguage);

        languageSelect.addEventListener("change", () => {
            updateLanguage(languageSelect.value);
            renderProducts();
        });

    }

    // ==========================
    // Dark Mode
    // ==========================
    if (darkBtn) {

        darkBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            darkMode = document.body.classList.contains("dark");

            localStorage.setItem("darkMode", darkMode);

            const t = translations[currentLanguage];

            darkBtn.textContent = darkMode
                ? t.light
                : t.dark;

        });

    }

    // ==========================
    // Logout
    // ==========================
    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            localStorage.removeItem("loggedIn");

            window.location.href = "login.html";

        });

    }

    // ==========================
    // Save Products
    // ==========================
    function saveProducts() {

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

    }

    // ==========================
    // Calculate Total
    // ==========================
    function calculateTotal() {

        return products.reduce((sum, item) => {

            return sum + (item.price * item.qty);

        }, 0);

    }
        // ==========================
    // Render Products
    // ==========================
    function renderProducts() {

        if (!productsContainer) return;

        productsContainer.innerHTML = "";

        const t = translations[currentLanguage];

        products.forEach((item, index) => {

            const row = document.createElement("div");
            row.className = "product-item";

            row.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} IQD</span>
                <span>${item.qty}</span>
                <span>${(item.price * item.qty).toLocaleString()} IQD</span>
                <button class="delete-btn" data-index="${index}">
                    ❌
                </button>
            `;

            productsContainer.appendChild(row);

        });

        // Total
        if (totalElement) {
            totalElement.textContent =
                calculateTotal().toLocaleString() + " IQD";
        }

        // Dashboard
        if (totalSales) {
            totalSales.textContent =
                calculateTotal().toLocaleString() + " IQD";
        }

        if (totalOrders) {
            totalOrders.textContent = products.length;
        }

        if (totalProducts) {

            const qty = products.reduce((sum, item) => {
                return sum + item.qty;
            }, 0);

            totalProducts.textContent = qty;

        }

        addDeleteEvents();

    }
        // ==========================
    // Add Product
    // ==========================
    if (addBtn) {

        addBtn.addEventListener("click", () => {

            const name = productName.value.trim();
            const price = Number(productPrice.value);
            const qty = Number(productQty.value);

            if (!name || price <= 0 || qty <= 0) {
                alert("تکایە زانیارییە دروستەکان بنووسە.");
                return;
            }

            products.push({
                name,
                price,
                qty
            });

            saveProducts();
            renderProducts();

            productName.value = "";
            productPrice.value = "";
            productQty.value = "";

            productName.focus();

        });

    }

    // ==========================
    // Delete Product
    // ==========================
    function addDeleteEvents() {

        const deleteButtons =
            document.querySelectorAll(".delete-btn");

        deleteButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                products.splice(index, 1);

                saveProducts();
                renderProducts();

            });

        });

    }
        // ==========================
    // Clear All Products
    // ==========================
    if (clearBtn) {

        clearBtn.addEventListener("click", () => {

            if (!confirm("دڵنیایت لە سڕینەوەی هەموو کاڵاکان؟")) {
                return;
            }

            products = [];

            saveProducts();
            renderProducts();

        });

    }

    // ==========================
    // Print Receipt
    // ==========================
    if (printBtn) {

        printBtn.addEventListener("click", () => {

            if (products.length === 0) {
                alert("هیچ کاڵایەک زیاد نەکراوە.");
                return;
            }

            window.print();

        });

    }

    // ==========================
    // Enter Key Support
    // ==========================
    [productName, productPrice, productQty].forEach(input => {

        if (!input) return;

        input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                e.preventDefault();

                addBtn.click();

            }

        });

    });
        // ==========================
    // Reports
    // ==========================
    const reportBtn = document.getElementById("reportBtn");

    if (reportBtn) {

        reportBtn.addEventListener("click", () => {

            window.location.href =
                "mailto:krdreceipsystem@gmail.com?subject=KRD Receipt System Report";

        });

    }

    // ==========================
    // Auto Save Inputs
    // ==========================
    [productName, productPrice, productQty].forEach(input => {

        if (!input) return;

        input.addEventListener("input", () => {

            localStorage.setItem(
                input.id,
                input.value
            );

        });

        const savedValue = localStorage.getItem(input.id);

        if (savedValue !== null) {
            input.value = savedValue;
        }

    });

    // ==========================
    // Clear Saved Inputs After Add
    // ==========================
    if (addBtn) {

        addBtn.addEventListener("click", () => {

            localStorage.removeItem("productName");
            localStorage.removeItem("productPrice");
            localStorage.removeItem("productQty");

        });

    }

    // ==========================
    // First Load
    // ==========================
    renderProducts();
        // ==========================
    // Refresh Dashboard
    // ==========================
    function refreshDashboard() {

        renderProducts();

    }

    // ==========================
    // Update Total on Page Load
    // ==========================
    if (totalElement) {
        totalElement.textContent =
            calculateTotal().toLocaleString() + " IQD";
    }

    // ==========================
    // Initialize Application
    // ==========================
    refreshDashboard();

    // ==========================
    // End of KRD Receipt System
    // ==========================
});
