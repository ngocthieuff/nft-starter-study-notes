// Reference: https://www.sohamkamani.com/golang/working-with-kafka/#getting-started
// Before implementing this demo, you should know how to create cluster with brokers in docker_kafka_additions.md file

package kafka_services

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/segmentio/kafka-go"
)

// the topic and broker address are initialized as constants
const (
	topic          = "message-log1"
	broker1Address = "localhost:9091"
	broker2Address = "localhost:9093"
)

func Produce(ctx context.Context) {
	// initialize a counter
	i := 0

	// initialize the writer with the broker addresses, and the topic
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{broker1Address, broker2Address},
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
