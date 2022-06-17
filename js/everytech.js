let blogWrapper = document.querySelector('#blog-container');
let blogPost = document.querySelector('#blog-post')
let title = document.querySelector('#blog-title')
let body = document.querySelector('#blog-body')

let Tech = [];


function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts/?_limit=9')
        .then((response) => response.json())
        .then((data) => {
            console.log(Tech)
            //    console.log(data)
            Tech = data
            EveryUI(Tech)
        })
        
}
getPosts();

blogPost.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            Tech.unshift(data);
            console.log(Tech)
            EveryUI(Tech)
            blogPost.reset()
        })
}

function updateBlogPost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let BlogTitles = document.querySelectorAll('.blog-post-title') 
            let BlogBodies = document.querySelectorAll('.blog-post-body')
            console.log(BlogTitles)
            BlogTitles.forEach((BlogTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        BlogTitle.innerHTML = data.title
                    }
                }

            })

            BlogBodies.forEach((BlogBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        BlogBody.innerHTML = data.body
                    }
                }

            })

        });
}

function deleteBlogPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            Tech = Tech.filter(post => post.id !== id)
            console.log(Tech)
            // use a function to display the UI
            EveryUI(Tech)  
        })

}

function EveryUI (arr) {
    let blogContainer = '';
            arr.forEach(post => {
                blogContainer += `
                    <div class="col-lg-4 col-md-6 mb-3" data-aos="fade-right" data-aos-duration="1600">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="text-center">${post.id}</p>
                                <h6 class="blog-post-title">${post.title}</h6>
                                <p class="blog-post-body">${post.body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-nat d-flex align-items-center" id="view-btn"onclick="openBlog(${post.id})">Read More<i class='bx bx-book-open ps-2'></i></button>
                                    <button class="btn btn-secondary d-flex align-items-center" onclick="updateBlogPost(${post.id})">Update <i class='bx bx-edit ps-2'></i></button>
                                    <button class="btn btn-danger" onclick="deleteBlogPost(${post.id})"> <i class='bx bx-trash'></i></button>
                                </div>
                                <P class="pt-3 text-muted fst-italic">By Natacha Danbadan.</P>
                                <P class="d-flex align-items-center"><i class='bx bx-time-five pe-2'></i>17 hours ago.</P>
                            </div>
                        </div>
                    </div>
                `
            });
            blogWrapper.innerHTML = blogContainer;

}

function openBlog(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'blogfullpost.html'
            // console.log(data)
        });
}

var buttonTop = $('#back-to-top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        buttonTop.addClass('show');
    } else {
        buttonTop.removeClass('show');
    }
});

buttonTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});