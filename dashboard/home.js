

const upload = () => {
  var image = document.getElementById("post-image").value;
  var post = document.getElementById("post").value;
  var postTitle = document.getElementById("post-title").value;
  var postSubTitle = document.getElementById("post-sub-title").value;
  let token = (localStorage.getItem('token'));

  fetch('https://capstone-backend-andela.herokuapp.com/api/v1/admin/newblog', {
    method: "POST",
    body: JSON.stringify({
        authorId: token,
        blogImage: image,
        title: postTitle,
        subTitle: postSubTitle,
        blogPost: post
    }),
    headers: {
        'Content-Type': 'application/json',
        'token': token
    }

})  .then(res => res.json())
    .then((response) => {
        console.log(response);
        Toastify({
          text: "Blog-post Created !!",
          className: "info",
          style: {
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
            background: "#d81515",
          },
        }).showToast();
        getData();
    })
    .catch((error) => {
        console.log(error);
    });

}

window.onload = function () {
  this.getData();
};


getData = async () => {
  // Using Fetch
  const blogPosts = [];
  await fetch("https://capstone-backend-andela.herokuapp.com/api/v1/admin/", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((snapshot) => {
      // handle success
      // console.log(response);

      snapshot?.data?.posts?.map((Post) => {
        blogPosts.push(Post);
      });
      console.log(blogPosts);
      document.getElementById("blog_cards").innerHTML = blogPosts
        .slice(0, 9)
        .reverse()
        .map((article) =>
                  `
                  <card class="card ">

                    <img src=${article.blogImage} alt="photo1" class="card_photo1">


                    <div class="card_content_container">
                        <h4 class="card_title"><b>${article.title}</b></h4>
                        <p class="card_content">
                        ${article.subTitle}
                        </p>
                        <div class="card_stars">
                            <span class="iconify" data-icon="emojione:star"></span>
                            <span class="iconify" data-icon="emojione:star"></span>
                            <span class="iconify" data-icon="emojione:star"></span>
                            <span class="iconify" data-icon="emojione:star"></span>
                            <span class="iconify" data-icon="emojione:star"></span>
                        </div>
                        <a id=${article._id} onClick = 'moreContent(this.id)' class="card_more_link1">more</a>
                        <button id=${article._id} class='btn btn-delete'  onclick='delete_post(this.id)'>Delete</button>
                        <button id=${article._id} class='btn btn-update'  onclick="toggleBtn('${article._id}','${article.title}','${article.subTitle}','${testEscape(article.blogPost)}','${article.blogImage}','${article.authorId}')">Update</button>
                    </div>
                </card> 
                  `
                  
        ).join("");
    })
    .catch((error) => {
      // handle error
      // toggleBtn(${this.id}, "${article.title}", "${article.blogPost}")
      console.log(error);
    })
    .then(() => {
      // always executed
    });

  }

  const testEscape = (contentPost) => {
    var strInputString = contentPost;
    var SanitizedString = strInputString.replace(/'/g, "\\'");
    return SanitizedString;
}



// function getdata() {
//   firebase
//     .database()
//     .ref("blogs/")
//     .once("value")
//     .then(function (snapshot) {
//       var posts_div = document.getElementById("blog_cards");
//       blog_cards.innerHTML = "";
//       var data = snapshot.val();
//       console.log(data);
//       for (let [key, value] of Object.entries(data)) {
//         posts_div.innerHTML =
//           "<card class='card'>" +
//           "<img src='" +
//           value.imageURL +
//           "' alt='CardPhoto' class='card_photo'>" +
//           "<div class='card_content_container'>" +
//           "<h4 class='card_title'>" +
//           "<b id='card_title'>" +
//           value.title +
//           "</b>" +
//           "</h4>" +
//           "<p class='card_content' id='card_content'>" +
//           value.text +
//           "</p>" +
//           "<div class='card_stars'>" +
//           "<span class='iconify' data-icon='emojione:star'>" +
//           "</span>" +
//           "<span class='iconify' data-icon='emojione:star'>" +
//           "</span>" +
//           "<span class='iconify' data-icon='emojione:star'>" +
//           "</span>" +
//           "<span class='iconify' data-icon='emojione:star'>" +
//           "</span>" +
//           "<span class='iconify' data-icon='emojione:star'>" +
//           "</span>" +
//           "</div>" +
//           "<a href='../pages/article.html' class='card_more_link1'>more</a>" +
//           "<button class='btn btn-delete' id='" +
//           key +
//           "' onclick='delete_post(this.id)'>Delete</button>" +
//           "<button class='btn btn-update' id='" +
//           key +
//           "' onclick='toggle(this.id, "+value.title+", "+value.text+"))'>"+
//           "<a href='#card-input-form'>Update</a></button>" +
//           "</div>" +
//           "</card>" +
//           posts_div.innerHTML;
//       }
//     });

// }

console.log((localStorage.getItem('token')))
const delete_post = async (key) => {
  // console.log(window.localStorage.getItem('token'))
  // console.log("id " + JSON.stringify(key))
  let token = (localStorage.getItem('token'))

  await fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/admin/deleteblog",
    {
      method: "DELETE",
      body: JSON.stringify({
        id: key
      }),
      headers: {
        "Content-Type": "application/json",
        'token': token
      }
    }
  )
    .then((res) => res.text())
    .then((response) => {
      // console.log("Success")
      console.log(response);
      Toastify({
        text: "Blog-post deleted !!",
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

  getData();
}

const logOut = () => {
  window.localStorage.clear();
  window.location.href = "../index.html";
}

const toggleBtn = (key, postTitle, postSubTitle, post, postImage, author_id) => {
  // var post = document.getElementById("card_content").innerHTML;
  // var postTitle = document.getElementById("card_title").innerHTML;
  console.log("id, post, postTitle", key , post, postTitle);
  document.getElementById("post-title-update").value = postTitle;
  document.getElementById("post-sub-title-update").value = postSubTitle;
  document.getElementById("post-update").value = post;
  document.getElementById("update-image").value = postImage;



  var x = document.getElementById("update-box");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  localStorage.setItem('update-id', key);
  localStorage.setItem('author-id', author_id);

}




const update = async () => {

  // let author_Id = toString(4444)
  postTitle = document.getElementById("post-title-update").value;
  postSubTitle = document.getElementById("post-sub-title-update").value;
  post = document.getElementById("post-update").value;
  postImage = document.getElementById("update-image").value;

  let token = (localStorage.getItem('token'));
  let update_id = (localStorage.getItem('update-id'));
  let author_id = (localStorage.getItem('author-id'));
  console.log('token ' + token);
  console.log('update_id ' + update_id);
  console.log('author_id ' + author_id);


  await fetch(
    "https://capstone-backend-andela.herokuapp.com/api/v1/admin/updateblog",
    {
      method: "PUT",
      body: JSON.stringify({
        id: update_id,
        authorId: author_id,
        blogImage: postImage,
        title: postTitle,
        subTitle: postSubTitle,
        blogPost: post
      }),
      headers: {
        "Content-Type": "application/json",
        'token': token
      }
    }
  )
    .then((res) => res.json())
    .then((response) => {
      // console.log("Success")
      console.log(response);
      Toastify({
        text: "Blog-post updated !!",
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

  getData();
 
  
}


