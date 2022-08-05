# GoLang Fundamentals

### What is Golang?

- Golang is a programming language initially developed at Google in year 2007 by Robert Griesemer, Rob Pike, and Ken Thompson.
  
  <img src="/assets/images/golang/logo.webp" />

- Go programming language is a **statically-typed language** with syntax similar to that of C.
  >A statically-typed language is a language (such as Java, C, or C++) where **variable types are known at compile time**.

Its **concurrency mechanisms** make it easy to write programs that get the most out of multi core and networked machines, while its **novel type system** enables flexible and modular program construction.

<details>
<summary>Novel Type System Intro</summary>
It has long been recognised that statically typed programming languages make the programmer's task easier by detecting many errors at compile time rather than leaving them to arise at run time. In such languages, the types (for example, number or string) of data items must be declared, and the compiler can check that operators are never applied to parameters of inappropriate types.

Concurrent programming languages introduce a new class of data item: the **communication channel**, which enables messages to be transmitted between components of a concurrent system. 
Clearly errors can result if the sender and receiver of a message do not agree on the nature of the message being transmitted, so it is beneficial to assign types to communication channels. The type of a communication channel specifies something about the data which can be sent along it: for example, that each message must be a number.
</details>

### Get Started with Golang

#### Packages

Every Go program is made up of packages.

Programs start running in package main.

  <img src="/assets/images/golang/package.png" />

#### Imports

We can write imports as:

  <img src="/assets/images/golang/import1.png" />

Or

  <img src="/assets/images/golang/import2.png" />

#### Functions

The general form of a function definition in Go programming language is as follows:

  <img src="/assets/images/golang/function1.png" />

A function can take zero or more arguments.

Notice that *the type comes **after** the variable name*.

  <img src="/assets/images/golang/function2.png" />

##### Defer in Function:

A defer statement defers the execution of a function until the surrounding function returns.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

##### Stacking defers:

Deferred function calls are ***pushed onto a stack***. 
When a function returns, its deferred calls are executed in `last-in-first-out` order.

```
func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}

Result is:
        counting
        done
        9
        8
        7
        6
        5
        4
        3
        2
        1
        0
```


#### Variables

``var variable_list optional_data_type;``

A var statement can be at package or function level. We see both in the example below.

  <img src="/assets/images/golang/var1.png" />

#### For Loop

  <img src="/assets/images/golang/for1.png" />

*Note*: Unlike other languages like C, Java, or Javascript there are **no parentheses surrounding** the three components of the for statement and **the braces { } are always required**.

  <img src="/assets/images/golang/for2.png" />

##### Forever

If you omit the loop condition it loops forever, so an infinite loop is compactly expressed.

```
package main

func main() {
	for {
	}
}
```

***C's while is spelled for in Go.***
```
package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
```

#### If

Go's if statements are like its for loops; the expression need not be surrounded by parentheses ( ) but the braces { } are required.

```
package main

import (
	"fmt"
	"math"
)

func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
```

*If with a short statement*:

```
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}
```

*If and else*:
Variables declared inside an if short statement are also available inside any of the else blocks.

```
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	// can't use v here, though
	return lim
}
```

#### Switch

A `switch` statement is a shorter way to write a sequence of if - else statements. It runs the `first case` whose value is equal to the condition expression.

Go's switch is like the one in C, C++, Java, JavaScript, and PHP, except that Go **only runs the selected case**, not all the cases that follow. *(In effect, the `break` statement that is needed at the end of each case in those languages is provided automatically in Go)*

```
func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}
}
```

**Switch evaluation order:**
Switch cases evaluate cases from top to bottom, stopping when a case succeeds.
<sub>For example:</sub>

```
switch i {
case 0:
case f():
}

does not call f if i==0.
```

**Switch with no condition:**
Switch without a condition is the same as `switch true`.
<sub>This construct can be a clean way to write long if-then-else chains.</sub>
```
func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}

Result is: "Good evening."
```




#### Arrays

Which can store a **fixed-size sequential** collection of elements of the **same type**.

  <img src="/assets/images/golang/ar1.png" />

<sub>For example, to declare a 10-element array called balance of type float32, use this statement:</sub>

  <img src="/assets/images/golang/ar2.png" />

<sub>You can initialize array in Go either one by one or using a single statement as follows:</sub>

  <img src="/assets/images/golang/ar3.png" />

#### Slices

> Golang Slice is an abstraction over Go Array.

 As Go **Array** allows you to define type of variables that can hold several data items of the same kind but it **do not provide any inbuilt method to increase size of it dynamically** or **get a sub array of its own**. 

 **Slices covers this limitation**. It provides many utility functions required on Array and is widely used in Go programming.

##### Defining a slice

To define a slice, you can ***declare it as an array without specifying size*** or ***use make function*** to create the one.

  <img src="/assets/images/golang/sl1.png" />

An array has a fixed size. A slice, on the other hand, is a dynamically-sized, flexible view into the elements of an array. In practice, slices are much more common than arrays.

  <img src="/assets/images/golang/slice2.png" />

#### Structure

The format of the struct statement is this:
 <img src="/assets/images/golang/str1.png" />
Once a structure type is defined, it can be used to declare variables of that type using following syntax.
 <img src="/assets/images/golang/str2.png" />

Example:
 <img src="/assets/images/golang/str3.png" />
 
### Reference:
- [Basics of Golang [For Beginners]](https://medium.com/hackernoon/basics-of-golang-for-beginners-6bd9b40d79ae)
- [Novel Type Systems for Concurrent Programming Languages](http://www.dcs.gla.ac.uk/~simon/novel/short.html)
- [ZaloPay Go Basics](https://zalopay-oss.github.io/go-advanced/ch1-basic/)
- [A Tour of Go](https://go.dev/tour/flowcontrol/1)