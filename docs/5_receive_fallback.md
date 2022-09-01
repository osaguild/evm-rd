# receive and fallback

## about receive() and fallback()

- receive() is called when someone send value to contract.
- fallback() is called when someone send value and data to contract or receive() is not defined.

## case.1: only has receive()

contract

```solidity
contract Payable1 {
  receive() external payable {}

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}

```

send 0.01eth to contract -> success  
[0x3030926e69dd6f49690bfd1986a4523e9b6f8246f3fabd0e6c3fbd7c302478a0](https://goerli.etherscan.io/tx/0x3030926e69dd6f49690bfd1986a4523e9b6f8246f3fabd0e6c3fbd7c302478a0)

```javascript
{
    to: config.PAYABLE1_CONTRACT,
    value: ethers.utils.parseEther('0.01'),
    data: '0x',
    gasLimit: '30000', // 21000 is the default, 53000 is contract creation
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 20,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}

```

## case.2: only has fallback()

contract

```solidity
contract Payable2 {
  fallback() external payable {}

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}

```

send 0.01eth to contract -> success  
[0xa911933737491961a6afe4c3fece0bec12c8944cd270ba486ffdb551f6b0b8ee](https://goerli.etherscan.io/tx/0xa911933737491961a6afe4c3fece0bec12c8944cd270ba486ffdb551f6b0b8ee)

```javascript
{
    to: config.PAYABLE2_CONTRACT,
    value: ethers.utils.parseEther('0.01'),
    data: '0x',
    gasLimit: '30000', // 21000 is the default, 53000 is contract creation
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 21,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}

```

## case.3: has receive() and fallback()

contract

```solidity
contract Payable3 {
  receive() external payable {}

  fallback() external payable {}

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}

```

send 0.01eth to contract -> success  
[0xf3ffb343a24a981f9e757828cbd9008d42e97668c33bfe0d9b59a1901f8a8fa2](https://goerli.etherscan.io/tx/0xf3ffb343a24a981f9e757828cbd9008d42e97668c33bfe0d9b59a1901f8a8fa2)

```javascript
{
    to: config.PAYABLE4_CONTRACT,
    value: ethers.utils.parseEther('0.01'),
    data: '0x',
    gasLimit: '30000', // 21000 is the default, 53000 is contract creation
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 22,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}


```
