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