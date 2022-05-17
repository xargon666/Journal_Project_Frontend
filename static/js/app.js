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

function createComment(postId) {
  const route = "/posts";
}

function sendReact(postId, emojiId) {
  const route = "/posts/emojis";

  const postData = {
    post: {
      id: postId
    },
    emoji: String(emojiId),
  };

console.log(postData)
console.log(postId);
console.log(emojiId);
console.log(JSON.stringify(postData))

  // const postData = {
  //   "post": {
  //     "id": "ajdj-sds2-sdsd"
  //       },
  //   "emoji": "2"
  // }

  console.log(postData)
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
    // .then(data => {
    //   console.log(data)
    //   const allPosts = mainWrapper.querySelector(".post")
    //   const targetPost = allPosts.find(post => post.id === `post-${postId}`)
    //   const reactions = targetPost.querySelector('.reactions')
    //   let targetReaction
    //   switch(emojiId){
    //     case 0:
    //       targetReaction = reactions.querySelector('rofl').slice(2)++
    //       break;
    //     case 1:
    //       targetReaction = reactions.querySelector('thumbsUp').slice(2)++
    //       break;
    //     case 2:
    //       targetReaction = reactions.querySelector('hankey').slice(2)++
    //       break;
    //   }
    // })
    // .then(getAllPosts())
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
      laugh.textContent += `${postData.reactions.laugh} 🤣`;
      laugh.addEventListener('click', () => {
        sendReact(postData.id,0)
        laugh.textContent = `${parseInt(laugh.textContent, 10)+1} 🤣`
      })
      
    }
    if (postData.reactions.thumbUp) {
      thumbsUp.textContent += `${postData.reactions.thumbUp} 👍`;
      thumbsUp.addEventListener('click', () => {
        sendReact(postData.id,1)
        thumbsUp.textContent = `${parseInt(thumbsUp.textContent, 10)+1} 👍`
      })
      
    }
    if (postData.reactions.poo) {
      hankey.textContent += `${postData.reactions.poo} 💩`;
      hankey.addEventListener('click', () => {
        sendReact(postData.id,2)
        hankey.textContent = `${parseInt(hankey.textContent, 10)+1} 💩`
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
    newPostReactions.appendChild(laugh);
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
  }
}

module.exports = {
  getAllPosts,
};


