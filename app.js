if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let nodemon = require('nodemon');
let session = require('express-session');
let MongoStore = require('connect-mongo');
let Student = require('./models/StudentModel');
let app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/studentdb';
const secret = process.env.SECRET || 'betterkeepitasasecret';
const port = process.env.PORT || 3000;
app.set("port",port);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*3600
});

store.on('error',(e) => {
    console.log('Error while connecting to mongo :',e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUnitialized: true
};

app.use(session(sessionConfig));

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false 
});


// Student.insertMany([
//     {
//         name : 'ABC',
//         cgpa : 8.5,
//         yog : 2022,
//         branch : 'COE'
//     },
//     {
//         name : 'DEF',
//         cgpa : 8.6,
//         yog : 2022,
//         branch : 'MCE'
//     },
//     {
//         name : 'GHI',
//         cgpa : 8.7,
//         yog : 2022,
//         branch : 'COE'
//     },
//     {
//         name : 'JKL',
//         cgpa : 8.5,
//         yog : 2022,
//         branch : 'SE'
//     },
//     {
//         name : 'MNO',
//         cgpa : 8.4,
//         yog : 2022,
//         branch : 'COE'
//     },
//     {
//         name : 'PQR',
//         cgpa : 8.3,
//         yog : 2022,
//         branch : 'SE'
//     },
//     {
//         name : 'STU',
//         cgpa : 8.5,
//         yog : 2022,
//         branch : 'MCE'
//     },
//     {
//         name : 'VWX',
//         cgpa : 9.0,
//         yog : 2022,
//         branch : 'COE'
//     },
//     {
//         name : 'YZA',
//         cgpa : 8.8,
//         yog : 2022,
//         branch : 'SE'
//     },
//     {
//         name : 'BCD',
//         cgpa : 9.2,
//         yog : 2022,
//         branch : 'MCE'
//     }
// ]).then(()=> {
//     console.log("Insertion of data successful!!");
// }).catch((error)=> {
//     console.log(error);
// });

app.get('/',async(req,res)=> {

    let records = await Student.find({}).catch(error => {
        console.log(error);
    });

    res.render('home',{year: new Date().getFullYear(),records : records});
});

app.post('/',async(req,res)=> {
    
    let details = {};

    if(req.body.name != "" && req.body.name != null) {
        details.name = req.body.name;
    }

    if(req.body.cgpa != 0 && req.body.cgpa != null) {
        details.cgpa = req.body.cgpa;
    }

    if(req.body.yog != null && req.body.yog != 0) {
        details.yog = req.body.yog;
    }

    if(req.body.branch != "" && req.body.branch != null) {
        details.branch = req.body.branch;
    }

    let record = await Student.findOne(
        {name : req.body.name}
    ).catch(err => {
        console.log(err);
    });

    if(record) {
        let updateRecords = require('./OperationModules/update');
        updateRecords(details);
    }
    else {
        let insertRecords = require('./OperationModules/insert');
        insertRecords(details);
    }

    res.redirect('/');
});

app.post('/delete/:id',(req,res)=> {

    let sid = req.params.id;

    let deleteRecord = require('./OperationModules/delete');
    deleteRecord(sid);

    res.redirect('/');
});

app.listen(port,()=> {
    console.log("The server is connected to ",`${port}`);
});

