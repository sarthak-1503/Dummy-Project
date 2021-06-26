
let express = require('express');
let router = express.Router();
let Employee = require('../models/EmployeeModel');
// let keycloak = require('../config/keycloak-config.js').getKeycloak();
let insertRecords = require('../OperationModules/insert');
let updateRecords = require('../OperationModules/update');
let deleteRecord = require('../OperationModules/delete');
let https = require('https');

router.get('/',async(req,res)=> {

    let records = await Employee.find({}).catch(error => {
        console.log(error);
    });

    res.render('home',{records : records});
});

router.get('/signup',(req,res)=> {
    res.render('signup');
}); 

router.post('/signup',async(req,res)=> {

    let {fname,lname,username,email,password,confirmpass} = req.body;
    let id;
    let record = await Employee.find({}).catch(err=>{
        console.log(err);
    });

    if(record.length == 0) {
        id = 1;
    }else{
        id = record.length + 1;
    }

    let details = {
        id,
        fname,
        lname,
        username,
        email,
        password
    };
    
    insertRecords(details);
    console.log(details);

    const options = {
        hostname: 'http://localhost',
        port: 8080,
        path: '/auth/admin/realms/Demo/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJEbVh2LXQzWlJNaXFEZDA5WjNrZUNab3hRVUZuQW9IQkV1eHk4QTFyOWdnIn0.eyJleHAiOjE2MjQ3NzMxNzUsImlhdCI6MTYyNDczNzE3OCwianRpIjoiNTMwNmQzNjAtZWNmMS00ZWE1LTgxNGMtNzViM2M4N2JjNTc2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0RlbW8iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjE5MDkzZGEtZmU1MS00Nzc5LWI1N2MtZjUzMWVkMGQ5NmUzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGVtby1wcm9qZWN0Iiwic2Vzc2lvbl9zdGF0ZSI6IjliNTE0ZDlmLTlhMjItNGVjMi04M2E5LWMyZDVlZGYzNTQ5YSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtZGVtbyIsInVtYV9hdXRob3JpemF0aW9uIiwiYXBwLXVzZXIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJkZW1vLXByb2plY3QiOnsicm9sZXMiOlsidXNlciJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImVtcGxveWVlMSJ9.UhU_c-_Oi71FKPo2pbCtdeYIY-ppF5gcDGTTn1XjyIfIvpcS8YVT8_WAWWWLS2YrjAoRFHKBnJeyB5wD3-bfX6tXeH0skbRhwuAHij-Ieccif5QTn8QucaFuM-a9PO3DWZkVHWelskoSmz6WIAuTjHJ9lgHsz1286Yv5471Of1Zy_CgZ1mz4I_gdn2eHl7Pa_xnc2Rkf362IKWgavEOsv1bBc-SkbVKtqdSpTaTUKzOpL10txxAnJ-hUpUJlDIYJuoktHZNHowz_BfJ6qzmCjSNnacsnoPwKBoSfRzgL_0X7htWIfkGkOEo7qtsir0qChtFAKJBAWccbVDTyBW8VhA'
        },
        data_raw: {
            'First Name': fname,
            'Second Name': lname,
            'grant_type':'password',
            'client_id': 'demo-project',
            'Username': username,
            'Email': email
        }
    }

    console.log(options);
    
    const rqst = https.request(options, resp => {
        console.log(`statusCode: ${resp.statusCode}`);
    });
    
    rqst.on('error', error => {
        console.error(error);
    });

    res.redirect('/');
}); 

router.get('/login',(req,res)=> {
    res.render('login');
}); 

router.post('/login',(req,res)=> {
    
}); 

router.get('/update/:id',async(req,res)=> {
    
    let id = req.params.id;
    let record = await Employee.findById(id).catch(err => {
        console.log(err);
    });
    res.render('updateData',{record: record});
});

router.post('/update/:id',(req,res)=> {

    let id = req.params.id;
    let {username,email} = req.body;
    let details = {
        username,
        email
    };

    updateRecords(id,details);
    res.redirect('/');
})

router.post('/delete/:id',(req,res)=> {

    let id = req.params.id;
    
    deleteRecord(id);
    res.redirect('/');
});

module.exports = router;