document.addEventListener("DOMContentLoaded", function(){

    const stars = document.querySelectorAll(".rating span");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function(){

            selectedRating = this.getAttribute("data-value");

            // Remove active class from all
            stars.forEach(s => s.classList.remove("active"));

            // Add active class to clicked and previous stars
            this.classList.add("active");

            let previous = this.nextElementSibling;
            while(previous){
                previous.classList.add("active");
                previous = previous.nextElementSibling;
            }
        });
    });

    document.getElementById("feedbackForm").addEventListener("submit", function(e){
        e.preventDefault();

        if(selectedRating === 0){
            alert("Please select a rating ⭐");
            return;
        }

        document.getElementById("successModal").style.display = "flex";

        this.reset();
        stars.forEach(s => s.classList.remove("active"));
    });

});

function closeModal(){
    document.getElementById("successModal").style.display = "none";
}