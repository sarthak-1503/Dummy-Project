
let Kafka = require('node-rdkafka');

let producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
});



module.exports = producer;