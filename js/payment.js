// ================= INITIALIZE PAYMENT PAGE =================
document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
    calculateTotal();
    setupPaymentMethodToggle();
    updatePaymentAmount();
});

// ================= LOAD CART ITEMS =================
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.getElementById("order-items");

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = "<p style='text-align: center; color: #999;'>Your cart is empty</p>";
        return;
    }

    orderItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item");
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;
        orderItemsContainer.appendChild(itemDiv);
    });
}

// ================= CALCULATE TOTAL =================
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price;
    });

    const deliveryCharge = 50;
    const grandTotal = subtotal + deliveryCharge;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("delivery").innerText = deliveryCharge;
    document.getElementById("grand-total").innerText = grandTotal;
    document.getElementById("cod-amount").innerText = grandTotal;
    document.getElementById("pay-amount").innerText = grandTotal;

    // Store in localStorage for later use
    localStorage.setItem("orderTotal", grandTotal);
    localStorage.setItem("orderSubtotal", subtotal);
}

// ================= SETUP PAYMENT METHOD TOGGLE =================
function setupPaymentMethodToggle() {
    const radioButtons = document.querySelectorAll('input[name="payment-method"]');

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            // Hide all payment details
            document.querySelectorAll(".payment-details").forEach(detail => {
                detail.style.display = "none";
            });

            // Show selected payment details
            const selectedMethod = this.value;
            const detailId = selectedMethod.replace(/-/g, "-") + "-details";
            const detailElement = document.getElementById(detailId);
            if (detailElement) {
                detailElement.style.display = "block";
            }
        });
    });
}

// ================= UPDATE PAYMENT AMOUNT =================
function updatePaymentAmount() {
    const grandTotal = localStorage.getItem("orderTotal") || 0;
    document.getElementById("pay-amount").innerText = grandTotal;
}

// ================= PROCESS PAYMENT =================
function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');

    if (!selectedMethod) {
        showErrorModal("Please select a payment method");
        return;
    }

    const paymentMethod = selectedMethod.value;
    let isValid = true;

    // Validate payment method inputs
    if (paymentMethod === "credit-card" || paymentMethod === "debit-card") {
        isValid = validateCardPayment();
    } else if (paymentMethod === "upi") {
        isValid = validateUPI();
    } else if (paymentMethod === "net-banking") {
        isValid = validateNetBanking();
    } else if (paymentMethod === "wallet") {
        isValid = validateWallet();
    } else if (paymentMethod === "emi") {
        isValid = validateEMI();
    }

    if (!isValid) {
        return;
    }

    // Validate billing address
    if (!validateBillingAddress()) {
        showErrorModal("Please fill in all billing address fields");
        return;
    }

    // Process payment based on method
    processPaymentByMethod(paymentMethod);
}

// ================= VALIDATE CARD PAYMENT =================
function validateCardPayment() {
    const detailsDiv = document.getElementById(
        document.querySelector('input[name="payment-method"]:checked').value + "-details"
    );

    const inputs = detailsDiv.querySelectorAll(".input-field");
    let allFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
            input.style.borderColor = "#dc2626";
        } else {
            input.style.borderColor = "#ddd";
        }
    });

    if (!allFilled) {
        showErrorModal("Please fill in all card details");
        return false;
    }

    // Basic card validation
    const cardNumber = inputs[1].value.replace(/\s/g, "");
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        showErrorModal("Please enter a valid 16-digit card number");
        return false;
    }

    const cvv = inputs[3].value;
    if (cvv.length !== 3 || isNaN(cvv)) {
        showErrorModal("Please enter a valid 3-digit CVV");
        return false;
    }

    return true;
}

// ================= VALIDATE UPI =================
function validateUPI() {
    const input = document.querySelector("#upi-details .input-field");
    const upiId = input.value.trim();

    if (!upiId) {
        showErrorModal("Please enter your UPI ID");
        return false;
    }

    // Basic UPI ID validation (format: username@upi)
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(upiId)) {
        showErrorModal("Please enter a valid UPI ID (e.g., name@upi)");
        return false;
    }

    return true;
}

// ================= VALIDATE NET BANKING =================
function validateNetBanking() {
    const select = document.querySelector("#net-banking-details select");

    if (!select.value) {
        showErrorModal("Please select a bank");
        return false;
    }

    return true;
}

// ================= VALIDATE WALLET =================
function validateWallet() {
    const select = document.querySelector("#wallet-details select");

    if (!select.value) {
        showErrorModal("Please select a wallet");
        return false;
    }

    return true;
}

// ================= VALIDATE EMI =================
function validateEMI() {
    const select = document.querySelector("#emi-details select");
    const total = parseInt(localStorage.getItem("orderTotal")) || 0;

    if (!select.value) {
        showErrorModal("Please select EMI duration");
        return false;
    }

    if (total < 5000) {
        showErrorModal("EMI is available for transactions above ₹5000");
        return false;
    }

    return true;
}

// ================= VALIDATE BILLING ADDRESS =================
function validateBillingAddress() {
    const inputs = document.querySelectorAll(".address-form .input-field");
    let allFilled = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            allFilled = false;
        }
    });

    return allFilled;
}

// ================= PROCESS PAYMENT BY METHOD =================
function processPaymentByMethod(method) {
    console.log("Processing payment via: " + method);

    // Simulate payment processing
    const btn = document.querySelector(".btn-pay");
    const originalText = btn.innerHTML;
    btn.innerHTML = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // Simulate success (90% success rate for demo)
        const isSuccess = Math.random() < 0.9;

        if (isSuccess) {
            completePayment();
        } else {
            btn.innerHTML = originalText;
            btn.disabled = false;
            showErrorModal("Payment failed. Please try again.");
        }
    }, 2000);
}

// ================= COMPLETE PAYMENT =================
function completePayment() {
    const orderId = generateOrderId();
    localStorage.setItem("lastOrderId", orderId);
    localStorage.removeItem("cart"); // Clear cart after successful payment

    document.getElementById("order-id").innerText = orderId;
    showSuccessModal();
}

// ================= GENERATE ORDER ID =================
function generateOrderId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return "QM" + timestamp.toString().slice(-6) + randomNum.toString().padStart(4, "0");
}

// ================= SHOW SUCCESS MODAL =================
function showSuccessModal() {
    const modal = document.getElementById("success-modal");
    modal.classList.add("show");
}

// ================= SHOW ERROR MODAL =================
function showErrorModal(message) {
    const modal = document.getElementById("error-modal");
    document.getElementById("error-message").innerText = message;
    modal.classList.add("show");
}

// ================= CLOSE ERROR MODAL =================
function closeErrorModal() {
    const modal = document.getElementById("error-modal");
    modal.classList.remove("show");
}

// ================= CLOSE MODAL ON OUTSIDE CLICK =================
window.addEventListener("click", function (event) {
    const successModal = document.getElementById("success-modal");
    const errorModal = document.getElementById("error-modal");

    if (event.target === successModal) {
        successModal.classList.remove("show");
    }
    if (event.target === errorModal) {
        errorModal.classList.remove("show");
    }
});
