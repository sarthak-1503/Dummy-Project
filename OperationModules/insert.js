
let express = require('express');
let Kafka = require('node-rdkafka');
let Employee = require('../models/EmployeeModel');
let producer = require('../Kafka/producer');
let consumer = require('../Kafka/consumer');

producer.connect();
consumer.connect();

module.exports =  function(details) {

  producer.on('ready', function() {
      try {
        producer.produce(
          "test-topics",
          // myFirstDatabase.Employee
          null,
          Buffer.from(JSON.stringify(details))
        );

      } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
      }
  });

  producer.on('event.error', function(err) {
      console.error('Error from producer : ');
      console.error(err);
  });

  // producer.setPollInterval(500);

  consumer
  .on('ready', function() {
    consumer.subscribe(['test-topics']);
    consumer.consume();
  })
  .on('data', function(data) {
    // console.log(data);
  });

  // producer.flush(1000,(err)=> {
  //   console.log(err);
  // });
  // let record = new Employee(details);

  // record.save((err)=> {
  //   console.log(err)
  // });
}