function renderBlogPost() {
    let newPost = localStorage.getItem('viewedPost')
    console.log(newPost);
    let post = JSON.parse(newPost)
    console.log(post)
    // console.log(post.title)
    document.getElementById('Blog').innerHTML = post.id
    document.getElementById('Blog-title').innerHTML = post.title
    document.getElementById('Blog-body').innerHTML = post.body
}

renderBlogPost();


