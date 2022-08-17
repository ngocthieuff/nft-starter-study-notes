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

<p style="color: gray; font-size: 22px;">Apache Kafka Rebalance Protocol - the magic behind your streams applications<p>

<p style="font-size: 19px; font-weight: 600;">Kafka & The Rebalanced Protocol 101<p>

**Let’s go back to some basics** ^^

Apache Kafka is a streaming platform based on a `distributed publish/subscribe pattern`. 
<sub>First, processes called **producers** send messages into **topics**, which are managed and stored by a cluster of **brokers**. Then, processes called **consumers** subscribe to these topics for fetching and processing published messages.</sub>

<sub>A **topic** is distributed across a number of brokers so that each broker manages **`subsets of messages`** for each **topic** - these subsets are called **partitions**. The number of **partitions** is defined when a topic is created and can be increased over time (but be careful with that operation).</sub>

<br/>

What is important to understand is that a partition is actually the **`unit of parallelism`** for Kafka’s producers and consumers.

<span style="background-color: pink">On the producer side, the partitions allow writing messages in parallel</span>. 
<sub>If a message is published with a key, then, by default, the producer will hash the given key to determine the destination partition. This provides a guarantee that all messages with the same key will be sent to the same partition. In addition, a consumer will have the guarantee of getting messages delivered in order for that partition.</sub>

<span style="background-color: pink">On the consumer side, the number of partitions for a topic bounds the maximum number of active consumers within a consumer group.</span>
<sub>A consumer group is the mechanism provided by Kafka to group multiple consumer clients, into one logical group, in order to load balance the consumption of partitions. Kafka provides the guarantee that a <span style="background-color: #C2FFD6; font-weight: bold;">topic-partition is assigned to only one consumer within a group<span>.</sub>

<img src="/assets/images/kafka/partition_is_assigned_to_only_one_consumer_within_a_group.jpeg" alt="topic-partition is assigned to only one consumer within a group" />
<p style="color: grey; font-size: 14px; padding-left: 20px;">topic-partition is assigned to only one consumer within a group</p>

<p style="background-color: #C8EFFF">If a consumer leaves the group after a controlled shutdown or crashes then all its partitions will be reassigned automatically among other consumers. In the same way, if a consumer (re)join an existing group then all partitions will be also <span style="font-weight: bold;">rebalanced between the group members</span>.</p>

The ability of consumers clients to cooperate within a dynamic group is made possible by the use of the so-called **Kafka Rebalance Protocol**.

**The Rebalance Protocol, in a Nutshell** :ok_woman:

First, let’s give a definition of the meaning of the term “rebalance” in the context of Apache Kafka.

>**Rebalance/Rebalancing**: the procedure that is followed by a number of distributed processes that use Kafka clients and/or the Kafka coordinator to **form a common group** and **distribute a set of resources** among the members of the group (source : Incremental Cooperative Rebalancing: Support and Policies).

This definition above actually makes no reference to the notion of **consumers** or **partitions**. Instead, it uses a concept of **members** and **resources**. <span style="background-color: pink">The main reason for that is because the rebalance protocol is not only limited to manage consumers but can also be used to coordinate any group of processes.</span>

<br/>

Here are some usages of the protocol rebalance :

- **Confluent Schema Registry** relies on rebalancing to elect a leader node.
- **Kafka Connect** uses it to distribute tasks and connectors among the workers.
- **Kafka Streams** uses it to assign tasks and partitions to the application streams instances.

<img src="/assets/images/kafka/Apache%20Kafka%20Rebalance%20Protocol%20and%20components.jpeg"/>

In addition, what is really important to understand is that rebalance mechanism is actually structured around two protocols : **Group Membership Protocol** and **Client Embedded Protocol**.

The Group Membership Protocol, as its name suggests, this protocol is in charge of the <span style="background-color: #C2FFD6; font-weight: bold;">coordination of members within a group</span>. The clients participating in a group will execute a sequence of requests/responses with a Kafka broker that acts as **coordinator**.

The second protocol is executed on the client side and allows extending the first the first one by being embedded in it. For example, the protocol used by consumers will assign topic-partition to members.

Now that we have a better understanding of what the rebalance protocol is, let’s illustrate its implementation for assigning partitions in a consumer group.

**Join Group:**:boom:

When a consumer starts, it sends a first `FindCoordinator` request to obtain the Kafka `broker coordinator` which is responsible for its group. Then, it initiates the rebalance protocol by sending a JoinGroup request.

<img src="/assets/images/kafka/join group request.jpeg" alt="Consumer — Rebalance Protocol — SyncGroup Request"/>

As we can see, the `JoinGroup` contains some consumer client configuration such as the `session.timeout.ms` and the `max.poll.interval.ms`. These properties are used by <span style="background-color: #C2FFD6; font-weight: bold;">the coordinator to kick members out of the group if they don’t respond</span>. :scream_cat:

In addition, the request also contains two very important fields: the list of client protocols, supported by the members, and metadata that will be used for executing one of the embedded client protocols. In our case, the client-protocols are the list of partition assignors configured for the consumer (i.e : `partition.assignment.strategy`). Metadata contains the list of topics the consumer has subscribed to.

!!! Notes: More details about consumer configs is in: [Kafka official documentation](https://kafka.apache.org/documentation/#consumerconfigs) 
!!! Notes: More details about assignor is in: [Understanding Kafka partition assignment strategies and how to write your own custom assignor](https://medium.com/streamthoughts/understanding-kafka-partition-assignment-strategies-and-how-to-write-your-own-custom-assignor-ebeda1fc06f3)


The `JoinGroup` acts as a barrier, meaning that the coordinator doesn’t send responses as long as all consumer requests are not received (i.e group.initial.rebalance.delay.ms) or rebalance timeout is reached.

<img src="/assets/images/kafka/join group response.jpeg" alt="Consumer — Rebalance Protocol — JoinGroup Response"/>

!!! Notes: The first consumer, within the group, receives the list of active members and the selected assignment strategy and acts as the **group leader** :crown: while others receive an empty response. The group leader is responsible for executing the partitions assignments locally.



### References:

- [How to Handle Duplicate Messages and Message Ordering in Kafka](https://betterprogramming.pub/how-to-handle-duplicate-messages-and-message-ordering-in-kafka-82e2fef82025)
- [Apache Kafka Rebalance Protocol, or the magic behind your streams applications](https://medium.com/streamthoughts/apache-kafka-rebalance-protocol-or-the-magic-behind-your-streams-applications-e94baf68e4f2)