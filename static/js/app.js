// search button script
// index.html
const btn1 = document.querySelector('#newPostBtn')
const mainSelector.querySelector('.container')
const resultsURL = "./results.html"

function hideMain(){
    mainSelector.style.display = "none"
}

// important bits
const port = 3000

btn1.addEventListener('click',btn1Fetch)
btn2.addEventListener('click',btn2Fetch)

// Btn-1 Returns 10 results
function btn1Fetch(e){
    console.log("submit button press detected - btn-1")
    // prevent submit button default behaviour
    e.preventDefault()
    hideMain()
    // specify source
    const source = "allfilms" // DATA SOURCE PAGE

    // open new window...
    // openResultsWindow()
    console.log(targetElement)
    fetch(`http://localhost:${port}/${source}`)
    .then(response => response.json())
    .then(data => {
        try {        // do something with searchBar.textContent...
        for (let i = 0;i < 10;i++){
            let newLi = document.createElement('li')
            let output = `
            Title: ${data[i].title}
            Director: ${data[i].director}
            Release Date: ${data[i].release_date}`
            newLi.textContent = output
            targetElement.appendChild(newLi)
        }
    } catch (err) {
        let newLi = document.createElement('li')
        newLi.textContent = "Something when wrong!"
        targetElement.appendChild(newLi)
    }
        console.log(data)
    });
}

// Btn-2 Returns 1 result
function btn2Fetch(e){
    console.log("submit button press detected - btn-2")
    // prevent submit button default behaviour
    e.preventDefault()
    hideMain()
    // specify source
    const source = "random" // DATA SOURCE PAGE

    // open new window...
    // openResultsWindow()

    fetch(`http://localhost:${port}/${source}`)
    .then(response => response.json())
    .then(data => {
        // do something with searchBar.textContent...
        try {
            let newLi = document.createElement('li')
            let output = `
            Title: ${data.title}
            Director: ${data.director}
            Release Date: ${data.release_date}`
            newLi.textContent = output
            targetElement.appendChild(newLi)
        }
        catch(err) {
            let newLi = document.createElement('li')
            newLi.textContent = "Something when wrong!"
            targetElement.appendChild(newLi)
        }
        console.log(data)
    });
}

