
let express = require('express');
let Employee = require('../models/EmployeeModel');
// let ac = require('../AccessControlModule/grantpermissions');

module.exports =  function(details) {

    let record = new Employee(details);
    record.save((err)=> {
        if(err) {
            console.log(err);
        }
    });
    // Employee.create(details,(err,record)=> {
        
    //     if(err) {
    //         console.log('error : ',err);
    //     }else{
    //         console.log(record);
    //     }
    // });
}