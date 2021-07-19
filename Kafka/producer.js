
let Kafka = require('node-rdkafka');

let producer1 = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'compression.codec': 'gzip',
    'message.send.max.retries': 20,
    'retry.backoff.ms': 200,
    'socket.keepalive.enable': true,
    'batch.num.messages': 1000000,
    'queue.buffering.max.ms': 1000,
    'queue.buffering.max.messages': 10000000,
    'dr_cb': true
});

let producer2 = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'compression.codec': 'gzip',
    'message.send.max.retries': 20,
    'retry.backoff.ms': 200,
    'socket.keepalive.enable': true,
    'batch.num.messages': 1000000,
    'queue.buffering.max.ms': 1000,
    'queue.buffering.max.messages': 10000000,
    'dr_cb': true
});

// let producer3 = new Kafka.Producer({
//     'metadata.broker.list': 'localhost:9092',
//     'compression.codec': 'gzip',
//     'message.send.max.retries': 20,
//     'retry.backoff.ms': 200,
//     'socket.keepalive.enable': true,
//     'batch.num.messages': 1000000,
//     'queue.buffering.max.ms': 1000,
//     'queue.buffering.max.messages': 10000000,
//     'dr_cb': true
// });

let producers = {
    producer1,
    producer2,
    // producer3
};

module.exports = producers;