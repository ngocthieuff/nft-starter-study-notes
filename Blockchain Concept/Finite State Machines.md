# Finite State Machine

### What is a Finite State Machine?

A *Finite State Machine*, or *FSM*, is a **computation model** that can be used to simulate sequential logic, or, in other words, to represent and control execution flow.

A Finite State Machine is a ==**model of computation**== based on a ==hypothetical machine made of one or more states==. 
>Only one single state of this machine can be active at the same time. 
>
>It means the machine has to transition from one state to another in to perform different actions.

<img src="/assets/images/blockchain_concept/fsm.jpg">

A *Finite State Machine* is any device storing the state of something at a given time. The state will change based on inputs, providing the resulting output for the implemented changes.

#### Some important properties:
- Fixed set of states that the machine can be in.
- Only one state at a time.
- A sequence of inputs is sent to the machine.
- Every state has a set of transitions and every transition is associated with an input and pointing to a state

*For example*:
<sub>**Traffic Light**
**States**: Red, Yellow, Green
**Transitions**: After a given time, Red will change to Green, Green to Yellow, and Yellow to Red</sub>

### Difference between NFA and DFA:

<img src="/assets/images/blockchain_concept/fsm1.png">

In **deterministic** algorithm, *for a given particular input*, the computer will always *produce the same output* going through the same states.

In case of **non-deterministic** algorithm, *for the same input*, the compiler *may produce different output* in different runs.


### References:
- [What is a Finite State Machine?](https://medium.com/@mlbors/what-is-a-finite-state-machine-6d8dec727e2c)
- [Finite State Machines with Go-lang](https://medium.com/wesionary-team/finite-state-machines-with-go-lang-ccd20e329a7b)
- [Finite State la gi?](https://anhhung.mobi/finite-state-machine-la-gi/)
- [Difference between Deterministic and Non-deterministic Algorithms](https://www.geeksforgeeks.org/difference-between-deterministic-and-non-deterministic-algorithms/)