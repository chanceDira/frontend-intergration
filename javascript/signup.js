const form = document.getElementById("form_signup");
const names = document.getElementById("signup_names_input");
const email = document.getElementById("signup_email_input");
const password = document.getElementById("signup_password_input");

const err_name = document.getElementsByClassName('error-names')[0];
const err_email = document.getElementsByClassName('error-email')[0];
const err_password = document.getElementsByClassName('error-password')[0];



form.addEventListener("submit", e => {
  e.preventDefault();

  validateInputs();
});

const isEmailValid = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const validateInputs = () => {
//   console.log(password.value);
  const namesValue = names.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  //names
  if (namesValue === "") {
    setError(err_name, "username is required");
  } else {
    setSuccess(err_name);
  }
  //email
  if (emailValue === "") {
    setError(err_email, "Email is required");
  } else if (!isEmailValid(emailValue)) {
    setError(err_email, "Enter valid Email");
  } else {
    setSuccess(err_email);
  }
  //password
  if (passwordValue === "") {
    setError(err_password, "Password is required");
  } else if (password.length < 8) {
    setError(err_password, "Password must be at least 8 character");
  } else {
    setSuccess(err_password);
  }
};

const setError = (element, message) => {

    element.innerText = message;

//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.innerText = message;
//   inputControl.classList.add("error");
//   inputControl.classList.remove("success");
};

const setSuccess = (element) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

  element.innerText = "";
//   element.parentElement.className = "signup_inputs success";
//   element.classList.add("success");
//   element.classList.remove("error");
};


// firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   });


