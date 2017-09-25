#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'task_queue';

		// durable means RabbitMQ will never lose our queue
		ch.assertQueue(q, { durable: true });
		ch.prefetch(1);
		// don't dispatch a new message to a worker until it has processed and acknowledged the previous one. 
		// Instead, it will dispatch it to the next worker that is not still busy.

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function(msg) {
			// fake a seond of work for every dot in the message body
			var secs = msg.content.toString().split('.').length - 1;

			console.log(" [x] Received %s", msg.content.toString());

			// we take the number of dots in the string as its complexity:
			// every dot will account for one second of "work"
			setTimeout(function() {
				console.log(" [x] Done");
			}, secs * 1000);
		}, {noAck: false}); 
		/*
		In order to make sure a message is never lost, 
		RabbitMQ supports message acknowledgments. 
		An ack(nowledgement) is sent back by the consumer to tell RabbitMQ 
		that a particular message has been received, processed and that RabbitMQ 
		is free to delete it.
		*/
	});
});