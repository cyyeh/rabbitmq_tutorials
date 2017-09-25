#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'task_queue';
		// allow arbitrary messages to be sent from the command line
		var msg = process.argv.slice(2).join(' ') || 'Hello World';

		// durable means RabbitMQ will never lose our queue
		ch.assertQueue(q, { durable: true });
		ch.sendToQueue(q, new Buffer(msg), { persistent: true });
		// Marking messages as persistent doesn't fully guarantee that a message won't be lost.
		console.log(" [x] Sent '%s'", msg);
	});
	setTimeout(function() { 
		conn.close(); 
		process.exit(0);
	}, 500);
});