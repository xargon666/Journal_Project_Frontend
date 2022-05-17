document.addEventListener("DOMContentLoaded", init);

function init() {

    const newPostBtn = document.querySelector(".newPostBtn");
    const cancelPostBtn = document.querySelector("#cancelBtn");
    const addGifBtn = document.querySelector("#addGifBtn");

    let APIKEY = "T20UHWhHXbf47QtXnYSnHXJrYkeOXam3";

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

    let comments = document.querySelectorAll('.comments');
    comments.forEach(comment => {
        comment.addEventListener("click", e => {
            let out = comment.parentNode.parentElement;
            console.log(out);
            console.log(document.querySelector('.commentsBody'));
            if(!out.contains(document.querySelector('.commentsBody'))){
                let div = document.createElement('div');
                div.className = 'commentsBody';
                let header = document.createElement('h3');
                header.textContent = 'Comments';
                div.appendChild(header);
                out.insertAdjacentElement("beforeend", div);
            }
            else{
                document.querySelector('.commentsBody').remove();
            }
        })
    })
}
