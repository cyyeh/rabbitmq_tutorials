#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var ex = 'logs';

		ch.assertExchange(ex, 'fanout', { durable: false });
		
		// create a non-durable queue with a random generated name by RabbitMQ
		// When the connection that declared it closes, the queue will be deleted because it is declared as exclusive.
		ch.assertQueue('', { exclusive: true }, function(err, q) {
			console.log(" [x] Waiting for messages in %s. To exist press CTRL+C", q.queue);
			// tell the exchange to send messages to our queue
			ch.bindQueue(q.queue, ex, '');

			ch.consume(q.queue, function(msg) {
				console.log(" [x] %s", msg.content.toString());
			}, { noAck: true });
		});
	});
});