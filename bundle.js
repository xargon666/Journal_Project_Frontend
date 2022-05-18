(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// search button script
// index.html
const ind = require('./index.js')
const siteBackendUrl = `https://journal-project-backend.herokuapp.com`;
// const siteBackendUrl = `http://localhost:3000`;

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

// *************** unused functions ***************
function getPost(id) {
  const route = `/posts/:${id}`;
  fetch(`${siteBackendUrl}${route}`)
    .then((r) => r.json())
    .then(appendPosts)
    .catch(console.warn);
}

function deletePost(postId) {
  const route = "/posts";
}

function editPost(postId) {
  const route = "/posts";
}

function hideMainToggle() {
  if (mainWrapper.style.display != "none") {
    mainWrapper.style.display = "none";
  } else {
    mainWrapper.style.display = mainWrapperDisplayState;
  }
}
// **************************************************

// create
function createPost() {
  const route = "/posts";
  const np = document.querySelector('#postForm');
  let postTitle;
  let postBody;
  let postLink;
  try {
    postTitle = np.querySelector('#postTitle').value;
    postBody = np.querySelector('#postContent').value;
    if (!postTitle || !postBody) {
      throw new Error("The post contains no text content")
    }
  }
  catch (err) {
    console.error(err)
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
    .then(data => {
      console.log(data)
      getAllPosts()
    })
    .catch(console.warn);
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
      id: postId,
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
  // -------------------------------------------------------------------------- 
  // ------------------------- Create Post Elements ---------------------------
  // *** Post Section *** 
  let newPost = document.createElement("div");
  let newPostWrapper = document.createElement("div");
  let newPostTitle = document.createElement("h2");
  let newPostBody = document.createElement("p");
  let postBodyDiv = document.createElement("div");
  let newPostComments = document.createElement("p");
  let newPostDateTime = document.createElement("p");
  let newPostControls = document.createElement("div")
  let newPostEditDel = document.createElement("div")
  let newPostReactions = document.createElement("div");
  let newPostCommentsDiv = document.createElement("div");
  let newPostEditBtn = document.createElement("button")
  let newPostDeleteBtn = document.createElement("button")
  let laugh = document.createElement("p");
  let thumbsUp = document.createElement("p");
  let hankey = document.createElement("p");
  // *** Comments Section ***
  let header = document.createElement('h3');
  let commentsBody = document.createElement('div');
  let commentForm = document.createElement('form');
  let commentLabel = document.createElement('label');
  let commentInput = document.createElement('textarea');
  let commentSubmitBtn = document.createElement('button');
  // -------------------------------------------------------------------------- 
  // ------------------------- Apply Classes ----------------------------------
  // *** Post Section *** 
  newPost.classList.add("post");
  newPostWrapper.classList.add("postWrapper");
  newPostTitle.className = "postTitle";
  newPostBody.className = "previewText";
  postBodyDiv.className = "preview";
  newPostComments.classList.add("commentsText");
  newPostCommentsDiv.classList.add("comments");
  newPostDateTime.classList.add("dateTime");
  newPostReactions.classList.add("reactions");
  newPostControls.classList.add("controls")
  newPostEditDel.classList.add("edit-del-section")
  newPostEditBtn.classList.add("edit-btn")
  newPostDeleteBtn.classList.add("del-btn")
  laugh.classList.add("roflCount");
  laugh.classList.add("reaction");
  thumbsUp.className = "thumbsUpCount";
  thumbsUp.classList.add("reaction");
  hankey.className = "hankeyCount";
  hankey.classList.add("reaction");
  // *** Comments Section ***
  header.textContent = 'Comments';
  commentsBody.className = 'commentsBodyHidden';
  commentForm.className = 'commentForm';
  commentLabel.textContent = 'Enter your comment:';
  commentLabel.htmlFor = 'commentInput' + postData.id;
  commentInput.id = 'commentInput' + postData.id;
  commentInput.className = 'commentInput';
  commentInput.maxLength = '250';
  commentSubmitBtn.className = 'commentSubmitBtn';
  commentSubmitBtn.textContent = 'Submit Comment';

  // -------------------------------------------------------------------------- 
  // ------------------------- Populate Data ----------------------------------
  // *** Post Section *** 
  postData.id && newPost.setAttribute("id", postData.id);
  postData.title && (newPostTitle.textContent = postData.title);
  postData.body && (newPostBody.textContent = postData.body); // create preview from message body
  postData.comments && (newPostComments.textContent = `Comments: ${postData.comments.length}`);
  postData.date && (newPostDateTime.textContent = postData.date);
  postBodyDiv.appendChild(newPostBody);
  
  // *** Reaction Section ***
  laugh.textContent += `${postData.reactions.laugh} 🤣`;
  laugh.addEventListener("click", () => {
    sendReact(postData.id, 0);
    laugh.textContent = `${parseInt(laugh.textContent, 10) + 1} 🤣`;
  },{once:true});
  thumbsUp.textContent += `${postData.reactions.thumbUp} 👍`;
  thumbsUp.addEventListener("click", () => {
    sendReact(postData.id, 1);
    thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10) + 1} 👍`;
  },{once:true});
  hankey.textContent += `${postData.reactions.poo} 💩`;
  hankey.addEventListener("click", () => {
    sendReact(postData.id, 2);
    hankey.textContent = `${parseInt(hankey.textContent, 10) + 1} 💩`;
  },{once:true});
  
  // *** Giphy Section ***
  if(postData.link){
    let newGiphy = document.createElement("img");
    newGiphy.src = postData.link;
    newGiphy.className = 'postGiphy';
    newGiphy.alt = 'Gif for post titled ' + postData.title;
    postBodyDiv.appendChild(newGiphy);
  }
  
  // --------------------------------------------------------------------------
  // ------------------------- Append New Elements ----------------------------
  // *** Post Section *** 
  if (newPostBody.textContent && newPostTitle.textContent) {
    newPostWrapper.appendChild(newPostTitle);  
    newPostWrapper.appendChild(postBodyDiv);
    newPostCommentsDiv.appendChild(newPostComments);
    newPostWrapper.appendChild(newPostCommentsDiv);
    newPostWrapper.appendChild(newPostDateTime);
    newPostReactions.appendChild(laugh);
    newPostReactions.appendChild(thumbsUp);
    newPostReactions.appendChild(hankey);
    newPostEditDel.appendChild(newPostEditBtn);
    newPostEditDel.appendChild(newPostDeleteBtn);
    newPostControls.appendChild(newPostEditDel);
    newPostControls.appendChild(newPostReactions);
    newPostWrapper.appendChild(newPostControls);
    newPost.appendChild(newPostWrapper);
    // *** Comments Section ***
    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentSubmitBtn);
    commentsBody.appendChild(header);
    commentsBody.appendChild(commentForm);
    for (let i = 0; i < postData.comments.length; i++) {
      let comment = postData.comments[i];
      let thisComment = document.createElement("p");
      let commentDiv = document.createElement("div");
      commentDiv.className = 'commentDiv';
      thisComment.textContent = comment.body;
      thisComment.className = 'comment';
      let thisDate = document.createElement("p");
      thisDate.textContent = 'Commented on ' + comment.date;
      thisDate.className = 'commentDates';
      commentDiv.insertAdjacentElement("afterBegin", thisComment)
      commentDiv.insertAdjacentElement("afterBegin", thisDate)
      commentForm.insertAdjacentElement("afterEnd", commentDiv);
    }

    newPost.insertAdjacentElement("beforeEnd", commentsBody);

    mainWrapper.insertAdjacentElement("afterBegin", newPost);
    // add comments interface
    newPostComments.addEventListener("click", e => {
      commentsBody.classList.toggle('commentsBody');
    })

    commentSubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      if (commentInput.value != "") {
        createComment(postData.id, commentInput.value);

        let currentdate = new Date();
        let thisComment = document.createElement("p");
        let commentDiv = document.createElement("div");
        commentDiv.className = 'commentDiv';
        thisComment.textContent = commentInput.value;
        thisComment.className = 'comment';
        let thisDate = document.createElement("p");
        thisDate.textContent = 'Commented on ' + currentdate.toString().slice(0, 24);
        thisDate.className = 'commentDates';
        commentDiv.insertAdjacentElement("afterBegin", thisComment)
        commentDiv.insertAdjacentElement("afterBegin", thisDate)
        commentForm.insertAdjacentElement("afterEnd", commentDiv);
      }
      commentInput.value = "";
    })
  }
}

module.exports = {
  getAllPosts,
  createPost,
  sendReact,
}

},{"./index.js":2}],2:[function(require,module,exports){
const app = require('./app');
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Fetch all posts as soon as app is loaded
    app.getAllPosts();
    const newPostBtn = document.querySelector(".newPostBtn");
    const cancelPostBtn = document.querySelector("#cancelBtn");
    const addGifBtn = document.querySelector("#addGifBtn");

    // giphy API key
    let APIKEY = "T20UHWhHXbf47QtXnYSnHXJrYkeOXam3";

    // create post button
    newPostBtn.addEventListener('click', (e) => {
        document.getElementById("createPost").style.display = 'flex';
        document.getElementById("formBg").style.display = 'block';
        newPostBtn.classList.toggle("newPostBtnDisabled", true);
        
        // send post data
        const postForm = document.querySelector("#createPost > #postForm > form")
        postForm.addEventListener('submit',(e) => {
            e.preventDefault();
            app.createPost();
            closeCreatePost();
        })
        
        // giphy
        addGifBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById("gifForm").style.display = 'block';
        });

        document.getElementById("btnSearch").addEventListener("click", e => {
            e.preventDefault(); //to stop the page reload
            let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
            let str = document.getElementById("gifSearch").value.trim();
            url = url.concat(str);
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    //  data, pagination, meta
                    if (document.getElementById("newPostFormImg")) {
                        let img = document.getElementById("newPostFormImg");
                        img.src = content.data[0].images.downsized.url;
                        img.alt = content.data[0].title;
                    }
                    else {
                        let img = document.createElement("img");
                        img.id = 'newPostFormImg';
                        img.src = content.data[0].images.downsized.url;
                        img.alt = content.data[0].title;
                        let out = document.querySelector("#gifForm");
                        out.insertAdjacentElement("afterend", img);
                    }
                    document.querySelector("#gifSearch").value = "";
                })
                .catch(err => {
                    console.error(err);
                });
        });

        cancelPostBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCreatePost();
        });
    });    

    function closeCreatePost(){
        document.getElementById("createPost").style.display = 'none';
        document.getElementById("formBg").style.display = 'none';
        newPostBtn.classList.toggle("newPostBtnDisabled", false);
        if (document.getElementById("newPostFormImg")) {
            document.getElementById("newPostFormImg").remove();
        }
        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";
    }

    module.exports = { closeCreatePost,  init }
}



},{"./app":1}]},{},[2]);
