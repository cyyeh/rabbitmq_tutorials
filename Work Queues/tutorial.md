# Introduction to Work Queues

- Work Queue (Task Queue)
	- main idea: to avoid doing a resource-intensive task immediately and having to wait for it to complete
	- how: 
		- we schedule the task to be done later
		- we encapsulate a task as message and send it to a queue. A worker process running in the background will pop the tasks and eventually execute the job. When you run many workers the tasks will be shared between them
	- advantages
		- easy to parallelise work
			- By default, RabbitMQ will send each message to the next consumver. On average every consumver will get the same number of messages(round-robin)

## Lab Introduction

In this tutorial we'll create a Work Queue(aka: Task Queues) that will be used to distribute time-consuming tasks among multiple workers.



