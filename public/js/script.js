let editReviewBtns = document.querySelectorAll(".edit-review-btn");
let deleteReviewBtns = document.querySelectorAll(".delete-review-btn");
let editReviewForms = document.querySelectorAll(".edit-review-form");
editReviewBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        editReviewForms[index].classList.toggle("show"); // Show the corresponding form
    });
})

// loads backgorund image and content simultaneously
window.addEventListener('load', () => {
    document.querySelector(".edit").classList.add('loaded')
})
window.addEventListener('load', () => {
    document.querySelector(".new").classList.add('loaded');
})
