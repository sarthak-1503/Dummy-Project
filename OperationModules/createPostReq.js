const https = require('https')

module.exports = function() {
    // const data = {
    //     incr : 1,
    //     fname: 'john',
    //     lname: 'singh',
    //     commonname: 'john',
    //     username: ('john' + JSON.stringify(1)),
    //     email: 'john@gmail.com',
    //     password: 'load-testing',
    //     field1: 'a',
    //     field2: 'a',
    //     field3: 'a',
    //     field4: 'a',
    //     field5: 'a',
    //     field6: 'a',
    //     field7: 'a',
    //     field8: 'a',
    //     field9: 'a',
    //     field10: 'a',
    //     field11: 'a',
    //     field12: 'a',
    //     field13: 'a',
    //     field14: 'a',
    //     field15: 'a',
    //     field16: 'a',
    //     field17: 'a',
    //     field18: 'a',
    //     field19: 'a',
    //     field20: 'a',
    //     field21: 'a',
    //     field22: 'a',
    //     field23: 'a'
    // }

    const options = {
        hostname: '127.0.0.1',
        port: 1025,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
    })

    req.on('error', error => {
        console.error(error)
    })
}

// req.write(data)
// req.end()