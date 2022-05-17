/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')


describe('index.html', () =>{
	beforeEach(() =>{
	document.documentElement.innerHTML = html.toString();
	})

	describe('form', () =>{
		let form;
		let textInput;

		beforeEach(() =>{
			form = document.querySelector('form')
			textInput = form.querySelector('[type="text"]')
			submitBtn = form.querySelector('[type="submit"]')
		})

		//Tests...

		describe('Tests description', () =>{
			test('it exists', () =>{
				expect(form).toBeTruthy()
			})
			test('Check for id/attributes')
				expect(textInput.(id | getAttribute())).toBe('xxx')

            })
	})
})
