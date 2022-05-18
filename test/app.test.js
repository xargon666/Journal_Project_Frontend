/**
 * @jest-environment jsdom
 */

const testPost = {
  title: "test title",
  body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, quasi?",
  link: "#",
};

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

const app = require("../static/js/app.js")

describe("app.js function test", () => {
  describe("test fire the createPost function", () => {
    beforeAll(() => {
      document.documentElement.innerHTML = html.toString();
      const testPost = {
        title: "test title",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, quasi?",
        link: "#",
      };
      let postForm = document.querySelector("#postForm");
      let postTitle = postForm.querySelector("#postTitle");
      let postContent = postForm.querySelector("#postContent");
      postTitle.textContent = testPost.title;
      postContent.textContent = testPost.body;
    });
    describe("form is setup for activation",()=>{
        test("post form element exists", () => {
        expect(postForm).toBeTruthy();
        });

        test("post form has title",()=>{
            expect(postTitle.textContent).toBeTruthy()
        })
        test("post form has content",()=>{
            expect(postContent.textContent).toBeTruthy()
        })
    // describe("create post function returns data",()=>{
    //     test("function executes",()=>{
    //         // expect(createPost).to return something
    //     })
    // })
    })
  });
});
