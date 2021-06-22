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
let middleware = require('./Middlewares/middleware');
let ac = require('./AccessControlModule/grantpermissions');
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


app.get('/',async(req,res)=> {

    let records = await Student.find({}).catch(error => {
        console.log(error);
    });

    res.render('home',{year: new Date().getFullYear()+1,records : records});
});

// Checking roles and permissions for the concerned user
//create login for each user (bcrypt) and check for user permissions after login using accessControl
// const ac = new AccessControl(grants);
// // ...
// router.get('/videos/:title', function (req, res, next) {
//     const permission = ac.can(req.user.role).readAny('video');
//     if (permission.granted) {
//         Video.find(req.params.title, function (err, data) {
//             if (err || !data) return res.status(404).end();
//             // filter data by permission attributes and send.
//             res.json(permission.filter(data));
//         });
//     } else {
//         // resource is forbidden for this user/role
//         res.status(403).end();
//     }
// });

app.post('/add',async(req,res)=> {
    
    let {name,cgpa,yog,branch} = req.body;
    let record = await Student.find({}).catch(err => {
        console.log(err);
    });
    let id;
    console.log(record);
    
    if(record.length == 0)
    {
        id = 1;
    }
    else
    {
        id = record[record.length-1].id+1;
    }

    let details = {
        id,
        name,
        cgpa,
        yog,
        branch
    };

    let insertRecords = require('./OperationModules/insert');
    insertRecords(details);
    console.log(details);

    let permissions = ac.can('employee').readOwn('resource');
    console.log(permissions.granted);

    res.redirect('/');
});

app.get('/update/:id',async(req,res)=> {
    
    let sid = req.params.id;
    let record = await Student.findById(sid).catch(err => {
        console.log(err);
    });
    res.render('updateData',{record: record,year:new Date().getFullYear()+1});
});

app.post('/update/:id',(req,res)=> {

    let sid = req.params.id;
    let {name,cgpa,yog,branch} = req.body;
    let details = {
        name,
        cgpa,
        yog,
        branch
    };

    let updateRecords = require('./OperationModules/update');
    updateRecords(sid,details);
    res.redirect('/');
})

app.post('/delete/:id',(req,res)=> {

    let sid = req.params.id;
    let deleteRecord = require('./OperationModules/delete');
    deleteRecord(sid);
    res.redirect('/');
});

app.listen(port,()=> {
    console.log("The server is connected to ",`${port}`);
});

