### Docker file:

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

#### Run Kafka by Docker:

```go
docker compose up -d
```

#### Init Kafka services:

```go
docker exec -it kafka bash

kafka-topics.sh --bootstrap-server localhost:9092 --topic first_topic --create --partitions 3

kafka-console-producer.sh --bootstrap-server localhost:9092 --topic first_topic --producer-property acks=all

kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic first_topic --group my-group
```