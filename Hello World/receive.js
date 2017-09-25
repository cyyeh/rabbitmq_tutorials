#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		// declare the queue from which we're going to consume. 
		// Note this matches up with the queue that sendToQueue publishes to.
		// Note that we declare the queue here, as well. 
		// Because we might start the consumer before the publisher, we want to make sure the queue exists before we try to consume messages from it.
		var q = 'hello';
		ch.assertQueue(q, { durable: false });

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		// a callback that will be executed when RabbitMQ pushes messages to our consumer
		ch.consume(q, function(msg) {
			console.log(" [x] Received %s", msg.content.toString());
		}, {noAck: true});
	});
});