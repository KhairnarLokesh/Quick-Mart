

document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("signupName").value.trim();
        let email = document.getElementById("signupEmail").value.trim();
        let password = document.getElementById("signupPassword").value.trim();

        if (name === "" || email === "" || password === "") {
            alert("All fields are required!");
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        // 🎉 Welcome Popup
        showPopup(`Welcome ${name} 🎉 Account Created Successfully!`);

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    });

});


function showPopup(message) {

    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 100);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => {
            popup.remove();
        }, 500);
    }, 1800);
}