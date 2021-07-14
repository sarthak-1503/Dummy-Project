if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let nodemon = require('nodemon');
let session = require('express-session');
// var Keycloak = require('keycloak-connect');
let MongoStore = require('connect-mongo');
let Employee = require('./models/EmployeeModel');
let middleware = require('./Middlewares/middleware');
let ac = require('./AccessControlModule/grantpermissions');
let router = require('./routes/routes');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const dbUrl = process.env.DBURL || 'mongodb://localhost:27017/myFirstDatabase';
const secret = process.env.SECRET || 'betterkeepitasasecret';
let port = process.env.PORT || 3000;
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

// let memoryStore = new session.MemoryStore();
// app.use(session({
//     secret: 'sessionforkeycloak',
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore
// }));
// let keycloak = require('./Config/keycloak-config').initKeycloak(memoryStore);
// app.use(keycloak.middleware());

app.use('/',router);

let insertRecords = require('./OperationModules/insert');

let t1, t2;
t1 = new Date().getTime()/1000;

for(let i=1;i<=50000;i++) {
    insertRecords({
        id : i,
        fname: 'john',
        lname: 'singh',
        commonname: 'john',
        username: ('john' + JSON.stringify(i)),
        email: 'john@gmail.com',
        password: 'load-testing',
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
    });
}
console.log('Data inserted!');

t2 = new Date().getTime()/1000 - t1;
console.log(t2);

// Employee.deleteMany({}).catch((err)=> {
//     console.log(err);
// });

app.get('/displayall',async(req,res)=> {
    console.time('displaytime');
    let records = await Employee.find({}).lean().catch((err)=> {
        console.log(err);
    });
    console.log('display time : ');
    console.timeEnd('displaytime');
    res.render('displayall',{records: records});
});

app.get("/logout",async(req,res)=> {

    req.session.destroy();
    console.log('Logged out successfully!')

    res.redirect("/");
});

port = Math.floor(Math.random()*9000+1000);

app.listen(port,()=> {
    console.log("The server is connected to",`${port}`);
});

