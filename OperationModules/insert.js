
let express = require('express');
let Employee = require('../models/EmployeeModel');
// let ac = require('../AccessControlModule/grantpermissions');

module.exports = async function(details) {

    let record = new Employee(details);
    await record.save((err)=> {
        if(err) {
            console.log(err);
        }
        // console.log(record.username);
        // console.log(record.incr);
        // console.log(record.email);
        // console.log(record.fname);
        // console.log(record.lname);
        // console.log(err);
    });
    // Employee.create(details,(err,record)=> {
        
    //     if(err) {
    //         console.log('error : ',err);
    //     }else{
    //         console.log(record);
    //     }
    // });
}