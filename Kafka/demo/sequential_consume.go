// Run by
// go run sequential_consume.go
package main

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/segmentio/kafka-go"
)

// the topic and broker address are initialized as constants
const (
	topic         = "first_topic1"
	brokerAddress = "localhost:9092"
)

func produce(ctx context.Context) {
	// initialize a counter
	i := 0

	// initialize the writer with the broker addresses, and the topic
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{brokerAddress},
		Topic:   topic,
	})

	for {
		// each kafka message has a key and value. The key is used
		// to decide which partition (and consequently, which broker)
		// the message gets published on
		err := w.WriteMessages(ctx, kafka.Message{
			Key: []byte(strconv.Itoa(i)),
			// create an arbitrary message payload for the value
			Value: []byte("this is message" + strconv.Itoa(i)),
		})
		if err != nil {
			panic("could not write message " + err.Error())
		}

		// log a confirmation once the message is written
		fmt.Println("writes:", i)
		i++
		// sleep for a second
		time.Sleep(time.Second)
	}
}

func consume(ctx context.Context, ns string) {
	fmt.Println(ns + "created")
	// initialize a new reader with the brokers and topic
	// the groupID identifies the consumer and prevents
	// it from receiving duplicate messages
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{brokerAddress},
		Topic:   topic,
		GroupID: "my-group",
	})
	for {
		// the `ReadMessage` method blocks until we receive the next event
		msg, err := r.ReadMessage(ctx)
		if err != nil {
			panic("could not read message " + err.Error())
		}

		// after receiving the message, log its value
		fmt.Println(ns+" received: ", string(msg.Value))
	}
}

func main() {
	// create a new context
	ctx := context.Background()
	// produce messages in a new go routine, since
	// both the produce and consume functions are
	// blocking
	go produce(ctx)
	go consume(ctx, "consumer-1")
	go consume(ctx, "consumer-2")

	// this command keeps main function maintaining
	consume(ctx, "consumer-3")

	// go consume(ctx, "consumer-3")
	// this command keeps main function maintaining
	// reader := bufio.NewReader(os.Stdin)
	// reader.ReadString('\n')
}
