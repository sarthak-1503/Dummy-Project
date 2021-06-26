
let mongoose = require('mongoose');

//Schema
let employeeSchema = new mongoose.Schema({
    id : Number,
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String
});

//Model
let Employee = mongoose.model('Employees',employeeSchema,'Employee');

module.exports = Employee;