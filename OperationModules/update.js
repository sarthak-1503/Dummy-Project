
let express = require('express');
let Student = require('../models/StudentModel');

module.exports = function(details) {

    Student.updateOne(
        {name:details.name}, {$set : details}
    ).then(()=> {
        console.log('record updated!!');
    }).catch(error => {
        console.log(error);
    });
}