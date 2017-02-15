/*
@title: Fresh Grade Tech Test
@date: 2017-02-10
@author: Deryk Schneider
@contact: deryk.schneider@gmail.com
@notes: source on git, summary in README.md
*/

// Basic set of REST methods for app features
module.exports = function(app){
    var students = require('./controller');
    app.get('/students', students.findAll);
    app.get('/students/:id', students.findById);
    app.post('/students', students.add);
    app.post('/students/pic', students.addPic);
    app.put('/students/:id', students.update);
    app.delete('/students/:id', students.delete);
    app.post('/students/log', students.log);
    app.get('/students/log', students.metrics);
}
