console.log("Initializing firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDJ9D-YEpxmEnBZck-u1M6QOdfZNNvQTZs",
  authDomain: "atlp-capstone-project-b6159.firebaseapp.com",
  projectId: "atlp-capstone-project-b6159",
  storageBucket: "atlp-capstone-project-b6159.appspot.com",
  messagingSenderId: "1042536780820",
  appId: "1:1042536780820:web:6c265cd2a51f99f41ac301",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

console.log("messaging")
window.onload = function () {
    this.getdata();
  };
  
  function getdata() {
    firebase
      .database()
      .ref("contacts/")
      .once("value")
      .then(function (snapshot) {
        var posts_div = document.getElementById("messageBoxes");
        messageBoxes.innerHTML = "";
        var data = snapshot.val();
        console.log(data);
        for (let [key, value] of Object.entries(data)) {
          posts_div.innerHTML =
          "<card class='messageBox'>"+
          "<div class='messageContent'>"+

                  "<div>"+
                      "<h4>From: </h4>"+
                      "<p>"+ value.names +"</p>"+
                  "</div>"+
                  "<div>"+
                      "<h4>Email: </h4>"+
                      "<p>"+ value.email +"</p>"+
                  "</div>"+
                  "<div class='message'>"+
                      "<h4>Message: </h4>"+
                      "<p>"+ value.comment +"</p>"+
                  "</div>"+

                  "<div>"+
                      "<button class='btn btn-delete' id='" +
                      key +
                      "' onclick='delete_message(this.id)'>Delete</button>"+
                  "</div>"+
              "</div>"+
          "</card>"+
            posts_div.innerHTML;
        }
      });
  
  }

  function delete_message(key) {
    firebase
      .database()
      .ref("contacts/" + key)
      .remove();
    getdata();
  }