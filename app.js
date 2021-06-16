let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let nodemon = require('nodemon');
const Student = require('./models/StudentModel');
let app = express();
let router = express.Router();
const port = 80;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/studentdb',{
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
    let {name,cgpa,yog,branch} = req.body;

    let details = {
        name,
        cgpa,
        yog,
        branch
    };

    let record = await Student.findOne({name: details.name}).catch(error => {
        console.log(error);
    });

    if(record) {
        let updateRecords = require('./OperationModules/update');
        updateRecords(record, details);
    }
    else {
        let insertRecords = require('./OperationModules/insert');
        insertRecords(details);
    }

    res.redirect('/');
});

app.post('/:id/delete',async(req,res)=> {

    let sid = req.params.id;

    let record = await Student.findOne(
        {_id:sid}
    ).then(()=> {
        console.log("RECORD is being deleted!!");
    }).catch(err => {
        console.log(err);
    });

    let deleteRecord = require('./OperationModules/delete');
    deleteRecord(record);

    res.redirect('/');
});

app.listen(port,()=> {
    console.log("The server is connected to ",`${port}`);
});

