
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(details) {

    Student.create(
        details
    ).then(()=> {
        console.log('New record created!!');
    }).catch(error => {
        console.log(error);
    });
}