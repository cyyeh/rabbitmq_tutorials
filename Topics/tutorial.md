# Topics

- exchange:
	- receive messages from producer
	- push messages to queues
	- it must know exactly what to do with a message it receives
		- rules for that are defined by the exchange type
	- exchange type
		- direct 
		- topic (This chapter we focus on)
			- Messages sent to a topic exchange can't have an arbitrary routing_key - it must be a list of words, delimited by dots.
				- ex: "stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit"
			- binding key must also be in the same form as the routing key
			- two important special cases for binding keys
				- * (star) can substitute for exactly one word.
				- # (hash) can substitute for zero or more words.
				- ex: (we're going to send messages which all describe animals)
					- topic form is "<speed>.<colour>.<species>".
					- Q1 is bound with binding key "*.orange.*" 
						- Q1 is interested in all the orange animals.
					- Q2 with "*.*.rabbit" and "lazy.#".
						- Q2 wants to hear everything about rabbits, and everything about lazy animals.
					- if we break our contract and send a message with one or four words, like "orange" or "quick.orange.male.rabbit"
						- these messages won't match any bindings and will be lost
		- headers
		- fanout 

## Lab Introduction

In this lab, we want to implement a logging system that is capable of doing routing based on multiple criteria