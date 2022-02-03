
//   const db = firebase.database();

//=============================================================================
// let id = (id) => document.getElementById(id);
// let classes = (classes) => document.getElementsByClassName(classes);

// let contact_names_input = id('contact_names_input'),
// form = id('form'),
// errorMsg = classes('error');

// form.addEventListener("submit",(e) =>{
//     e.preventDefault();

//     engine(contact_names_input, 1, 'Provide your Names.' );
// });

// let engine = (id, serial, message) => {
//     if (id.value.trim() === '') {
//         errorMsg[serial].innerHTML = message;
//         id.style.border = '2px solid red';
//         console.log('error')
//     } else {
//         errorMsg[serial].innerHTML = '';
//         id.style.border = '2px solid green';
//     }
// }
//=============================================================================

// const sendMessage = () => {
//     const names = document.getElementById("contact_names_input").value;
//     const email = document.getElementById("contact_email_input").value;
//     const comment = document.getElementById("contact_comment_input").value;

//     firebase.database().ref("contacts/").set(
//             {
//               names: names,
//               email: email,
//               comment: comment,
//             })

//     alert("Message sent !!")
// }

const btnContact = document.getElementById("btn_contact");
const names = document.getElementById("contact_names_input");
const email = document.getElementById("contact_email_input");
const comment = document.getElementById("contact_comment_input");
const emailNewsletter = document.getElementById("user_email_newsletter");
const btnNewsletter = document.getElementById("btn_submit_newletter");

btnContact.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/users/contactUs",
    {
      method: "POST",
      body: JSON.stringify({
        fullName: names.value,
        email: email.value,
        message: comment.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      // console.log("Success")
      console.log(response);
      Toastify({
        text: "Message sent !!",
        className: "info",
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          background: "#d81515",
        },
      }).showToast();
    })
    .catch((error) => {
      console.log(error);
    });
});

btnNewsletter.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/users/newsletter",
    {
      method: "POST",
      body: JSON.stringify({
        newsletter: emailNewsletter.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      // console.log("Success")
      console.log(response);
      Toastify({
        text: "Subscribed !!",
        className: "info",
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          background: "#d81515",
        },
      }).showToast();
    })
    .catch((error) => {
      console.log(error);
    });
});
