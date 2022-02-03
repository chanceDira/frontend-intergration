const email = document.getElementById("signup_email_input");
const password = document.getElementById("signup_password_input");
const logginBtn = document.getElementById("login");
let chanceEmail = "chancedesire@gmail.com"

logginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  await fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/authentication/login",
    {
      crossDomain: true,
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      // console.log("Success")
      console.log(response?.code);
      console.log(response);
      if (response?.code === 200 && email.value === chanceEmail) {
        Toastify({
          text: "Weclome Chance :)",
          className: "info",
          style: {
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
            background: "#d81515",
          },
        }).showToast();
        localStorage.setItem("token", response?.data?.token);
        setInterval(() => {
          location.href = "../dashboard/home.html";
        }, 5000);
      } else {
        Toastify({
          text: "Here you will expore more !!",
          className: "info",
          style: {
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
            background: "#d81515",
          },
        }).showToast();
        localStorage.setItem("token", response?.data?.token);
        setInterval(() => {
          location.href = "../index.html";
        }, 5000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
