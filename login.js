document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const error = document.getElementById("error");

    loginBtn.addEventListener("click", function () {

        if (
            username.value === "admin" &&
            password.value === "123456"
        ) {

            // هەڵگرتنی دۆخی لۆگین
            localStorage.setItem("loggedIn", "true");

            // چوون بۆ سیستەمی وەسڵ
            window.location.href = "dashboard.html";

        } else {

            error.textContent = "ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە.";

        }

    });

});
