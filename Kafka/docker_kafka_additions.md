# Docker Kafka Additions

### One Broker One ZooKeeper:

```dockerfile
version: '3'

services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - ./kafka:/kafka
```

### Multiple Brokers One ZooKeeper (Cluster):

<img src="/assets/images/kafka/cluster.png" />

Source: [[Kafka] - Install Kafka cluter on local using Docker compose](https://viblo.asia/p/kafka-install-kafka-cluter-on-local-using-docker-compose-jvElaqzdlkw)