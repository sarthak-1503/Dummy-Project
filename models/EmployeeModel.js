
let mongoose = require('mongoose');
let encrypt = require('mongoose-encryption');

//Schema
let employeeSchema = new mongoose.Schema({
    incr : {
        type: Number,
        required: true,
        default: 0
    },
    fname: {
        type: String,
        required: true,
        default: ''
    },
    lname: {
        type: String,
        required: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        default: ''
    },
    commonname: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    field1: {
        type: String,
        required: true,
        default: ''
    },
    field2: {
        type: String,
        required: true,
        default: ''
    },
    field3: {
        type: String,
        required: true,
        default: ''
    },
    field4: {
        type: String,
        required: true,
        default: ''
    },
    field5: {
        type: String,
        required: true,
        default: ''
    },
    field6: {
        type: String,
        required: true,
        default: ''
    },
    field7: {
        type: String,
        required: true,
        default: ''
    },
    field8: {
        type: String,
        required: true,
        default: ''
    },
    field9: {
        type: String,
        required: true,
        default: ''
    },
    field10: {
        type: String,
        required: true,
        default: ''
    },
    field11: {
        type: String,
        required: true,
        default: ''
    },
    field12: {
        type: String,
        required: true,
        default: ''
    },
    field13: {
        type: String,
        required: true,
        default: ''
    },
    field14: {
        type: String,
        required: true,
        default: ''
    },
    field15: {
        type: String,
        required: true,
        default: ''
    },
    field16: {
        type: String,
        required: true,
        default: ''
    },
    field17: {
        type: String,
        required: true,
        default: ''
    },
    field18: {
        type: String,
        required: true,
        default: ''
    },
    field19: {
        type: String,
        required: true,
        default: ''
    },
    field20: {
        type: String,
        required: true,
        default: ''
    },
    field21: {
        type: String,
        required: true,
        default: ''
    },
    field22: {
        type: String,
        required: true,
        default: ''
    },
    field23: {
        type: String,
        required: true,
        default: ''
    }
});
employeeSchema.index({incr : 1, username : 1});

let ekey = process.env.E_KEY;
let skey = process.env.S_KEY;
employeeSchema.plugin(encrypt,{encryptionKey:ekey ,signingKey:skey, excludeFromEncryption:['incr']});
// decryptPostSave:false

//Model
let Employee = mongoose.model('Employees',employeeSchema,'Employee');

module.exports = Employee;