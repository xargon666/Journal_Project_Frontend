(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      if (!newPost.contains(document.querySelector('.commentsBody'))) {
        let div = document.createElement('div');
        div.className = 'commentsBody';
        let header = document.createElement('h3');
        header.textContent = 'Comments';
        div.appendChild(header);
        newPost.insertAdjacentElement("beforeend", div);
      }
      else {
        document.querySelector('.commentsBody').remove();
      }
    })

    rofl.addEventListener("click", e=>{
      rofl.textContent = `${parseInt(rofl.textContent, 10)+1} 🤣`;
    })

    thumbsUp.addEventListener("click", e=>{
      thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10)+1} 👍`;
    })

    hankey.addEventListener("click", e=>{
      hankey.textContent = `${parseInt(hankey.textContent, 10)+1} 💩`;
    })
  }
}

module.exports = {
  getAllPosts,
};



},{}],2:[function(require,module,exports){
const app = require('./app');
document.addEventListener("DOMContentLoaded", init);

app.getAllPosts();

function init() {

    const newPostBtn = document.querySelector(".newPostBtn");
    const cancelPostBtn = document.querySelector("#cancelBtn");
    const addGifBtn = document.querySelector("#addGifBtn");

    let APIKEY = "T20UHWhHXbf47QtXnYSnHXJrYkeOXam3";

    // Fetch all posts as soon as app is loaded
    

    newPostBtn.addEventListener('click', (e) => {
        document.getElementById("createPost").style.display = 'flex';
        document.getElementById("formBg").style.display = 'block';
        newPostBtn.classList.toggle("newPostBtnDisabled", true);

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
            document.getElementById("createPost").style.display = 'none';
            document.getElementById("formBg").style.display = 'none';
            newPostBtn.classList.toggle("newPostBtnDisabled", false);
            if (document.getElementById("newPostFormImg")) {
                document.getElementById("newPostFormImg").remove();
            }
        });
    });    
}

},{"./app":1}]},{},[2]);