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
  //remove existing posts
  while (document.querySelector(".wrapper").firstElementChild) {
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
  const route = "/posts";
}

function createComment(postId, commentBodyText) {
  const route = "/posts/comments";

  const postData = {
    post: {
      "id": postId
    },
    comment: {
      "body": commentBodyText
    },
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
    .catch(console.warn);
}

function sendReact(postId, emojiId) {
  const route = "/posts/emojis";

  const postData = {
    post: {
      id: postId
    },
    emoji: String(emojiId),
  };

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
  rofl.classList.add("roflCount");
  rofl.classList.add("reaction");
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
    (newPostBody.textContent = postData.body.slice(0, previewLength)); // create preview from message body
  postData.comments &&
    (newPostComments.textContent = `Comments: ${postData.comments.length}`);
  postData.date && (newPostDateTime.textContent = postData.date);
  if (postData.reactions) {
    if (postData.reactions.laugh) {
      rofl.textContent += `${postData.reactions.laugh} 🤣`;
      rofl.addEventListener('click', () => {
        sendReact(postData.id, 0)
        rofl.textContent = `${parseInt(rofl.textContent, 10) + 1} 🤣`
      })

    }
    if (postData.reactions.thumbUp) {
      thumbsUp.textContent += `${postData.reactions.thumbUp} 👍`;
      thumbsUp.addEventListener('click', () => {
        sendReact(postData.id, 1)
        thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10) + 1} 👍`
      })

    }
    if (postData.reactions.poo) {
      hankey.textContent += `${postData.reactions.poo} 💩`;
      hankey.addEventListener('click', () => {
        sendReact(postData.id, 2)
        hankey.textContent = `${parseInt(hankey.textContent, 10) + 1} 💩`
      })
    }
  }

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

    for (let i = 0; i < postData.comments.length; i++) {
      let comment = postData.comments[i];
      let thisComment = document.createElement("p");
      thisComment.textContent = comment.body;
      thisComment.id = comment.postRef;
      let thisDate = document.createElement("p");
      thisDate.textContent = 'Commented on ' + comment.date;
      commentsBody.appendChild(thisDate);
      commentsBody.appendChild(thisComment);
    }

    newPost.insertAdjacentElement("beforeEnd", commentsBody);

    mainWrapper.insertAdjacentElement("afterBegin", newPost);
    // add comments interface
    newPostComments.addEventListener("click", e => {
      commentsBody.classList.toggle('commentsBody');
    })

    commentSubmitBtn.addEventListener("click", e=>{
      e.preventDefault();
      if(commentInput.value!=""){
        createComment(postData.id, commentInput.value);

        
      }
    })
  }
}

module.exports = {
  getAllPosts,
};


