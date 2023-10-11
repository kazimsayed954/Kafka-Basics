const { Kafka } = require('kafkajs');

 exports.kafka = new Kafka({
    clientId:"my-basic-app",
    brokers:['172.17.0.1:9092']
});
