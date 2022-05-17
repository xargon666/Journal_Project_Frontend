// search button script
// index.html

const port = 3000;
const siteBackendUrl = `https://journal-project-backend.herokuapp.com`;
const previewLength = 25;


function hideMainToggle() {
  if (mainWrapper.style.display != "none") {
    mainWrapper.style.display = "none";
  } else {
    mainWrapper.style.display = mainWrapperDisplayState;
  }
}

// function applyPostEvent() {}

// index
function getAllPosts() {
  const route = "/posts";
  fetch(`${siteBackendUrl}${route}`)
    .then((r) => r.json())
    .then(appendPosts)
    .catch(console.warn);
}

function getPost(id) {
  const route = `/posts/:${id}`;
  fetch(`${siteBackendUrl}${route}`)
    .then((r) => r.json())
    .then(appendPosts)
    .catch(console.warn);
}

// create
function createPost() {
  const route = "/posts";
  const postData = {
    title: "Something", // data source required
    body: "Something", // data source required
  };

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${siteBackendUrl}${route}`, options)
    .then((r) => r.json())
    .then(appendPost)
    .catch(console.warn);
}

function deletePost(postId) {
  const route = "/posts"
}

function createComment(postId) {
  const route = "/posts"
}

function sendReact() {
  const route = "/posts/emojis"
}
// helpers
function appendPosts(posts) {
  posts.forEach(appendPost);
}

function appendPost(postData) {
  console.log("appending post...")
  const mainWrapper = document.querySelector(".wrapper");
  // Create Elements
  let newPost = document.createElement("div");
  let newPostWrapper = document.createElement("div");
  let newPostTitle = document.createElement("h2");
  let newPostBody = document.createElement("p");
  let newPostComments = document.createElement("p");
  let newPostDateTime = document.createElement("p");
  let newPostReactions = document.createElement("div");
  newPost.classList.add("post");
  newPostWrapper.classList.add("postWrapper");
  newPostTitle.className = "postTitle";
  newPostBody.className = "preview";
  newPostComments.classList.add("comments");
  newPostDateTime.classList.add("dateTime");
  newPostReactions.classList.add("reactions");

  let rofl = document.createElement("p");
  let thumbsUp = document.createElement("p");
  let hankey = document.createElement("p");
  rofl.className = "roflCount";
  thumbsUp.className = "thumbsUpCount";
  hankey.className = "hankeyCount";

  // Populate
  postData.title && (newPostTitle.textContent = postData.title);
  postData.body && (newPostBody.textContent = postData.body.slice(0, previewLength)); // create preview from message body
  postData.comments && (newPostComments.textContent = `Comments: ${postData.comments.length}`);
  postData.date && (newPostDateTime.textContent = postData.date);
  rofl.textContent += `${postData.reactions.laugh} 🤣`;
  thumbsUp.textContent += `${postData.reactions.thumbUp} 👍`;
  hankey.textContent += `${postData.reactions.poo} 💩`;

  // Append
  //   newPostTitle.appendChild("a");
  if (newPostBody.textContent && newPostTitle.textContent) {
    newPostWrapper.appendChild(newPostTitle);
    newPostWrapper.appendChild(newPostBody);
    newPostWrapper.appendChild(newPostComments);
    newPostWrapper.appendChild(newPostDateTime);
    newPostReactions.appendChild(rofl);
    newPostReactions.appendChild(thumbsUp);
    newPostReactions.appendChild(hankey);
    newPostWrapper.appendChild(newPostReactions);
    newPost.appendChild(newPostWrapper);
    mainWrapper.insertAdjacentElement("afterBegin", newPost);

    newPostComments.addEventListener("click", e => {
      let out = newPostComments.parentNode.parentElement;
      if (!out.contains(document.querySelector('.commentsBody'))) {
        let div = document.createElement('div');
        div.className = 'commentsBody';
        let header = document.createElement('h3');
        header.textContent = 'Comments';
        div.appendChild(header);
        out.insertAdjacentElement("beforeend", div);
      }
      else {
        document.querySelector('.commentsBody').remove();
      }
    })

    rofl.addEventListener("click", e=>{
      rofl.textContent = `${parseInt(rofl.textContent, 10)+1} 🤣`
    })

    thumbsUp.addEventListener("click", e=>{
      thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10)+1} 👍`
    })

    hankey.addEventListener("click", e=>{
      hankey.textContent = `${parseInt(hankey.textContent, 10)+1} 💩`
    })
  }
}

module.exports = {
  getAllPosts,
};


