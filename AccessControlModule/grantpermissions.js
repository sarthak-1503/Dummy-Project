
let accesscontrol = require('accesscontrol');
let ac = new accesscontrol();

ac.grant('employee')
    .createOwn('resource')
    .readOwn('resource')
    .updateOwn('resource')
    .deleteOwn('resource')

ac.grant('admin')
    .extend('employee')
    .readAny('resource')
    .updateAny('resource')
    .deleteAny('resource')

// const permission = ac.can('admin').readAny('resource');
// console.log(permission.granted);

module.exports = ac;