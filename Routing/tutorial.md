# Routing

- exchange:
	- receive messages from producer
	- push messages to queues
	- it must know exactly what to do with a message it receives
		- rules for that are defined by the exchange type
	- exchange type
		- direct (This chapter we focus on)
			- a message goes to the queues whose binding key exactly matches the routing key of the message
			- It is perfectly legal to bind multiple queues with the same binding key. 
		- topic
		- headers
		- fanout 

## Lab Introduction

In this lab, we are goint to make a loggig system able to subscribe only a subset of the messages. For example, we will be able to direct only critical error messages to the log file(to save disk space), while still being able to print all of the log messages on the console