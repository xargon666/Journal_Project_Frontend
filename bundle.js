(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// ********************************************
// SETUP
// Post Buttons
// const postLink = document.querySelectorAll('.postBody>.postTitle>a');
// const newPostBtn = document.querySelector('#newPostBtn');
// const cancelPostBtn = document.querySelector("#cancelBtn");
// const addGifBtn = document.querySelector("#addGifBtn");

// newPostBtn.addEventListener('click', (e) => {
//     document.getElementById("createPost").style.display = 'flex';
//     document.getElementById("formBg").style.display = 'block';
//     newPostBtn.classList.toggle("newPostBtnDisabled", true);
// });

// addGifBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById("gifForm").style.display = 'block';
// });

// cancelPostBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById("createPost").style.display = 'none';
//     document.getElementById("formBg").style.display = 'none';
//     newPostBtn.classList.toggle("newPostBtnDisabled", false);
//     if(document.getElementById("newPostFormImg")){
//         document.getElementById("newPostFormImg").remove();
//     }
// });


// // giphy script
// let APIKEY = "T20UHWhHXbf47QtXnYSnHXJrYkeOXam3";

// document.getElementById("btnSearch").addEventListener("click", e => {
//     e.preventDefault(); //to stop the page reload
//     let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
//     let str = document.getElementById("gifSearch").value.trim();
//     url = url.concat(str);
//     fetch(url)
//         .then(response => response.json())
//         .then(content => {
//             //  data, pagination, meta
//             if(document.getElementById("newPostFormImg")){
//                 let img = document.getElementById("newPostFormImg");
//                 img.src = content.data[0].images.downsized.url;
//                 img.alt = content.data[0].title;
//             }
//             else{
//                 let img = document.createElement("img");
//                 img.id = 'newPostFormImg';
//                 img.src = content.data[0].images.downsized.url;
//                 img.alt = content.data[0].title;
//                 let out = document.querySelector("#gifForm");
//                 out.insertAdjacentElement("afterend", img);
//             }
//             // fig.appendChild(img);
//             document.querySelector("#gifSearch").value = "";
//         })
//         .catch(err => {
//             console.error(err);
//         });
// });


// Bind event listeners
// postLink.addEventListener('click', getPost);
// newPostBtn.addEventListener('click', createPost);

// Fetch all posts as soon as app is loaded
getAllPosts();
// ********************************************

},{}]},{},[1]);
