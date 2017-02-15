/*
@title: Fresh Grade Tech Test
@date: 2017-02-10
@author: Deryk Schneider
@contact: deryk.schneider@gmail.com
@notes: source on git, summary in README.md

I have done all the work in this controller for this app.
If this product needed to be more robust I would have encapsulated pieces more effectively.
Also to avoid the dependency of a database I've managed the data in RAM.
*/

// Load in file system manager
var fs = require('fs');

// There was no hard requirement for a database so for time management I used server memory for demo.
// Student records fit well with a large catalog db like mongo. However we probably would not need millions of records for student db.
// However my experience has shown that most businesses want relational data pulled out so a cached mysql db would achieve this.
var students = [
	{
		"id": 0,
		"firstName": "Deryk John",
		"lastName": "Schneider",
		"profilePic": "../server/images/0.jpg"
	},
	{
		"id": 1,
		"firstName": "Donald Tiny Hands",
		"lastName": "Trump",
		"profilePic": "../server/images/1.jpg"
	}
];

// List all students
exports.findAll = function(req, res){
	// Return all elements
	res.send(students);
};
// List 1 students details
exports.findById = function(req, res){
	// Check sanity
	if (typeof req.params.id == 'undefined') {
		res.status(500).send("Failed to provide student ID");
		return;
	}

	var id     = req.params.id;
	var target = undefined;

	// Find and save target
	for (var i = 0, len = students.length; i < len; i++) {
		if (typeof students[i] != 'undefined' && students[i].id == id) {
			target = students[i];
			break;
		}
	}

	// Error if no target found in array
	if (typeof target == 'undefined') {
		res.status(500).send("Failed to find student ID: "+id);
		return;
	}

	res.send(students[id]);
};
// Upload a profile Pic
// This is my 4th attempt at writing a binary file uploader in node express with no luck yet. I think I am close and I can get with more time.
// I have make image uploaders in other languages like php but this was an awesome learning experience.
exports.addPic = function(req, res){
console.log(req.files);
	// Add image sanity checks here
	fs.readFile(req.files.pic.path, function (err, data) {
		var newPath = './images/';

		// Check write file for errors
		fs.writeFile(newPath, data, function (err) {
			res.redirect("back");
		});
	});
}
// Normalize student entry
var normalize = function (student) {
	// Move all student normalizers into here. Things like trim(), banned characters, default imgs, id sanitizing, etc.
	return student;
}
// Create 1 student
// Ideally we can wash the name entirely. Avoid numbers and special characters.
// Some special characters are required for other language names
exports.add = function(req, res){
	// Check sanity
	if (typeof req.body == 'undefined') {
		res.status(500).send("Failed to find request body");
		return;
	}

	var data       = req.body;
	var lastName   = '';
	var firstName  = '';
	var names      = [];
	// Check sanity
	var newID      = typeof students[students.length-1] == 'undefined' ? 1 : students[students.length-1].id+1;
	var defaultImg = "../server/images/default.jpg";


	// Error if no name provided
	if (typeof data.name != 'string') {
		res.status(500).send("Failed to find valid students name string");
		return;
	}

	// name can be [lastname], [given names]
	names = data.name.split(',');

	if (names.length == 2) {
		var student        = {};
		student.lastName   = names[0].trim();
		student.firstName  = names[1].trim();
		student.id         = newID;
		student.profilePic = defaultImg;
		students.push(normalize(student));

		res.send('Added student to list.');
		return;
	}

	// name can be [given names] [lastname]
	names = data.name.split(' ');

	if (names.length > 1) {
		var student        = {};
		student.lastName   = names[names.length-1].trim();
		names.splice(-1,1);
		student.firstName  = names.join(' ').trim();
		student.id         = newID;
		student.profilePic = defaultImg;
		students.push(normalize(student));

		res.send('Added student to list.');
		return;
	}

	// If nothing found error out
	res.status(500).send('Failed to parse out a valid first and last name.');
};
// Update 1 student record
exports.update = function(req, res){
	res.status(404).send('Updating not yet supported.');
};
// Remove 1 student
exports.delete = function(req, res){
	// Check sanity
	if (typeof req.params.id == 'undefined') {
		res.status(500).send("Failed to provide student ID");
		return;
	}

	var id     = req.params.id;
	var target = undefined;

	// Find and remove element
	for (var i = 0, len = students.length; i < len; i++) {
		if (typeof students[i] != 'undefined' && students[i].id == id) {
			target = students.splice(i, 1);
			break;
		}
	}

	// Error if no target to delete
	if (typeof target == 'undefined') {
		res.status(500).send("Failed to find and delete student ID: "+id);
		return;
	}

	res.send("Successfully deleted student ID: "+id);
};
// Logs activity on this api server
exports.log = function(req, res){
	res.status(404).send('Activity logging not yet supported.');
};
// Dumps activity report on this api server
exports.metrics = function(req, res){
	res.status(404).send('Activity metrics reporting not yet supported.');
};
