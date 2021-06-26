
let express = require('express');
let Employee = require('../models/EmployeeModel');

module.exports = function(sid) {

    Employee.findByIdAndRemove(
        sid
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}