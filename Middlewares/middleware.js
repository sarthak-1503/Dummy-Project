
let express = require('express');
let session = require('express-session');

let requireLogin = (req,res,next)=> {
    req.session.returnto = req.url;

    if(req.session.user_id == null) {
        return res.redirect('/login');
    }

    next();
}

module.exports = requireLogin;