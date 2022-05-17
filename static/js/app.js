// search button script
// index.html
const ind = require('./index.js')
// const siteBackendUrl = `https://journal-project-backend.herokuapp.com`;
const siteBackendUrl = `http://localhost:3000`;

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
  //remove existing posts
  while (document.querySelector(".wrapper").firstElementChild) {
    // console.log("removing post...")
    document.querySelector(".wrapper").firstElementChild.remove();
  }
  // pull data and run appendPosts
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
function createPost(e) {
  e.preventDefault()
  const route = "/posts";
  const np = document.querySelector('#postForm');
  let postTitle;
  let postBody;
  let postLink;
  try {
    postTitle = np.querySelector('#postTitle').value;
    postBody = np.querySelector('#postContent').value;
    if (!postTitle || !postBody){
      throw new Error("The post container no text content")
    }
  }
  catch(err){
    alert(err)
    return
  } 

  np.querySelector('#newPostFormImg') && (postLink = np.querySelector('#newPostFormImg').src);
  
  let postData = {
      title: postTitle,
      body: postBody,
      link: postLink,
  };
  console.log(JSON.stringify(postData))

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${siteBackendUrl}${route}`, options)
  .then((r) => r.json())
  .then(data =>{
      console.log("posting content...")
      getAllPosts()
    })
    .catch(console.warn);    
}

function deletePost(postId) {
  const route = "/posts";
}

function createComment(postId) {
  const route = "/posts";
}

function sendReact(postId, emojiId) {
  const route = "/posts/emojis";

  const postData = {
    post: {
      id: postId,
    },
    emoji: String(emojiId),
  };

  console.log(postData);
  console.log(postId);
  console.log(emojiId);
  console.log(JSON.stringify(postData));

  console.log(postData);
  const options = {
    method: "POST",
    // body: postData,
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${siteBackendUrl}${route}`, options)
    .then((r) => r.json())
    .catch(console.warn);
}

// helpers
function appendPosts(posts) {
  posts.forEach(appendPost);
}

function appendPost(postData) {
  const mainWrapper = document.querySelector(".wrapper");
  // Create Post Elements
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

  let laugh = document.createElement("p");
  let thumbsUp = document.createElement("p");
  let hankey = document.createElement("p");
  laugh.classList.add("roflCount");
  laugh.classList.add("reaction");
  thumbsUp.className = "thumbsUpCount";
  thumbsUp.classList.add("reaction");
  hankey.className = "hankeyCount";
  hankey.classList.add("reaction");

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
  postData.id && newPost.setAttribute("id", postData.id);
  postData.title && (newPostTitle.textContent = postData.title);
  postData.body &&
    (newPostBody.textContent = postData.body); // create preview from message body
  postData.comments &&
    (newPostComments.textContent = `Comments: ${postData.comments.length}`);
  postData.date && (newPostDateTime.textContent = postData.date);
  if (postData.reactions) {
    if (postData.reactions.laugh) {
      laugh.textContent += `${postData.reactions.laugh} 🤣`;
      laugh.addEventListener("click", () => {
        sendReact(postData.id, 0);
        laugh.textContent = `${parseInt(laugh.textContent, 10) + 1} 🤣`;
      });
    }
    if (postData.reactions.thumbUp) {
      thumbsUp.textContent += `${postData.reactions.thumbUp} 👍`;
      thumbsUp.addEventListener("click", () => {
        sendReact(postData.id, 1);
        thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10) + 1} 👍`;
      });
    }
    if (postData.reactions.poo) {
      hankey.textContent += `${postData.reactions.poo} 💩`;
      hankey.addEventListener("click", () => {
        sendReact(postData.id, 2);
        hankey.textContent = `${parseInt(hankey.textContent, 10) + 1} 💩`;
      });
    }
  }

  // Append
  //   newPostTitle.appendChild("a");
  if (newPostBody.textContent && newPostTitle.textContent) {
    newPostWrapper.appendChild(newPostTitle);
    newPostWrapper.appendChild(newPostBody);
    newPostWrapper.appendChild(newPostComments);
    newPostWrapper.appendChild(newPostDateTime);
    newPostReactions.appendChild(laugh);
    newPostWrapper.appendChild(newGiphy);
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
    // add comments interface
    newPostComments.addEventListener("click", e => {
      commentsBody.classList.toggle('commentsBody');
    })
  }
}

module.exports = {
  getAllPosts,
  createPost,
  sendReact,
}
