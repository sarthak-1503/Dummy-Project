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
var Keycloak = require('keycloak-connect');
let MongoStore = require('connect-mongo');
let Employee = require('./models/EmployeeModel');
let middleware = require('./Middlewares/middleware');
let ac = require('./AccessControlModule/grantpermissions');
let router = require('./routes/routes');

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

let memoryStore = new session.MemoryStore();
app.use(session({ 
    secret: 'sessionforkeycloak', 
    resave: false, 
    saveUninitialized: true, 
    store: memoryStore 
}));
let keycloak = require('./Config/keycloak-config').initKeycloak(memoryStore);
app.use(keycloak.middleware());

app.use('/',router);

app.listen(port,()=> {
    console.log("The server is connected to ",`${port}`);
});

