const email = document.getElementById("signup_email_input");
const password = document.getElementById("signup_password_input");
const logginBtn = document.getElementById("login");

// const logIn = async () => {
//   await fetch(
//     "https://capstone-backend-andela.herokuapp.com/api/v1/authentication/login",
//     {
//       method: "POST",
//       body: JSON.stringify({
//         email: email.value,
//         password: password.value,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => {
//       // console.log("Success")
//       console.log(response);
//       alert("Logged In !!");
//       Toastify({
//         text: "Logged In",
//         className: "info",
//         style: {
//           // background: "linear-gradient(to right, #00b09b, #96c93d)",
//           background: "#d81515",
//         },
//       }).showToast();
//       location.href = "../dashboard/home.html";
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// };

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
      if (response?.code === 200) {
        Toastify({
          text: "Logged In",
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
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
