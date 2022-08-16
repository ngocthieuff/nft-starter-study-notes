package main

import (
	"context"
	. "kafka_with_golang/kafka_services"
)

func main() {
	// create a new context
	ctx := context.Background()
	// produce messages in a new go routine, since
	// both the produce and consume functions are
	// blocking
	go Produce(ctx)
	go Consume(ctx)
	Consume(ctx)
}
