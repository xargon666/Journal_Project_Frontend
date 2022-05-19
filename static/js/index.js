const app = require('./app');
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Fetch all posts as soon as app is loaded

    app.getAllPosts();
    const newPostBtn = document.querySelector(".newPostBtn");
    const cancelPostBtn = document.querySelector("#cancelBtn");
    const addGifBtn = document.querySelector("#addGifBtn");

    // create post button
    newPostBtn.addEventListener('click', (e) => {
        document.getElementById("createPost").style.display = 'flex';
        document.getElementById("formBg").style.display = 'block';
        newPostBtn.classList.toggle("newPostBtnDisabled", true);

        // send post data
        const postForm = document.querySelector("#createPost > #postForm > form")
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            app.createPost();
            app.closeCreatePost();
        })

        // giphy
        addGifBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById("gifForm").style.display = 'block';
        });

        document.getElementById("btnSearch").addEventListener("click", e => {
            e.preventDefault(); //to stop the page reload
            giphySearch();
        });

        cancelPostBtn.addEventListener('click', (e) => {
            e.preventDefault();
            app.closeCreatePost();
        });
    });

    return;
}
function giphySearch() {
    // giphy API key
    let APIKEY = "T20UHWhHXbf47QtXnYSnHXJrYkeOXam3";

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
}

module.exports = {  giphySearch, init}

