// ================= GLOBAL VARIABLES =================
let cart = [];
let total = 0;

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    // ================= TOGGLE CART =================
    window.toggleCart = function () {
        document.getElementById("cart").classList.toggle("active");
    };

    // ================= ADD TO CART =================
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function () {

            const productCard = this.closest(".product-card");
            const name = productCard.querySelector("h3").innerText;
            const priceText = productCard.querySelector("p").innerText;
            const price = parseInt(priceText.replace(/\D/g, ""));

            cart.push({ name, price });
            total += price;

            updateCart();
            showPopup(name);
        });
    });

    // ================= UPDATE CART =================
    function updateCart() {

        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
            cartTotal.innerText = "0";
            cartCount.innerText = "0";
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeItem(${index})">X</button>
            `;

            cartItemsContainer.appendChild(div);
        });

        cartTotal.innerText = total;
        cartCount.innerText = cart.length;

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("cartTotal", total);
    }

    // ================= REMOVE ITEM =================
    window.removeItem = function (index) {
        total -= cart[index].price;
        cart.splice(index, 1);
        updateCart();
    };

    // ================= SEARCH FILTER =================
    window.filterProducts = function () {
        let input = document.getElementById('search').value.toLowerCase();
        let cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();
            card.style.display = text.includes(input) ? "block" : "none";
        });
    };

});

// ================= SUCCESS POPUP =================
function showPopup(productName) {
    const popup = document.getElementById("success-popup");

    popup.innerHTML = `✅ ${productName} added to cart!`;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

// ================= PROCEED TO CHECKOUT =================
function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }
    window.location.href = "payment.html";
}