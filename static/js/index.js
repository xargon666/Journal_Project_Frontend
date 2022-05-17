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
