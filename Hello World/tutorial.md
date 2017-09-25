# Introduction to RabbitMQ

- RabbitMQ is a message broker
- RabbitMQ is a post box, a post office and a postman.
	- The major difference between RabbitMQ and the post office is that it doesn't deal with paper, instead **it accepts, stores and forwards binary blobs of data - messages**.
- Jargon
	- producer: a program that sends messages
	- queue(message buffer): 
		- a post box which lives inside RabbitMQ
		- messages can only store inside queues
		- queue is only bound by the host's memory & disk limits
	- consumer: a program that mostly waits to receive messages
- producer, consumer and broker do not have to reside on the same host

## Lab Introduction

This tutorial we will write programs to send and receive messages from a named queue.