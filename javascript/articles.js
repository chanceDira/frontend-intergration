window.onload = () => {
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

      snapshot?.data?.posts?.map((blogPost) => {
        blogPosts.push(blogPost);
      });
      console.log(blogPosts);
      document.getElementById("blog_cards").innerHTML = blogPosts
        .slice(0, 9)
        .reverse()
        .map((article) =>
          `
                  <card class="card card1">
            
                  <img src=${article.blogImage} alt="" class="card_photo1">
            
            
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
                  </div>
              </card>
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

  // Using Axios
  // await axios
  //   .get("https://capstone-backend-andela.herokuapp.com/api/v1/admin/")
  //   .then((snapshot) => {
  //     document.getElementById("blog_cards").innerHTML =
  //       snapshot?.data?.data?.posts
  //         ?.slice(0)
  //         .reverse()
  //         .map(
  //           (blogPost) =>
  //             `
  //     <card class="card card1">

  //     <img src=${blogPost?.blogImage} alt="" class="card_photo1">

  //     <div class="card_content_container">
  //         <h4 class="card_title"><b>${blogPost?.title}</b></h4>
  //         <p class="card_content">
  //         ${blogPost?.subTitle}
  //         </p>
  //         <div class="card_stars">
  //             <span class="iconify" data-icon="emojione:star"></span>
  //             <span class="iconify" data-icon="emojione:star"></span>
  //             <span class="iconify" data-icon="emojione:star"></span>
  //             <span class="iconify" data-icon="emojione:star"></span>
  //             <span class="iconify" data-icon="emojione:star"></span>
  //         </div>
  //         <a id=${blogPost?._id} href="../pages/article.html" class="card_more_link1">more</a>
  //     </div>
  // </card>
  //     `
  //         )
  //         .join("");
  //   })
  //   .catch((error) => {
  //     // handle error
  //     console.log(error);
  //   });
};

const moreContent = (key) => {
  location.href = `../pages/article.html?id=${key}`;
} 
