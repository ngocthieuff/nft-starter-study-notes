# Constructor:

<img src="/assets/images/smart_contract/constructor.jpg" />

#### :sparkles: Abstract contract - internal constructor:
```solidity 
// Solidity program to demonstrate
// creating a constructor
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;	
		
// Creating a contract
abstract contract constructorExample {	
		
	// Declaring state variable
	string str;	
			
	// Creating a constructor
	// to set value of 'str'
	constructor() {				
		str = "GeeksForGeeks";	
	}	
	
	// Defining function to
	// return the value of 'str'
	function getValue(
	) public view returns (
	string memory) {	
	}	
}
```

#### :sparkles: "Normal contract" - public constructor:

```
// Solidity program to demonstrate
// creating a constructor
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;	
		
// Creating a contract
contract constructorExample {	
		
	// Declaring state variable
	string str;	
			
	// Creating a constructor
	// to set value of 'str'
	constructor() {				
		str = "GeeksForGeeks";	
	}	
	
	// Defining function to
	// return the value of 'str'
	function getValue(
	) public view returns (
	string memory) {	
		return str;	
	}	
}
```

### Also, read:

- [1] https://solidity-by-example.org/constructor/
- [2] https://medium.com/coinmonks/visibility-in-solidity-e758a4739c95
- [3] https://www.geeksforgeeks.org/solidity-abstract-contract/
- [4] https://www.geeksforgeeks.org/solidity-constructors/
- [5] https://medium.com/coinmonks/solidity-tutorial-all-about-constructors-46a10610336