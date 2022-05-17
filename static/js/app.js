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
  const mainWrapper = document.querySelector(".wrapper");
  // Create Elements
  let newPost = document.createElement("div");
  let newPostWrapper = document.createElement("div");
  let newPostTitle = document.createElement("h2");
  let newPostBody = document.createElement("p");
  let newPostComments = document.createElement("p");
  let newPostDateTime = document.createElement("p");
  let newPostReactions = document.createElement("div");
  let newGiphy = document.createElement("img");
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

  let commentsBody = document.createElement('div');
  commentsBody.className = 'commentsBodyHidden';
  let header = document.createElement('h3');
  header.textContent = 'Comments';
  let commentForm = document.createElement('form');
  commentForm.className = 'commentForm';
  let commentLabel = document.createElement('label');
  commentLabel.textContent = 'Enter your comment:';
  commentLabel.htmlFor = 'commentInput' + postData.id;
  let commentInput = document.createElement('textarea');
  commentInput.id = 'commentInput' + postData.id;
  commentInput.className = 'commentInput';
  commentInput.maxLength = '250';
  let commentSubmitBtn = document.createElement('button');
  commentSubmitBtn.className = 'commentSubmitBtn';
  commentSubmitBtn.textContent = 'Submit Comment';
  

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
    newPostWrapper.appendChild(newGiphy);
    newPostReactions.appendChild(rofl);
    newPostReactions.appendChild(thumbsUp);
    newPostReactions.appendChild(hankey);
    newPostWrapper.appendChild(newPostReactions);
    newPost.appendChild(newPostWrapper);

    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentSubmitBtn);
    commentsBody.appendChild(header);
    commentsBody.appendChild(commentForm);
    
    for(let i=0;i<postData.comments.length;i++){
      let comment = postData.comments[i];
      let thisComment = document.createElement("p");
      thisComment.textContent = comment.body;
      thisComment.id = comment.postRef;
      let thisDate = document.createElement("p");
      thisDate.textContent = 'Commented on '+comment.date;
      commentsBody.appendChild(thisDate);
      commentsBody.appendChild(thisComment);
    }
    
    newPost.insertAdjacentElement("beforeEnd", commentsBody);
    
    mainWrapper.insertAdjacentElement("afterBegin", newPost);

    newPostComments.addEventListener("click", e => {
      commentsBody.classList.toggle('commentsBody');
    })

    rofl.addEventListener("click", e => {
      rofl.textContent = `${parseInt(rofl.textContent, 10) + 1} 🤣`;
    })

    thumbsUp.addEventListener("click", e => {
      thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10) + 1} 👍`;
    })

    hankey.addEventListener("click", e => {
      hankey.textContent = `${parseInt(hankey.textContent, 10) + 1} 💩`;
    })
  }
}

module.exports = {
  getAllPosts,
};


