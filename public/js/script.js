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
window.addEventListener('load', () => {
    document.querySelector(".index").classList.add('loaded');
})

// password display
let passwordEyeBox = document.getElementById("password-eye-box");
let passwordEyeIcon = document.querySelector("#password-eye-box i");
let passwordInputField = document.querySelector("input[type='password']");
passwordEyeBox.addEventListener("click", () => {
    if (passwordEyeIcon.classList.contains("fa-eye-slash")) {
        passwordEyeIcon.classList.remove("fa-eye-slash");
        passwordEyeIcon.classList.add("fa-eye");
        passwordInputField.setAttribute("type", "text");
    } else {
        passwordEyeIcon.classList.remove("fa-eye");
        passwordEyeIcon.classList.add("fa-eye-slash");
        passwordInputField.setAttribute("type", "password")
    }
})