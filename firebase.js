console.log("Initializing firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDJ9D-YEpxmEnBZck-u1M6QOdfZNNvQTZs",
    authDomain: "atlp-capstone-project-b6159.firebaseapp.com",
    projectId: "atlp-capstone-project-b6159",
    storageBucket: "atlp-capstone-project-b6159.appspot.com",
    messagingSenderId: "1042536780820",
    appId: "1:1042536780820:web:6c265cd2a51f99f41ac301"

  };
 

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
//   console.log(app.name);

const auth = firebase.auth();
	
	
function signUp(){
    
    const names = document.getElementById("signup_names_input");
    const email = document.getElementById("signup_email_input");
    const password = document.getElementById("signup_password_input");
    

  auth.createUserWithEmailAndPassword(email.value, password.value)
  .then(function() {
    var user = auth.currentUser
    var database_ref = db.ref()
    var user_data = {
      names: names.value,
      email : email.value,
      password : password.value,
      last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)
   
    alert('User Created!!')
    // location.href = "../pages/login.html";
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    console.log(error_code)
    alert(error_message)
  })

  // window.location.replace('./login.html');


}


