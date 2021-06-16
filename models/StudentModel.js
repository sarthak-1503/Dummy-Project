
let mongoose = require('mongoose');

//Schema
let studentSchema = new mongoose.Schema({
    name : String,
    cgpa : Number,
    yog : Number,
    branch : String
});

//Model
let Student = mongoose.model('Students',studentSchema,'Student');

module.exports = Student;