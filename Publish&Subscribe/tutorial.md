# Publish/Subscribe

Full messaging model in RabbitMQ(Producer -> exchange -> queue)
	- core idea: 
		- producer never sends any messages directly to a queue. 
		- quite ofen the producer doesn't event know if a message will be delivered to any queue at all. 
		- producer can only send messages to an exchange.
	- exchange:
		- receive messages from producer
		- push messages to queues
		- it must know exactly what to do with a message it receives
			- rules for that are defined by the exchange type
		- exchange type
			- direct
			- topic
			- headers
			- fanout (This chapter we focus on)
				- mindless broadcasting

## Lab Introduction

In this lab, we deliver a message to multiple consumers, also known as "publish/subscribe" pattern.