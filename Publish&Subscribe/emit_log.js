#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var ex = 'logs';
		// allow receiving messages from commnad line
		var msg = process.argv.slice(2).join(' ') || 'Hello World!';

		// declare exchange with type: fanout
		ch.assertExchange(ex, 'fanout', { durable: false });
		// producer publishes message to exchange
		// The empty string as second parameter means that 
		// we don't want to send the message to any specific queue
		ch.publish(ex, '', new Buffer(msg));
		console.log(" [x] Sent %s", msg);
	});

	setTimeout(function() {
		conn.close();
		process.exit(0);
	}, 500);
});