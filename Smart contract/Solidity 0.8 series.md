
# Solidity 0.8 series :running:

### 1. Variables:
- State Variables − Variables whose values are permanently stored in a contract storage. 
- Local Variables − Variables whose values are present till function is executing. 
- Global Variables − Special variables exists in the global namespace used to get information about the blockchain.

```solidity
pragma solidity ^0.5.0;
contract SolidityTest {
   uint storedData; // State variable
   constructor() public {
      storedData = 10;   
   }
   function getResult() public view returns(uint){
      uint a = 1; // local variable
      uint b = 2;
      uint result = a + b;
      return result; //access the local variable
    //return storedData; //access the state variable
   }
}
```

##### Global variables:

<img src="/assets/images/smart_contract/globalvar.png" />

### View and pure functions:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ViewAndPure {
    uint public x = 1;

    // Promise not to modify the state.
    function addToX(uint y) public view returns (uint) {
        return x + y;
    }

    // Promise not to modify or read from the state.
    function add(uint i, uint j) public pure returns (uint) {
        return i + j;
    }
}
```

### Error:octopus::

An error will undo all changes made to the state during a transaction.

You can throw an error by calling require, revert or assert.

- `require` is used to validate inputs and conditions before execution.
- `revert` is similar to require. See the code below for details.
- `assert` is used to check for code that should never be false. Failing assertion probably means that there is a bug.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Error {
    function testRequire(uint _i) public pure {
        // Require should be used to validate conditions such as:
        // - inputs
        // - conditions before execution
        // - return values from calls to other functions
        require(_i > 10, "Input must be greater than 10");
    }

    function testRevert(uint _i) public pure {
        // Revert is useful when the condition to check is complex.
        // This code does the exact same thing as the example above
        if (_i <= 10) {
            revert("Input must be greater than 10");
        }
    }

    uint public num;

    function testAssert() public view {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num
        assert(num == 0);
    }

    // custom error
    error InsufficientBalance(uint balance, uint withdrawAmount);

    function testCustomError(uint _withdrawAmount) public view {
        uint bal = address(this).balance;
        if (bal < _withdrawAmount) {
            revert InsufficientBalance({balance: bal, withdrawAmount: _withdrawAmount});
        }
    }
}
```

### Modifier:

The main use case of modifiers is for **automatically checking a condition**, **prior to executing a function**. If the function does not meet the modifier requirement, an exception is thrown, and the function execution stops.

#### :cow2: How do modifiers work?

```solidity
modifier onlyOwner {
    require(msg.sender == owner);
    _;
}
```

#### :sparkling_heart: The _; symbol

The symbol `_;` is called a `merge wildcard`. **It merges the function code with the modifier code where the `_;` is placed.**
In other terms, the body of the function (to which the modifier is attached to) will be **inserted where the special symbol `_;` appears in the modifier’s definition**.

A modifier must have the symbol _; within its body in order to execute. It is mandatory.

#### :zzz: Where to place the _; ?

The place where you write the `_;` symbol will decide if the function has to be executed before, in between or after the modifier code.

```solidity
bool public locked;

modifier SomethingBefore {
    require(/* check something first */);
    _; // resume with function execution
}

modifier SomethingBetween {
    locked = true;
    _; // run function between
    require(/* then check something */)
}

modifier SomethingAfter {
    _; // run function first
    require(/* then check something */)
}
```

#### :sunglasses: Modifier Overriding:

!!! Notes: Modifiers are inheritable properties of contracts and may be overridden by derived contracts.

### Function Outputs:

There are several ways to return outputs from a function.

Public functions cannot accept certain data types as inputs or outputs


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Function {

  // Functions can return multiple values
  function returnMany() public pure returns (uint, bool, uint) {
    return (1, true, 2);
  }



  // Returned values can be named
  function named() public pure returns (uint x, bool b, uint y) {
    return (1, true, 2);
  }
  // result belike: 
  // named
  // 0:
  // uint256: x 1
  // 1:
  // bool: b true
  // 2:
  // uint256: y 2



  // Returned values can be assigned to their name
  // In this case the return statement can be omitted
  function assigned() public pure returns (uint x, bool b, uint y) {
    x = 1;
    b = true;
    y = 2;
  }
  // result belike:
  // assigned
  // 0:
  // uint256: x 1
  // 1:
  // bool: b true
  // 2:
  // uint256: y 2



  // Use destructuring assignment when calling another
  // function that returns multiple values.
  function destructuringAssignments()
      public
      pure
      returns (
          uint,
          bool,
          uint,
          uint,
          uint
      )
  {
      (uint i, bool b, uint j) = returnMany();

      // Values can be left out.
      (uint x, , uint y) = (4, 5, 6);

      return (i, b, j, x, y);
  }
  // result belike:
  // destructuringAssignments
  // 0:
  // uint256: 1
  // 1:
  // bool: true
  // 2:
  // uint256: 2
  // 3:
  // uint256: 4
  // 4:
  // uint256: 6  


  // -----------------------------------------
  // Cannot use map for either input or output
  // -----------------------------------------

  // Can use array for input
  function arrayInput(uint[] memory _arr) public {}

  // Can use array for output
  uint[] public arr;

  function arrayOutput() public view returns (uint[] memory) {
      return arr;
  }
}
```


### References: 
- [1] [Smart Contract Programmer Solidity 0.8](https://www.youtube.com/playlist?list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p)
- [2] https://www.tutorialspoint.com/solidity/solidity_variables
- [3] https://solidity-by-example.org/
- [4] https://medium.com/coinmonks/solidity-tutorial-all-about-modifiers-a86cf81c14cb