* {
    box-sizing: border-box;
    font-family: Tahoma, Arial, sans-serif;
}

body {
    background: #f2f2f2;
    margin: 0;
    padding: 15px;
}


.receipt {
    width: 100%;
    max-width: 450px;
    margin: auto;
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}


/* Header */

header {
    text-align: center;
    margin-bottom: 15px;
}

header h1 {
    font-size: 22px;
    margin: 0;
}


/* Customer */

.customer-info {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
}

.customer-info input {
    width: 50%;
}


/* Inputs */

input,
textarea {

    width: 100%;
    padding: 8px;

    border: 1px solid #ccc;
    border-radius: 6px;

    margin-bottom: 8px;

    font-size: 13px;
}


textarea {
    height: 60px;
    resize: none;
}


/* Buttons */

button {

    border: none;
    padding: 8px 12px;

    border-radius: 6px;

    cursor: pointer;

    font-size: 13px;
}


.add-btn {

    width: 100%;
    margin-bottom: 10px;

}



/* Product Card */

.product-card {

    border: 1px solid #ddd;

    border-radius: 8px;

    padding: 10px;

    margin-bottom: 10px;

    position: relative;

}



/* Delete */

.delete-btn {

    position: absolute;

    left: 8px;

    top: 8px;

    padding: 5px 8px;

}



/* Payment */

.payment {

    display: flex;

    align-items: center;

    gap: 15px;

    margin: 8px 0;

}


.payment label {

    display: flex;

    align-items: center;

    gap: 5px;

    font-size: 13px;

}



/* Product Details */

.product-details {

    display: flex;

    gap: 5px;

}


.product-details input {

    width: 33%;

}



/* Discount */

.discount-box {

    margin-top: 15px;

}



/* Bottom */

.bottom-section {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-top: 15px;

}


.grand-total {

    font-size: 15px;

    font-weight: bold;

}



/* Dark Mode */

body.dark {

    background: #111;

}


body.dark .receipt {

    background: #222;

    color: white;

}


body.dark input,
body.dark textarea {

    background: #333;

    color: white;

    border-color: #555;

}



/* Print */

@media print {

    body {

        background: white;

        padding: 0;

    }


    .receipt {

        max-width: 80mm;

        box-shadow: none;

        border-radius: 0;

    }


    button {

        display: none;

    }

}
