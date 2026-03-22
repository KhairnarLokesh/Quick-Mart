document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();
        let msg = document.getElementById("loginMsg");

        if (email === "" || password === "") {
            msg.style.color = "red";
            msg.innerText = "All fields are required!";
            return;
        }

        // Get stored user
        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            msg.style.color = "red";
            msg.innerText = "No account found. Please signup first.";
            return;
        }

        if (email === storedUser.email && password === storedUser.password) {
            msg.style.color = "green";
            msg.innerText = "Login Successful!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            msg.style.color = "red";
            msg.innerText = "Invalid Email or Password!";
        }
    });

});