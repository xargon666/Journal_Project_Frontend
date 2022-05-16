// ********************************************
// DEV
const app = require('./app')
// ********************************************
// SETUP
const postLink = document.querySelectorAll('.postBody>.postTitle>a');
const newPostBtn = document.querySelector('#newPostBtn');
const mainSelector = document.querySelector(".container");
const mainContainerDisplayState = mainSelector.style.display;

// Bind event listeners
// postLink.addEventListener('click', getPost);
// newPostBtn.addEventListener('click', createPost);

// Fetch all cats as soon as app is loaded
app.getAllPosts();
// ********************************************
