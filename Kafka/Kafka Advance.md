# Kafka Advanced

<p style="color: gray; font-size: 22px;">Handle Duplicate Messages and Message Ordering in Kafka<p>

<p style="font-size: 19px; font-weight: 600;">1. Message Ordering:<p>

Let’s imagine that the user creates some orders, modifies it, and finally cancels. 
This means, that the `Producer` sends to Message Broker the following messages with commands: `ORDER_CREATE`, `ORDER_MODIFY`, `ORDER_CANCEL`.

If our application has only **one consumer** and **one topic** with **one partition**, you will never come across  an ordering issue - since Kafka sends all messages within a topic `Partition` to `Consumer` in the ***same order*** which it gets from the `Producer`:

<img src="/assets/images/kafka/msg_ordering.gif" alt="Figure 1 — Message ordering with one consumer and one partition in Kafka Topic" />

I suppose that you agree that having only one Consumer that processes all messages related to Order topic is ***not a scalable approach*** for an application that may have a lot of customers.

Hopefully, Kafka has a solution here and it offers to split any topic into *partitions*.
Each read or write operation for a partition happens in ***parallel***. 
It means that instead of having one `Consumer` we may have as many `Consumers` as there are `partitions` in a `Topic`. Kafka assigns each `partition` to a single `Consumer`.

It may lead that for example `ORDER_CANCEL` command getting completed before `ORDER_CREATE` as shown below:

<img src="/assets/images/kafka/msg_ordering1.gif" alt="Figure 2 — Unexpected message ordering" />

But this issue is easy to fix. Here is the main rule:

> In Kafka, the ordering is guaranteed for all messages in one Partition.

Therefore, we should only take care that all commands `ORDER_CREATE`, `ORDER_MODIFY`, `ORDER_CANCEL` should be put in one Partition associated with the particular `Order`.

Kafka actually has several ways to define to **which partition sends a message**. One of the ways is to `assign a special key` to the message. Kafka distributes them according to key hash: `hashCode(key) % N`; where `N` — is a count of partitions.

This means if we assign the same key for all commands `ORDER_CREATE`, `ORDER_MODIFY`, and `ORDER_CANCEL`, all of them will be sent to one partition and all of them will be sent to one Consumer in the same order. In our case, I believe that the better choice for the key will be `orderId` which is unique and stable and all commands across one order will be guaranty completed in one Consumer in an expected order.

Another way to **distribute messages across `Partitions`** is to explicitly define to which partitions send the message. For example, if you have 2 partitions and each message belongs to a particular client, you may divide all messages that all clients whose surname starts from letter belongs to range `A-M` should go to the first partition and for clients whose surname starts from `N-Z` should go to the second partition.

<p style="font-size: 19px; font-weight: 600;">2. Duplicate Messages:<p>

There’re different strategies for how messages should be delivered to a `Consumer`.

Ideally, the message broker should send each message only once, but different failures may occur in `Consumers` during processing those messages. 
<sub>For example, Consumer gets a message but shut down before making all necessary operations against DB, it leads that we leave some messages unhandled.</sub>

Instead, most message <span style="font-weight: 600; color: gray">brokers promise</span> to deliver a message <span style="font-weight: 600; color: gray">at least once</span>. It means that if some failure happens during message processing, the message broker may deliver the same message several times.

**How does it work in Kafka?** 
Kafka under the hood has a special cursor (`offset`). `All messages behind offset are considered as handled and not delivered anymore` to the particular consumer group.

Kafka has a special configuration that defines how the offset should be changed. 
>If you set `enable.auto.commit` to `true`, it means that Kafka shifts offset as soon as it sends batched messages to `Consumer` — and doesn’t take care of whether `Consumers` handled messages or not. 
In this case, Kafka guarantees that each message sends `only once`. 

<img src="/assets/images/kafka/offset enable.auto.commit.gif" alt="Figure 3 — Kafka may be set up with auto-commit, as soon as it sends messages it automatically move offset. If a consumer crashes before processing those messages, they are missed since Kafka already moved offset" />

But it’s not what we’re expecting to develop.


>If we set `enable.auto.commit` into `false`, Kafka after sending a batch of messages to Consumer will shift offset only after getting explicit acknowledge message from `Consumer` that all messages in the batch `have been handled`.

Let’s assume, that Kafka sends a batch of the following messages to Consumer: `ORDER_CREATE`, `ORDER_MODIFY`, `ORDER_CANCEL`. Consumer completed only one command `ORDER_CREATE` and crushes down and doesn’t send acknowledge message to Kafka to shift offset. As soon as Consumer spins up again, Kafka starts to send all 3 messages again. It means that a Consumer may get one message twice and there may be an issue as shown below.

<img src="/assets/images/kafka/offset_issue.gif" alt="Figure 4 — Consumer explicitly requests Kafka to move offset as soon as all messages are processed. But it may handle some messages in batch and crash before sending acknowledge message to move offset, in this case, Kafka will resend all messages again and the consumer may handle one message twice" />

Therefore, we should keep in mind during the development that a `Consumer` may accept *multiple times the same message*. There’re a couple of ways to handle duplicate messages:

- write idempotent message handler
- track all received messages and discard duplicates

<p style="font-size: 18px; font-weight: 600;">2.1 Write idempotent message handler:<p>

It’s the easiest way to have a deal with duplicate messages. 

>The message handler is idempotent if calling it multiple times with the same payload has no additional effect. 
<sub>For example, modify an already modified Order with the same payload should give the same result. It’s like a `PUT` operation in `RESTful API`, which we should develop in an idempotent manner.</sub>

Unfortunately, it’s not applicable for all cases. Let’s assume, besides `ORDER_CREATE`, `ORDER_MODIFY`, and `ORDER_CANCEL`, we have a command `ORDER_PAYMENT`. In this message handler, we should reduce a customer credit balance and this operation couldn’t be completed in an idempotent manner by its nature. We need to come up with another way which is considered below.

<p style="font-size: 18px; font-weight: 600;">2.2 Track all received messages and discard duplicated:<p>

As we already highlighted, that some of the commands couldn’t be completed in an idempotent manner. An example maybe `ORDER_PAYMENT`. We should avoid any attempt to reduce the customer credit balance twice or more.

If our application is using `Relational DB` with transaction support, it’s easy to implement to introduce a new table, for example, `PROCESSED_MESSAGE` where we would store all message ids which is already processed. Therefore any DB update will be wrap in one transaction with an insert record in the `PROCESSED_MESSAGE` table as shown below:

<img src="/assets/images/kafka/duplicated_msg.png" alt="Figure 5— Tracking all received messaged from Kafka and discard duplicate ones" />

In this example, a Consumer inserts a row containing messageId into the `PROCESSED_MESSAGE` table. If a message is a duplicate, the `INSERT` operation will fail and `Consumer` discards this message without updating the Order entity.

#### Conclusion:

1. Kafka guarantees the message ordering for all messages within one partition.
   
2. The developer should take into account how to distribute messages between Topic partitions if the message ordering matters.
   
3. Kafka may distribute messages by a key associated with each message, if a key is the same for some messages, all of them will be put in the same partition.
   
4. Message brokers may offer some strategies to deliver messages: “only once” or “at least once”.

5. Delivering with “only once” strategy leads that some messages may be left unhandled

6. Delivering with an “at least once” strategy supposes that the developer should have a deal with the duplicate message.
7. Duplicate messages may be handled in several ways: implement an idempotent message handler or tracking all received messages and discard duplicate ones.


### References:

- [How to Handle Duplicate Messages and Message Ordering in Kafka](https://betterprogramming.pub/how-to-handle-duplicate-messages-and-message-ordering-in-kafka-82e2fef82025)