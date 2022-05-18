/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
let js;
let app;

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
        app = require('../static/js/app');
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
});

describe('app.js',()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        js = require('../static/js/index');
        app = require('../static/js/app');
    })

    test('append post', () => {
        let initialPosts = document.querySelectorAll('.post').length;
        app.appendPost(testPost);
        expect(document.querySelectorAll('.post').length).toEqual(initialPosts + 1);
    })
})
