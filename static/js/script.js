const newPostBtn = document.querySelector(".newPostBtn");
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
