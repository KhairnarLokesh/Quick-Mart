// Contact Form Validation + Modal Popup

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || phone === "" || message === "") {
                alert("Please fill all fields!");
                return;
            }

            if (!email.includes("@")) {
                alert("Enter a valid email!");
                return;
            }

            // Show success modal
            const modal = document.getElementById("successModal");
            modal.style.display = "flex";

            contactForm.reset();
        });
    }

});

// Close modal
function closeModal() {
    document.getElementById("successModal").style.display = "none";
}