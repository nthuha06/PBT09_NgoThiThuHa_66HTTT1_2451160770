const form = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const submitBtn = document.querySelector("#submitBtn");

const strengthBar = document.querySelector("#strengthBar");

const modal = document.querySelector("#modal");
const userInfo = document.querySelector("#userInfo");
const closeModal = document.querySelector("#closeModal");





let validName = false;
let validEmail = false;
let validPassword = false;
let validConfirm = false;
let validPhone = false;





// NAME VALIDATION
nameInput.addEventListener("input", () => {

    const value = nameInput.value.trim();

    if(value.length >= 2 && value.length <= 50){

        document.querySelector("#nameError")
            .textContent = "✅ Valid name";

        validName = true;

    }

    else{

        document.querySelector("#nameError")
            .textContent =
            "❌ Name must be 2-50 characters";

        validName = false;

    }

    checkForm();

});





// EMAIL VALIDATION
emailInput.addEventListener("input", () => {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





    if(emailRegex.test(emailInput.value)){

        document.querySelector("#emailError")
            .textContent = "✅ Valid email";

        validEmail = true;

    }

    else{

        document.querySelector("#emailError")
            .textContent =
            "❌ Invalid email format";

        validEmail = false;

    }

    checkForm();

});





// PASSWORD VALIDATION
passwordInput.addEventListener("input", () => {

    const value = passwordInput.value;





    // WEAK
    if(value.length < 8){

        strengthBar.style.width = "33%";

        strengthBar.style.background = "red";

        document.querySelector("#passwordError")
            .textContent = "Weak password";

        validPassword = false;

    }





    // MEDIUM
    else if(
        /[A-Za-z]/.test(value) &&
        /\d/.test(value)
    ){

        strengthBar.style.width = "66%";

        strengthBar.style.background = "orange";

        document.querySelector("#passwordError")
            .textContent = "Medium password";

        validPassword = true;

    }





    // STRONG
    if(
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[!@#$%^&*]/.test(value) &&
        value.length >= 8
    ){

        strengthBar.style.width = "100%";

        strengthBar.style.background = "green";

        document.querySelector("#passwordError")
            .textContent = "Strong password";

        validPassword = true;

    }

    checkConfirmPassword();

    checkForm();

});





// CONFIRM PASSWORD
confirmInput.addEventListener("input", () => {

    checkConfirmPassword();

    checkForm();

});





function checkConfirmPassword(){

    if(confirmInput.value === passwordInput.value){

        document.querySelector("#confirmError")
            .textContent = "✅ Password match";

        validConfirm = true;

    }

    else{

        document.querySelector("#confirmError")
            .textContent =
            "❌ Password does not match";

        validConfirm = false;

    }

}





// PHONE FORMAT
phoneInput.addEventListener("input", () => {

    let value =
        phoneInput.value.replace(/\D/g, "");





    if(value.length > 10){

        value = value.slice(0,10);

    }





    if(value.length > 4){

        value =
            value.slice(0,4) +
            "-" +
            value.slice(4);

    }

    if(value.length > 8){

        value =
            value.slice(0,8) +
            "-" +
            value.slice(8);

    }





    phoneInput.value = value;





    const phoneRegex =
        /^\d{4}-\d{3}-\d{3}$/;





    if(phoneRegex.test(value)){

        document.querySelector("#phoneError")
            .textContent = "✅ Valid phone";

        validPhone = true;

    }

    else{

        document.querySelector("#phoneError")
            .textContent =
            "❌ Phone format: 0901-234-567";

        validPhone = false;

    }

    checkForm();

});





// ENABLE SUBMIT
function checkForm(){

    if(
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validPhone
    ){

        submitBtn.disabled = false;

    }

    else{

        submitBtn.disabled = true;

    }

}





// SUBMIT
form.addEventListener("submit", (e) => {

    e.preventDefault();





    userInfo.innerHTML = `

        Name: ${nameInput.value}<br>
        Email: ${emailInput.value}<br>
        Phone: ${phoneInput.value}

    `;





    modal.classList.remove("hidden");

});





// CLOSE MODAL
closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});