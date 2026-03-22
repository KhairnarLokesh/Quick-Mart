// Contact Form Validation

document.addEventListener("DOMContentLoaded", function () {

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (name === "" || email === "" || phone === "" || message === "") {
            formMessage.style.color = "red";
            formMessage.textContent = "Please fill all fields!";
            return;
        }

        if (!email.includes("@")) {
            formMessage.style.color = "red";
            formMessage.textContent = "Enter valid email!";
            return;
        }

        formMessage.style.color = "green";
        formMessage.textContent = "Message sent successfully!";
        contactForm.reset();
    });
}

});