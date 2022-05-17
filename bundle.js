(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// search button script
// index.html

const port = 3000;
const siteBackendUrl = `https://journal-project-backend.herokuapp.com`;
const previewLength = 25;
const mainWrapper = document.querySelector(".wrapper");
const mainWrapperDisplayState = mainWrapper.style.display;

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
  const route = "/posts";
  fetch(`${siteBackendUrl}${route}`, options)
    .then((r) => r.json())
    .then(appendPost)
    .catch(console.warn);
}

// helpers
function appendPosts(posts) {
  console.log(posts);
  posts.forEach(appendPost);
}

function appendPost(postData) {
  console.log("appending post...")
  // Create Elements
  let newPost = document.createElement("div");
  let newPostWrapper = document.createElement("div");
  let newPostBody = document.createElement("p");
  let newPostTitle = document.createElement("h2");
  let newPostComments = document.createElement("p");
  let newPostDateTime = document.createElement("p");
  let newPostReactions = document.createElement("p");
  newPost.classList.add("post");
  newPostWrapper.classList.add("postWrapper");
  newPostComments.classList.add("comments");
  newPostDateTime.classList.add("dateTime");
  newPostReactions.classList.add("reactions");

  // Populate
  postData.title && (newPostTitle.textContent = postData.title);
  postData.body && (newPostBody.textContent = postData.body.slice(0, previewLength)); // create preview from message body
  postData.comments && (newPostComments.textContent = `Comments: ${postData.comments.length}`);
  postData.date && (newPostDateTime.textContent = postData.date);
  if (postData.reactions) {
    if (postData.reactions.laugh > 0) {
      newPostReactions.textContent += `🤣 ${postData.reactions.laugh}`;
    }
    if (postData.reactions.laugh > 0) {
      newPostReactions.textContent += `👍 ${postData.reactions.thumbUp}`;
    }
    if (postData.reactions.laugh > 0) {
      newPostReactions.textContent += `💩 ${postData.reactions.poo}`;
    }
  }

  // Append
  //   newPostTitle.appendChild("a");
  if (newPostBody.textContent && newPostTitle.textContent) {
    newPostWrapper.appendChild(newPostTitle);
    newPostWrapper.appendChild(newPostBody);
    newPostWrapper.appendChild(newPostComments);
    newPostWrapper.appendChild(newPostDateTime);
    newPostWrapper.appendChild(newPostReactions);
    newPost.appendChild(newPostWrapper);
    mainWrapper.appendChild(newPost);
  }
}

module.exports = {
  getAllPosts,
};

},{}],2:[function(require,module,exports){
// ********************************************
// DEV
const app = require('./app')
// ********************************************
// SETUP
const postLink = document.querySelectorAll('.postBody>.postTitle>a');
const newPostBtn = document.querySelector('#newPostBtn');


// Bind event listeners
// postLink.addEventListener('click', getPost);
// newPostBtn.addEventListener('click', createPost);

// Fetch all cats as soon as app is loaded
app.getAllPosts();
// ********************************************

},{"./app":1}]},{},[2]);
