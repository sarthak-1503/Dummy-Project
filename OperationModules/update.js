
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(sid,details) {

    Student.findByIdAndUpdate(
        sid, {$set : details}
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}