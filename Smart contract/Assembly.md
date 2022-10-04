<img src="/assets/images/smart_contract/assembly.jpg" />

### :nail_care: Syntax:

```solidity 
assembly {
    // some assembly code here
}
```

The code inside the assembly block is written in a language called **Yul** by the Solidity documentation.

Another important point is that assembly blocks cannot “communicate” between each other. Meaning that variables defined in one `assembly { ... }` block cannot be accessed from another `assembly { ... }` block.


#### Why those blocks can't communicate?

**:anguished: Different inline assembly blocks share no namespace.**
***i.e**. it is not possible to call a Yul function or access a Yul variable defined in a different inline assembly block.*

```solidity
assembly { 
    let x := 2
}
        
assembly {
    let y := x          // Error
}
// DeclarationError: identifier not found
// let y := x
// ^
```

#### Assembly Example:

- Add two numbers:

```solidity
function addition(uint x, uint y) public pure returns (uint) {
     
    assembly {
        // Create a new variable `result`
        //     -> calculate the sum of `x + y` with the `add` opcode
        //     -> assign the value to `result`
        
        let result := add(x, y)   // x + y
        // Use the `mstore` opcode, to:
        //     -> store `result` in memory
        //     -> at memory address 0x0
        
        mstore(0x0, result)       // store result in memory
         
        // return 32 bytes from memory address 0x0
        
        return(0x0, 32)          
    
    }
}
```

#### Variables declarations & assignments:

```solidity
assembly {
    let x := 7 
    let y := add(x, 3)
    let z := add(keccak256(0x0, 0x20), div(slength, 32))
    let n            // an initial empty 0 value is assigned
}
```

#### ... let instruction behind the scenes:

In the inner working of the EVM, `let` performs the following:

1. Create a new slack slot.
2. The new slot is reversed for the variable.
3. The slot is then automatically removed again when the end of the block is reached.

!!! Notes: variables declared with the `let` keyword are not visible outside the `assembly` block.

#### Literals:

Literals are also written in the same way than in Solidity. However, string literals can be **up to 32 characters**.

```solidity
assembly {
    let a := 0x123             // Hexadecimal
    let b := 42                // Decimal
    let c := "hello world"     // String
    
    let d := "very long string more than 32 bytes" // Error
} 
// TypeError: String literal too long (35 < 32)
// let d := "really long string more than 32 bytes"
//           ^------------------------------------^
```

#### Block and Scope:

A block scope is defined between `{...}`

Variables are only visible in the scope they are defined in.

```solidity
assembly { 
    
    let x := 3          // x is visible everywhere
      
    // Scope 1           
    { 
        let y := x     // ok
    }  // y is "deallocated" here
    
    // Scope 2    
    {
        let z := y     // Error
    } // x is "deallocated" here
        
}
// DeclarationError: identifier not found
// let x:= y
// ^
```

### References:
- [1] https://jeancvllr.medium.com/solidity-tutorial-all-about-assembly-5acdfefde05c
- [2] https://docs.soliditylang.org/en/latest/yul.html
- [3] https://igor.io/2013/08/28/stack-machines-fundamentals.html