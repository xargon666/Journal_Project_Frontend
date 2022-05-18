// /**
//  * @jest-environment jsdom
//  */

//  const fs = require("fs");
//  const path = require("path");
//  const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");

 // describe("index.js", () => {
//   let title;
//   let script;
//   let image;
//   const js = require("../static/js/script");

//   beforeAll(() => {
//     document.documentElement.innerHTML = html.toString();
//     title = document.querySelector("title");
//     });

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
