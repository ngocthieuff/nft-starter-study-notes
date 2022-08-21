# Go Advance

## Buffered and Unbuffered Channels

### Unbuffered Channel :flushed::

An unbuffered channel is a channel that needs a receiver as soon as a message is emitted to the channel. 
To declare an unbuffered channel, you just **don’t declare a capacity**. 
Here is an example:

```go
package main

import (
	"sync"
	"time"
)

func main() {
	c := make(chan string)

	var wg sync.WaitGroup

    // we are increasing the counter by 2
    // because we have 2 goroutines
	wg.Add(2)

	go func() {
		defer wg.Done() // this decreases counter by 1
		c <- `foo`
	}()

	go func() {
		defer wg.Done()

		time.Sleep(time.Second * 1)
		println(`Message: `+ <-c)
	}()

    // this blocks the execution
    // until its counter become 0
	wg.Wait()
}
```
The first goroutine is blocked after sending the message `foo` since no receivers are yet ready. 
> :pushpin: If the capacity is zero or absent, the channel is unbuffered and communication succeeds only when both a sender and receiver are ready.
:pushpin: <span style="background-color: #C8EFFF">If the channel is unbuffered, the sender blocks until the receiver has received the value</span>

#### Internal representation:

The channel struct `hchan` is available in `chan.go` from the `runtime` package. 
<sub>The structure contains the attributes related to the buffer of the channel, but in order to illustrate the unbuffered channel, I will omit those attributes that we will see later.</sub>

Here is the representation of the unbuffered channel:

<img src="/assets/images/golang/hchan%20structure.png" />

Here is the workflow of our previous example:

1. The channel is created with an empty list of receivers and senders.
2. Our first goroutine sends the value `foo` to the channel, line 16.
3. The channel acquires a struct `sudog` from a pool that will represent the sender. This structure will keep reference to the goroutine and the value `foo`.
4. This sender is now enqueued in the `sendq` attribute.
5. The goroutine moves into a waiting state with the reason “chan send”.
6. Our second goroutine will read a message from the channel, line 23.
7. The channel will dequeue the `sendq` list to get the waiting sender that is represented by the struct seen in the step 3.
8. The channel will use `memmove` function to copy the value sent by the sender, wrapped into the `sudog` struct, to our variable that reads the channel.
9. Our first goroutine parked in the step 5 can now resume and will release the `sudog` acquired in step 3.


As we see again in the workflow, the goroutine has to switch to <span style="background-color: pink; font-weight: bold">wait until a receiver is available</span>. However, if needed, this blocking behavior could be avoided thanks to the buffered channels.

### Buffered Channel :astonished::

```go
package main

import (
	"sync"
	"time"
)

func main() {
	c := make(chan string, 2)

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()

		c <- `foo`
		c <- `bar`
	}()

	go func() {
		defer wg.Done()

		time.Sleep(time.Second * 1)
		println(`Message: `+ <-c)
		println(`Message: `+ <-c)
	}()

	wg.Wait()
}
```
<img src="/assets/images/golang/hchan%20structure%20with%20buffer%20attributes.png" />

The buffer is made of five attributes:

- `qcount` stores the current number of elements in the buffer
- `dataqsiz` stores the number of maximum elements in the buffer
- `buf` points to a memory segment that contains space for the maximum number of elements in the buffer
- `sendx` stores the position in the buffer for the next element to be received by the channel
- `recvx` stores the position in the buffer for the next element to be returned by the channel

Thanks to `sendx` and `recvx` the buffer works like a circular queue:

<img src="/assets/images/golang/circular%20queue%20in%20the%20channel%20struct.png"/>

The circular queue allows us to maintain an order in the buffer without needing to keep shifting the elements when one of them is popped out from the buffer.


### References :clipboard::

- [Go: Buffered and Unbuffered Channels](https://medium.com/a-journey-with-go/go-buffered-and-unbuffered-channels-29a107c00268)