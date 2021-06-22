
let express = require('express');

let requireLogin = (req,res,next)=> {
    req.session.returnto = req.url;

    if(!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
}

module.exports = requireLogin;