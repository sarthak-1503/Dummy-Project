
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(sid) {

    Student.findByIdAndRemove(
        sid
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}