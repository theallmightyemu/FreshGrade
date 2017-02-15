Fresh Grade Tech Test
By Deryk Schneider

Instructions:
Choose your favorite web framework (Undertow, NodeJS etc) and implement a Rest API for the following proposed application and deploy it to a cloud provider (Google, Azure or AWS) using their free hosting tier (You will need a credit card).
Please pay close attention to the route to create a student.
The implementation should parse the name as entered into a separate firstname and lastname. Simple example name strings, "last, first" or "first last".
Note that this can be surprisingly difficult, you should think about all the ways in which names don't conform well to simple lastname, firstname carefully.
A PDF is attached that should guide candidates to complete this assessment.
After completing please send us the full URL to the REST API endpoint and source code.

In addition to the above we want to record data about the user and metrics that can be used to improve the app.

This project took me approximately 8 hours over 3 days to teach myself Express and get 80%+ of the project done.
Given another 8-10 hours I could implement 100% plus I could probably squeeze in value add features like edit student, activity usage metrics and api security.
But I said Wednesday delivery so I hope you can see the vision I had for this project.

Directions:
insall Node and Express.
run `node server/server.js`
open client/index.html in browser

Project Structure:
README.md
Design.pdf
client
	app.js
	index.html
	style.css
server
	server.js
	controller.js
	routes.js
	images
		1.jpg
		0.jpg
		default.jpg
node_modules
	...

Dependancies:
Node
Express
Jquery
Angular

Constraints:
LastName should be 1 word (no spaces, hyphenated last names ok)
add student name assumes 1 word before a comma is last name OR last word is last name.
all non last name words are given names or first names.
profile pic is optional

Basic html structure of teacher app design:
homepage:
	'Student Management App',
	'View Student List', 'Add Student'
addStudent:
	'< Menu' (back to homepage), 'Add Student', 'Save' (to REST api, log usage report),
	'Get Random Student' (auto fill fields from https://randomuser.me/),
	'Add Profile Pic',
	'Enter First And Last Name' (multi-format)
studentList:
	'< Menu' (back to homepage), 'Student List', 'Add Student'
	list of students
		'firstName', 'lastName', 'Delete' (confirm), 'Open'
studentDetail:
	'< Menu', 'Student Info', 'Delete' (confirm)
	picture
	'FirstName'
	'LastName'

For this project I used references online at:
http://stackoverflow.com/
https://www.w3schools.com
https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm

