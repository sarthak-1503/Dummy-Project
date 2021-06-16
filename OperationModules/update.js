
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(record,details) {

    Student.updateOne(
        record, {$set : details}
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}