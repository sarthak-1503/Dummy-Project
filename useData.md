Student.insertMany([
    {
        id : 1,     
        name : 'ABC',
        cgpa : 8.5,
        yog : 2022,
        branch : 'COE'
    },
    {
        id : 2,
        name : 'DEF',
        cgpa : 8.6,
        yog : 2022,
        branch : 'MCE'
    },
    {
        id : 3,
        name : 'GHI',
        cgpa : 8.7,
        yog : 2022,
        branch : 'COE'
    },
    {
        id : 4,
        name : 'JKL',
        cgpa : 8.5,
        yog : 2022,
        branch : 'SE'
    },
    {
        id : 5,
        name : 'MNO',
        cgpa : 8.4,
        yog : 2022,
        branch : 'COE'
    },
    {
        id : 6,
        name : 'PQR',
        cgpa : 8.3,
        yog : 2022,
        branch : 'SE'
    },
    {
        id : 7,
        name : 'STU',
        cgpa : 8.5,
        yog : 2022,
        branch : 'MCE'
    },
    {
        id : 8,
        name : 'VWX',
        cgpa : 9.0,
        yog : 2022,
        branch : 'COE'
    },
    {
        id : 9,
        name : 'YZA',
        cgpa : 8.8,
        yog : 2022,
        branch : 'SE'
    },
    {
        id : 10,
        name : 'BCD',
        cgpa : 9.2,
        yog : 2022,
        branch : 'MCE'
    }
]).then(()=> {
    console.log("Insertion of data successful!!");
}).catch((error)=> {
    console.log(error);
});
