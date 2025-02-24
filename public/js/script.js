// loads backgorund image and content simultaneously
window.addEventListener('load', () => {
    document.querySelectorAll(".edit, .new, .home").forEach(el => {
        el.classList.add('loaded');
    })
})

document.querySelectorAll(".cancelBookingForm").forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (confirm("Are you sure to cancel this booking?")) {
            this.submit()
        }
    })
})
document.querySelector("#deleteListingForm").addEventListener('submit', function (e) {
    e.preventDefault();
    if (confirm("Are you sure to delete this listing?")) {
        this.submit();
    }
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
