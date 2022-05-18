/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");


describe("index.html Content", () => {
    describe("Post Content", () => {
          document.documentElement.innerHTML = html.toString();
  
          describe.each(Array.from(document.querySelectorAll(".post")))("Post #%#", (e) => {
              it("has title text",()=>{
              let target = e.querySelector(".postWrapper>.postTitle");
              expect(target.textContent).toBeTruthy();
            })
              it("title <= 50 chars",()=>{
               let target = e.querySelector(".postWrapper>.postTitle");
                let charLimit = 50
                expect(target.textContent.length <= charLimit).toBeTruthy();
            })
              it("has body text",()=>{
              let target = e.querySelector(".postWrapper>.preview");
              expect(target.textContent).toBeTruthy();
            })
              it("body text <= 500 chars",()=>{
               let target = e.querySelector(".postWrapper>.preview");
                let charLimit = 500
                expect(target.textContent.length <= charLimit).toBeTruthy();
            })
        });
        });
    });

// describe("\nindex.html", () => {
//   let title;
//   let script;
//   let image;

//   beforeEach(() => {
//     document.documentElement.innerHTML = html.toString();
//     title = document.querySelector("title");
//     const js = require("../static/js/script");
//   });

//   describe("Tests title", () => {
//     test("it exists", () => {
//       expect(title).toBeTruthy();
//     });

//     test('it contains the title "Journal Project"', () => {
//       expect(title.textContent).toContain("Journal Project");
//     });
//   });

//   describe("Tests script tag", () => {
//     it("it is deferred", () => {
//       script = document.querySelector("script");
//       expect(script.getAttribute("defer")).toEqual("");
//     });
//   });

//   describe("Tests img", () => {
//     it("they have alt text", () => {
//       image = document.querySelectorAll("img");
//       let containAlt = 0;
//       image.forEach((img) => {
//         if (img.getAttribute("alt") && img.getAttribute("alt") != "") {
//           containAlt++;
//         }
//       });
//       expect(containAlt).toEqual(image.length);
//     });
//   });
// });
