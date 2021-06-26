
let express = require('express');
let Employee = require('../models/EmployeeModel');

module.exports = function(sid,details) {

    Employee.findByIdAndUpdate(
        sid, {$set : details}
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}