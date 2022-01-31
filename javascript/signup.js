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




const signUp = async () => {
  await fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/authentication/",
    {
      method: "POST",
      body: JSON.stringify({
        fullName: names.value,
        email: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      // console.log("Success")
      console.log(response);
      alert("Registered !!")
      Toastify({
        text: "Registered",
        className: "info",
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          background: "#d81515",
        },
      }).showToast();
      setInterval(() => {
        window.location.href = "../pages/login.html";
      }, 5000)
  
    })
    .catch((error) => {
      console.log(error);
    });

   
};


