let editReviewBtns = document.querySelectorAll(".edit-review-btn");
let deleteReviewBtns = document.querySelectorAll(".delete-review-btn");
let editReviewForms = document.querySelectorAll(".edit-review-form");
editReviewBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        editReviewForms[index].classList.toggle("show"); // Show the corresponding form
    });
})

