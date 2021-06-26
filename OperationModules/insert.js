
let express = require('express');
let Employee = require('../models/EmployeeModel');
let ac = require('../AccessControlModule/grantpermissions');

module.exports = function(details) {

    Employee.create(
        details
    ).then(()=> {
        console.log('New record created!!');
    }).catch(error => {
        console.log(error);
    });
}