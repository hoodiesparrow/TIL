# SQS, SNS, EventBridge

> https://www.youtube.com/watch?v=RoKAEzdcr7k

## SQS: simple queue service

> one of the original AWS services

### 1. Queue

Store messages in queue, process them later ( async, decoupling )

- the order is not guaranteed unless specified in configuration



### 2. Messages

Raw JSON blob with size cap



### 3. Polling

How the Subscriber( Receiver ) of the message will process the message

Generally the Service that receives the messages( Subscriber ) will own the Queue



![image-20220422101908072](/Users/hoodiesparrow/Redikins/SQS, SNS, EventBridge.assets/image-20220422101908072.png)

- user orders => BE handles transaction => sends queue a message => Subscriber pulls the message
  - Good thing is AWS Lambda will automatically pull the messages in the queue
- if there are multiple subscribers pulling from the queue, **only one of them will get the message and the message will be deleted out of the queue**



## SNS: simple notification service

### 1. Topics

similar to Queues, but topics are created with a particular theme like ‘orders’, ‘transactions’. And topics do not hold pool for messages. If an event occurs in an application that owns that data, the app will publish a message to the topic and the topic will deliver identical copy of that message to all of the subscribers.



### 2. Messages

pretty much the same



### 3. Pub / Sub

Publisher: Owner of the data

Subcriber: Whoever interested in that data (receiver)

![image-20220425233627028](/Users/hoodiesparrow/Redikins/SQS, SNS, EventBridge.assets/image-20220425233627028.png)

- If there’s multiple services interested in OrderService and was built with SQS, only one of the end-side application will conquer the message.
  - It’s possible to make 3 queues but OrderService has now more burden with publishing message.
- Solution: 
  1. use SNS so that OrderService publish to only 1 Topic
  2. publish message from SNS to SQS to store messages( remember SQS have queue to store messages )
     - so that even if end-side application fails, the messages are still stored in the SQS

Pros: fan-out functionality, high throughput, loose limits



## EventBridge

### 1. Message Bus

same as topics, publish message to Message Bus and has different kinds of recipients to that message.



### 2. Events

orders, shippings, etc just events.

Can be constructed by an application or AWS services like EC2 or third-party Saas like MongoDB or Shopify



### 3. Rules

Match incoming events and send them to corresponding targets



### 4. Targets

Destination endpoints( subscribers )



EventBridge also offers filtering of the messages ( SNS equiv: SNS subscription filter )



![image-20220425235004976](/Users/hoodiesparrow/Redikins/SQS, SNS, EventBridge.assets/image-20220425235004976.png)

can connect one-to-many or many-to-many

- Rules can have 5 different targets
  - but using 1 rule for 1 consumer is kinda typical approach

The most prominent pro in EventBridge is third-party integration.