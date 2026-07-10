<!DOCTYPE html>
<html lang="ku" dir="rtl">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>KRD Receipt System</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<div class="receipt">


<header>

<h1>KRD Receipt System</h1>

</header>



<!-- زانیاری کڕیار -->

<div class="customer-info">

<input id="customer" placeholder="ناوی کڕیار">

<input id="phone" placeholder="ژمارەی تەلەفون" type="tel">

</div>



<!-- تێبینی -->

<textarea id="notes" placeholder="تێبینی"></textarea>




<!-- زیادکردنی کاڵا -->

<button id="addProductBtn" class="add-btn">

➕ زیادکردنی کاڵا

</button>




<!-- شوێنی کاڵاکان -->

<div id="productsContainer">

</div>





<!-- داشکاندن -->

<div class="discount-box">

<input id="discount" type="number" placeholder="بڕی داشکاندن">

</div>






<!-- کۆتایی -->

<div class="bottom-section">


<button id="createReceipt">

دروستکردنی وەسڵ

</button>



<div class="grand-total">

کۆی گشتی:

<span id="grandTotal">0</span>

IQD

</div>


</div>




</div>



<script src="script.js"></script>


</body>

</html>
