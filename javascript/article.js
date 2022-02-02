const id = location.search.split('=')[1] 
window.onload = () => {

   this.getMoreData(id);
  
  };


  
  getMoreData = async (id) => {
    
    //Using Fetch
    const blogPosts = [];
    await fetch(`https://capstone-backend-andela.herokuapp.com/api/v1/admin/blogpost?id=${id}`, {
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
        // console.log(snapshot?.data?.post?.title);
  
        document.getElementById("article").innerHTML = snapshot?.data?.post?.map((blogPost) => 
        //   blogPosts.push(blogPost);
            // console.log(blogPost.title);
        `
        <div class="article_photo">
                <img src=${blogPost.blogImage} alt="blog_photo">
                <div class="card_stars">
                    <span class="iconify" data-icon="emojione:star"></span>
                    <span class="iconify" data-icon="emojione:star"></span>
                    <span class="iconify" data-icon="emojione:star"></span>
                    <span class="iconify" data-icon="emojione:star"></span>
                    <span class="iconify" data-icon="emojione:star"></span>
                </div>
            </div>
            <div class="article_content" id='article_content'>
                
                    <h2 class="article_title">
                    ${blogPost.title}
                        <h2 class="article_subtitle"> ${blogPost.subTitle}</h2>
                    </h2>
                    <p class="article_paragraph">
                    ${blogPost.blogPost}
                    </p>
              
            </div>
        `
        ).join("");
       
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });

  };



 
  getCommentsById = async () => {
    

    //Using Fetch
    await fetch(`https://capstone-backend-andela.herokuapp.com/api/v1/users/comments`, {
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
        console.log(snapshot?.data?.posts);
        console.log("link id " + id)
        // document.getElementById("comments_card").innerHTML = snapshot?.data?.posts?.map((comment) => 
        // //   blogPosts.push(blogPost);
        //     // console.log(blogPost.title);
        //     if(id == comment.postId) {
        //       (  `
        //       <card class="card card_comment">
        //       <p>
        //           ${comment.comment}
        //       </p>
        //       <h4><i>From: ${comment.fullName}</i></h4>
        //   </card>
        //       `)
        //     }
     
        // ).join("");


        document.getElementById("comments_card").innerHTML = snapshot?.data?.posts?.map((comment) => {
        //   blogPosts.push(blogPost);
            // console.log(blogPost.title);
            return id == comment.postId ? 
               `
              <card class="card card_comment">
              <p>
                  ${comment.comment}
              </p>
              <h4><i>From: ${comment.fullName}</i></h4>
          </card>
              ` : null
            
     }
        ).join("");
       
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });

  };

  getCommentsById()

  newComment = async () => { 
   
    let names = document.getElementById("names_input").value;
    let email = document.getElementById("email_input").value;
    let comment = document.getElementById("comment_input").value;
    // const id = location.search.split('=')[1] 
    console.log("id " + id)
  
    //let token = (localStorage.getItem('token'));

    await fetch('https://capstone-backend-andela.herokuapp.com/api/v1/users/newcomment', {
    method: "POST",
    body: JSON.stringify({
      postId : id,
      fullName: names,
      email: email,
      comment: comment
    }),
    headers: {
        'Content-Type': 'application/json',
        'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVhYjZlYWNkNGFkYTFjYmY0NmNmM2YiLCJpYXQiOjE2NDI3NzIyMzl9.7ajrZR6xW2CrW9FoG629jYEIl2zlT7FwhEz49lCJ1cM"
    }

})  .then(res => res.json())
    .then((response) => {
        console.log(response);
        Toastify({
          text: "Comment Posted !!",
          className: "info",
          style: {
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
            background: "#d81515",
          },
        }).showToast();
       
        //getData();
    })
    .catch((error) => {
        console.log(error);
    }).then(() => {
     
    });

  }
