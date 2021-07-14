
let Kafka = require('node-rdkafka');

var consumer = new Kafka.KafkaConsumer({
    "group.id": 'kafka',
    'metadata.broker.list': 'localhost:9092'
}, {});



module.exports = consumer;