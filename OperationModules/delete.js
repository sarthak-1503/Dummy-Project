
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(record) {

    Student.deleteOne(
        record
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}