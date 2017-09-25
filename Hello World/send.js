#!/usr/bin/env node

// import library first
var amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {
	// create a channel
	conn.createChannel(function(err, ch) {
		// declare queue for us to send to
		// Declaring a queue is idempotent - it will only be created if it doesn't exist already.
		var q = 'hello';
		ch.assertQueue(q, { durable: false });

		// publish message to queue
		// The message content is a byte array, so you can encode whatever you like there
		ch.sendToQueue(q, new Buffer('Hello World!'));
		console.log(" [x] Sent 'Hello World!'");
	});
	// close the connection and exit
	setTimeout(function() { 
		conn.close(); 
		process.exit(0); 
	}, 500);
});