
let express = require('express');
let Employee = require('../models/EmployeeModel');

module.exports = function(sid,details) {

    Employee.findByIdAndUpdate(
        sid, {$set : details}
    ).catch(error => {
        console.log(error);
    });
}