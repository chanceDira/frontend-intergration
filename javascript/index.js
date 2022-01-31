function validateForm() {
    let x = document.forms["newsletter"]["email"].value;
    if (x == "") {
      alert("Email must be filled out");
      return false;
    }
  }

  function toggle() {
    var x = document.getElementById("card_menu");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }