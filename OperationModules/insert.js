
let express = require('express');
let Kafka = require('node-rdkafka');
let Employee = require('../models/EmployeeModel');
let producer1 = require('../Kafka/producer').producer1;
let producer2 = require('../Kafka/producer').producer2;
// let producer3 = require('../Kafka/producer').producer3;
let consumer = require('../Kafka/consumer');

producer1.connect();
producer2.connect();
// producer3.connect();
consumer.connect();

module.exports =  function(details) {

  producer1.on('ready', function() {
      try {
        producer1.produce(
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

  producer1.on('event.error', function(err) {
      console.error('Error from producer : ');
      console.error(err);
  });

  producer2.on('ready', function() {
      try {
        producer2.produce(
          "test-topics2",
          // myFirstDatabase.Employee
          null,
          Buffer.from(JSON.stringify(details))
        );

      } catch (err) {
        console.error('A problem occurred when sending our message');
        console.error(err);
      }
  });

  producer2.on('event.error', function(err) {
      console.error('Error from producer : ');
      console.error(err);
  });

  // producer3.on('ready', function() {
  //   try {
  //     producer3.produce(
  //       "test-topics3",
  //       // myFirstDatabase.Employee
  //       null,
  //       Buffer.from(JSON.stringify(details))
  //     );

  //   } catch (err) {
  //     console.error('A problem occurred when sending our message');
  //     console.error(err);
  //   }
  // });

  // producer3.on('event.error', function(err) {
  //   console.error('Error from producer : ');
  //   console.error(err);
  // });

  // producer.setPollInterval(500);

  consumer
  .on('ready', function() {
    consumer.subscribe(['test-topics']);
    consumer.consume();
  })
  .on('data', function(data) {
    // console.log(data);
  });

}