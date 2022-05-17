// // ********************************************
// // DEV
// const app = require('./app')
// ********************************************
// SETUP
const postLink = document.querySelectorAll('.postBody>.postTitle>a');
const newPostBtn = document.querySelector('#newPostBtn');
const cancelPostBtn = document.querySelector("#cancelBtn");

newPostBtn.addEventListener('click', (e) => {
    document.getElementById("createPost").style.display = 'flex';
    document.getElementById("formBg").style.display = 'block';
    newPostBtn.classList.toggle("newPostBtnDisabled", true);
});

cancelPostBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("createPost").style.display = 'none';
    document.getElementById("formBg").style.display = 'none';
    newPostBtn.classList.toggle("newPostBtnDisabled", false);
});


// Bind event listeners
// postLink.addEventListener('click', getPost);
// newPostBtn.addEventListener('click', createPost);

// Fetch all cats as soon as app is loaded
app.getAllPosts();
// ********************************************
