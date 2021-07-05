
let bcrypt = require('bcrypt');
let express = require('express');
let session = require('express-session');
let encrypt = require('mongoose-encryption');
let router = express.Router();
let Employee = require('../models/EmployeeModel');
let insertRecords = require('../OperationModules/insert');
let updateRecords = require('../OperationModules/update');
let deleteRecord = require('../OperationModules/delete');
let isLoggedIn = require('../Middlewares/middleware');

router.get('/',async(req,res)=> {

    console.log(req.session.user_id);

    if(req.session.user_id != null) {
        console.log('Already logged in');
        let record = await Employee.findOne({_id : req.session.user_id}).lean().sort({incr : -1}).catch(error => {
            console.log(error);
        });
        res.render('home',{record : record, empid: req.session.user_id});
    } else {
        console.log('Not logged in yet');
        res.render('home',{empid: null});
    }
});

router.get('/signup',(req,res)=> {
    res.render('signup');
}); 

router.post('/signup',async(req,res)=> {

    let fname = req.body.fname;
    let lname = req.body.lname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    
    let records = await Employee.find({}).catch(err=>{
        console.log(err);
    });

    let saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds).catch(err=> {
        console.log('salt-error : ', err);
    });
    let hash = await bcrypt.hash(password,salt).catch(err=> {
        console.log('hash-error : ', err);
    });;

    let details = {
        fname,
        lname,
        commonname: username,
        email,
        password: JSON.stringify(hash),
        field1: 'a',
        field2: 'a',
        field3: 'a',
        field4: 'a',
        field5: 'a',
        field6: 'a',
        field7: 'a',
        field8: 'a',
        field9: 'a',
        field10: 'a',
        field11: 'a',
        field12: 'a',
        field13: 'a',
        field14: 'a',
        field15: 'a',
        field16: 'a',
        field17: 'a',
        field18: 'a',
        field19: 'a',
        field20: 'a',
        field21: 'a',
        field22: 'a',
        field23: 'a'
    };

    if(records == null) {
        details.incr = 1;
    } else {
        details.incr = records.length + 1;
    }

    details.username = username + JSON.stringify(details.incr);
    
    insertRecords(details);
    console.log('signup successful!');
    console.log('Username assigned to you is',details.username);

    // let findRecord = await Employee.find({}).lean().sort({incr : -1}).limit(1).catch(err=> {
    //     console.log(err);
    // });

    // console.log(findRecord);

    // req.session.user_id = findRecord._id;

    res.redirect('/');
}); 

router.get('/login',async(req,res)=> {
    res.render('login');
}); 

router.post('/login',async(req,res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let searchRecord = new Employee({username,password});

    let records = await Employee.find({}).catch(err=> {
        console.log(err);
    });

    records.decrypt((err)=> {

        if(err) {
            return handleError(err);
        } 

        console.log(records);
    });

    records.sort(function(r1,r2) {
        return (r1.username - r2.username);
    });

    let record = records.find(searchRecord);

    if(record == undefined) {
        console.log('Username not found!');
        res.redirect('/login');

    } else {

        // console.log(record);

        // record.decrypt((err)=> {
        //     if(err) {
        //         throw err;
        //     }
        //     console.log(record);
        // }).catch((err)=> {
        //     console.log(err);
        // });

        console.log(password,record.password);
        let check = await bcrypt.compare(password,record.password).catch((err)=> {
            console.log("password authentication : ",err);
        });

        if(check == false) {
            console.log('Password incorrect!');
            res.redirect('/login');
        }

        console.log('Login successful!');
        req.session.user_id = record._id;
        console.log(req.session.user_id);
        // res.redirect('/auth');
        res.redirect('/');
    }
}); 

router.get('/auth',isLoggedIn,async(req,res)=> {
    res.render('otpverify') ;
});

// yet to be completed
router.post('/auth',async(req,res)=>{
    let {otp} = req.body;
// authentication using bcrypt - done
//     sha
// md5
// encrytion 128
// or advance 256
// check for load capacity of database by performing data insertion operations maximum upto 10000 times
});

router.get('/update/:id',isLoggedIn,async(req,res)=> {
    
    let eid = req.params.id;
    let record = await Employee.findOne({_id:eid}).sort({'incr':1,'username':1}).lean().catch(err => {
        console.log(err);
    });
    res.render('updateData',{record: record});
});

router.post('/update/:id',(req,res)=> {

    let incr = req.params.id;
    let {username,email} = req.body;
    let details = {
        username,
        email
    };

    updateRecords(id,details);
    res.redirect('/');
})

router.post('/delete/:id',isLoggedIn,(req,res)=> {

    let id = req.params.id;
    
    deleteRecord(id);
    res.redirect('/');
});

module.exports = router;