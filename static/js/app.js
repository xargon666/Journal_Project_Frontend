 // search button script
// index.html
const mainSelector = document.querySelector('.container')
const port = 3000
const siteURL = ``;


function hideMain(){
    mainSelector.style.display = "none"
}

function applyPostEvent(){

}

function getPost(){}

function newPost(){}

// index
function getAllPosts(){
    const route = "/postData"
    fetch(`${siteURL}${route}`)
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function createPost(){
    const postData = {
        title: "Something",
        body: "Something",        
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const route = "/newPost"
    fetch(`${siteURL}${route}`)
    .then(r => r.json())
    .then(appendPosts)
    .catch(console.warn)
}

// helpers
function appendPosts(posts){
    posts.forEach(appendPost);
}

function appendPost(postData){
    // Create Elements
    let newPost = document.createElement('div')
    let newPostBody = document.createElement('p')
    let newPostTitle = document.createElement('h2')
    let newPostComments = document.createElement('p')
    let newPostDateTime = document.createElement('p')
    let newPostReactions = document.createElement('p')
    newPost.classList.add('post')
    newPostBody.classList.add('postBody')
    newPostComments.classList.add('comments')
    newPostDateTime.classList.add('dateTime')
    newPostReactions.classList.add('reactions')

    // Populate
    newPostTitle.textContent = postData.title;
    newPostBody.textContent = postData.body.slice(0,25);
    newPostComments.textContent = `Comments: ${postData.comments.length}`
    newPostDateTime.textContent = postData.date
    if (postData.reactions.laugh > 0){newPostReactions.textContent += `🤣 ${postData.reactions.laugh}`}
    if (postData.reactions.laugh > 0){newPostReactions.textContent += `👍 ${postData.reactions.thumbUp}`}
    if (postData.reactions.laugh > 0){newPostReactions.textContent += `💩 ${postData.reactions.poo}`}
    
    // Append
    newPostTitle.appendChild('a')
    newPostBody.appendChild(newPostTitle)
    newPost.appendChild(newPostBody)
    mainSelector.appendChild(newPost)
}

module.exports = {
    getAllPosts
}

// Btn-1 Returns 10 results
function btn1Fetch(e){
    console.log("submit button press detected - btn-1")
    // prevent submit button default behaviour
    e.preventDefault()
    hideMain()
    // specify source
    const source = "allfilms" // DATA SOURCE PAGE

    fetch(`http://localhost:${port}/${source}`)
    .then(response => response.json())
    .then(data => {
        try {        // do something with searchBar.textContent...
        for (let i = 0;i < 10;i++){
            let newPost = document.createElement('div')
            let newCommentContainer = document.createElement('div')
            let newPostTitle = document.createElement('h1')
            let newPostBody  = document.createElement('p')
            let newPostDate = document.createElement('span')


            let output = `
            Title: ${data[i].title}
            Director: ${data[i].director}
            Release Date: ${data[i].release_date}`
            newLi.textContent = output
            targetElement.appendChild(newLi)
        }
    } catch (err) {
        let newLi = document.createElement('li')
        newLi.textContent = "Something when wrong!"
        targetElement.appendChild(newLi)
    }
        console.log(data)
    });
}

// Btn-2 Returns 1 result
function btn2Fetch(e){
    console.log("submit button press detected - btn-2")
    // prevent submit button default behaviour
    e.preventDefault()
    hideMain()
    // specify source
    const source = "random" // DATA SOURCE PAGE

    // open new window...
    // openResultsWindow()

    fetch(`http://localhost:${port}/${source}`)
    .then(response => response.json())
    .then(data => {
        // do something with searchBar.textContent...
        try {
            let newLi = document.createElement('li')
            let output = `
            Title: ${data.title}
            Director: ${data.director}
            Release Date: ${data.release_date}`
            newLi.textContent = output
            targetElement.appendChild(newLi)
        }
        catch(err) {
            let newLi = document.createElement('li')
            newLi.textContent = "Something when wrong!"
            targetElement.appendChild(newLi)
        }
        console.log(data)
    });
}

