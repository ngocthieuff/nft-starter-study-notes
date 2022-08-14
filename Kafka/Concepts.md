# Kafka Introduction

Kafka was originally developed at LinkedIn in 2011 and has improved a lot since then.

Nowadays, it’s a whole platform, allowing you to redundantly store absurd amounts of data, have a message bus with huge throughput (millions/sec), and use real-time stream processing on the data that goes through it all at once.

This is all well and great, but stripped down to its core, Kafka is a **distributed**, **horizontally scalable**, **fault-tolerant commit log**.

#### Horizontally scalable:

Let’s define the term *vertical scalability* first. Say, for instance, you have a traditional database server that’s starting to get overloaded. The way to get this solved is to simply ***increase the resources*** (CPU, RAM, SSD) on the server. This is called *vertical scaling* — where you add more resources to the machine. There are two big disadvantages to scaling upwards:

- There are limits defined by the hardware. You cannot scale upwards indefinitely.
  
- It usually requires downtime, something which big corporations can’t afford.

*Horizontal scalability* is solving the same problem by throwing ***more machines*** at it. Adding a new machine doesn’t require downtime, nor are there any limits to the amount of machines you can have in your cluster. The catch is not all systems support horizontal scalability, as they’re not designed to work in a cluster, and those that are are usually more complex to work with.

<img src="/assets/images/kafka/horizontalverticalscalability.png" alt="Horizontal scaling becomes much cheaper after a certain threshold" />

#### Fault-tolerant:

Something that emerges in non-distributed systems is they have a single point of failure (SPoF). If your single database server fails (as machines do) for whatever reason, you’re screwed.

Distributed systems are designed in such a way to accommodate failures in a configurable way. 
In a 5-node Kafka cluster, you can have it continue working even if two of the nodes are down. 
It’s worth noting that ***fault tolerance is at a direct trade-off with performance***, as in the more fault-tolerant your system is, the less performant it is.

#### Commit logs:

A *commit log* (also referred to as write-ahead log or a transaction log) is a persistent-ordered data structure that only supports appends. You can’t modify or delete records from it. It’s read from left to right and guarantees item ordering.



### References:

- [Medium: A Thorough Introduction to Apache Kafka](https://betterprogramming.pub/thorough-introduction-to-apache-kafka-6fbf2989bbc1)
- [Udemy: Apache Kafka Series - for Beginners v3](https://www.udemy.com/course/apache-kafka/learn/lecture/11566872#reviews)
- [Implementing a Kafka Producer and Consumer In Golang (With Full Examples) For Production](https://www.sohamkamani.com/golang/working-with-kafka/)
- [How to use Kafka with Go](https://www.educative.io/answers/how-to-use-kafka-with-go)