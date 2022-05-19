/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
let js;
const app = require('../static/js/app');
jest.mock('../static/js/app');

const testPost = {
    id: "ajdj-sds2-sdsd",
    title: "Yep sds ",
    body: "updated post sadsadsaasdsadasdasdsadasdasdasdas asdasdasdasdsadasdas asdsadasdasdasdsadasdaskdmklasdjkasldmalskdmasldmlasdmlasdaksdkjdas djadkajdh dasd",
    link: "updated giphy should go here",
    date: "Fri May 6 2022 19:30:00",
    comments: [
        {
            id: 0,
            body: "comment in here blah blah blah",
            link: "link to a giphy should go here",
            date: "ue May 17 2022 13:45:30",
            postRef: "ajdj-sds2-sdsd"
        }
    ],
    reactions: {
        laugh: 22,
        thumbUp: 19,
        poo: 2
    }
};

describe('index.html', () => {
    let title;
    let script;
    let image;

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        // app = require('../static/js/app');
        fetch.resetMocks();
    })

    describe('Tests title', () => {
        test('it exists', () => {
            expect(title).toBeTruthy();
        })

        test('it contains the title "Journal Project"', () => {
            expect(title.textContent).toContain('Journal Project');
        })
    })

    describe('Tests script tag', () => {
        it('it is deferred', () => {
            script = document.querySelector('script');
            expect(script.getAttribute('defer')).toEqual('');
        })
    })

    describe('Tests img', () => {
        it("they have alt text", () => {
            image = document.querySelectorAll('img');
            let containAlt = 0;
            image.forEach((img) => {
                if (img.getAttribute('alt') && img.getAttribute('alt') != '') {
                    containAlt++;
                }
            })
            expect(containAlt).toEqual(image.length);
        })
    })

    //test form is correct
});

describe('index.js',()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        // app = require('../static/js/app');
        fetch.resetMocks();
    })

    test('init calls getAllPosts', ()=>{
        js.init();
        expect(app.getAllPosts).toHaveBeenCalled();
    })

    test('newPostBtn addEventListener works', ()=>{
        js.init();

        const newPostBtn = document.querySelector(".newPostBtn"); 
        
        // dispatch click event to listener
        const addEvt = new Event('click');
        newPostBtn.dispatchEvent(addEvt);
                
        expect(document.getElementById("createPost").style.display).toEqual('flex')
    })

    test(' addEventListener works', ()=>{
        js.init();

        const cancelPostBtn = document.querySelector("#cancelBtn");
        
        // dispatch click event to listener
        const addEvt = new Event('click');
        cancelPostBtn.dispatchEvent(addEvt);
                
        expect(app.closeCreatePost).toHaveBeenCalled();
    })

    // test(' addEventListener works', ()=>{
    //     js.init();

    //     eventTrigger
        
    //     // dispatch click event to listener
    //     const addEvt = new Event('click');
    //     eventTrigger.dispatchEvent(addEvt);
                
    //     expect(document.getElementById("createPost").style.display).toEqual('flex')
    // })

    test('giphySearch makes a fetch', async () => {
        await js.giphySearch();
        expect(fetch).toHaveBeenCalled()
    })

    test('giphySearch makes a fetch call with search term', async () => {
        document.getElementById("gifSearch").value = "test";
        await js.giphySearch();
        console.log(document.getElementById("gifSearch").value)
        expect(fetch).toHaveBeenCalledWith('https://api.giphy.com/v1/gifs/search?api_key=T20UHWhHXbf47QtXnYSnHXJrYkeOXam3&limit=1&q=test')
    })
})
