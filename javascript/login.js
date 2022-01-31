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
	
	
function logIn(){
    
  
    const email = document.getElementById("signup_email_input").value;
    const password = document.getElementById("signup_password_input").value;
    

    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
   
      var user = auth.currentUser
      var database_ref = db.ref()
  
      var user_data = {
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User Logged In!!')
    //   window.location.replace('../dashboard/home.html');
      location.href = "../dashboard/home.html";
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })

    


}




