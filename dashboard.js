document.addEventListener("DOMContentLoaded", function () {

    // ئەگەر لۆگین نەکرابێت
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // دوگمەی چوونەدەرەوە
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {

        // سڕینەوەی دۆخی لۆگین
        localStorage.removeItem("loggedIn");

        // گەڕانەوە بۆ لۆگین
        window.location.href = "login.html";

    });

});
