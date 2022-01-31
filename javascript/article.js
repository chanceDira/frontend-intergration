window.onload = () => {
    this.getMoreData();
  };
  
  getMoreData = async () => {
    console.log(JSON.parse(window.localStorage.getItem('key')));
    let key = JSON.parse(window.localStorage.getItem('key'))
    //Using Fetch
    const blogPosts = [];
    await fetch(`https://capstone-backend-andela.herokuapp.com/api/v1/admin/blogpost?id=${key}`, {
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
        console.log(snapshot?.data?.post?.title);
  
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
        // console.log(blogPosts);
        // document.getElementById("blog_cards").innerHTML = blogPosts
        //   .slice(0, 9)
        //   .reverse()
        //   .map((article) =>
        //     `
        //             <card class="card card1">
              
        //             <img src=${article.blogImage} alt="" class="card_photo1">
              
              
        //             <div class="card_content_container">
        //                 <h4 class="card_title"><b>${article.title}</b></h4>
        //                 <p class="card_content">
        //                 ${article.subTitle}
        //                 </p>
        //                 <div class="card_stars">
        //                     <span class="iconify" data-icon="emojione:star"></span>
        //                     <span class="iconify" data-icon="emojione:star"></span>
        //                     <span class="iconify" data-icon="emojione:star"></span>
        //                     <span class="iconify" data-icon="emojione:star"></span>
        //                     <span class="iconify" data-icon="emojione:star"></span>
        //                 </div>
        //                 <a id=${article._id} onClick = 'moreContent(this.id)' class="card_more_link1">more</a>
        //             </div>
        //         </card>
        //             `
        //   ).join("");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  };