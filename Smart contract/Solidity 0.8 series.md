
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

### References: 
- [1] [Smart Contract Programmer Solidity 0.8](https://www.youtube.com/playlist?list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p)
- [2] https://www.tutorialspoint.com/solidity/solidity_variables
- [3] https://solidity-by-example.org/