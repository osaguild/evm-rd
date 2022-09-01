# value

## send value transaction to EOA

send 0.01eth [0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70](https://goerli.etherscan.io/tx/0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70)

```javascript
{
    sto: config.SUB2_WALLET,
    value: ethers.utils.parseEther('0.01'),
    gasLimit: '21000', // 21000 is the default
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 2,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}
```

## send value transaction to contract

send 0.01eth [0x3030926e69dd6f49690bfd1986a4523e9b6f8246f3fabd0e6c3fbd7c302478a0](https://goerli.etherscan.io/tx/0x3030926e69dd6f49690bfd1986a4523e9b6f8246f3fabd0e6c3fbd7c302478a0)

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

## send value and data transaction to EOA

send 0.001eth [0xba71899f97738782d2dffa5c1ca1ed66e37d8349ce7a0ea2e12e41600e8b7fbf](https://goerli.etherscan.io/tx/0xba71899f97738782d2dffa5c1ca1ed66e37d8349ce7a0ea2e12e41600e8b7fbf)

```javascript
{
    to: config.SUB2_WALLET,
    value: ethers.utils.parseEther('0.001'),
    data: convertStringToByte('hello world'),
    gasLimit: '23000', // 21000 is the default, 53000 is contract creation
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 48,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}
```

## send value and data transaction to contract

send 0.001eth [0x43db67c2f25e738c194c3cb129cf49adae2ab1bfa317df2a2871639a3bd784ae](https://goerli.etherscan.io/tx/0x43db67c2f25e738c194c3cb129cf49adae2ab1bfa317df2a2871639a3bd784ae) -> failed. because called function is not payable

```javascript
const { value, length, at } = convertDynamicTypeToByteWithPadding('hello world', 32)
const tx = {
  to: config.MANAGER_CONTRACT,
  value: ethers.utils.parseEther('0.001'),
  data: convertFunctionToSelector('setMessage(string)') + remove0x(at) + remove0x(length) + remove0x(value),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 51,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```

send 0.001eth [0x1586e81d72e17a7f12c0423b5e4e99cc7111428f10866f3763202ac862db491d](https://goerli.etherscan.io/tx/0x1586e81d72e17a7f12c0423b5e4e99cc7111428f10866f3763202ac862db491d) -> success. because doesn't send value to not payable function

```javascript
const { value, length, at } = convertDynamicTypeToByteWithPadding('hello world', 32)
const tx = {
  to: config.MANAGER_CONTRACT,
  data: convertFunctionToSelector('setMessage(string)') + remove0x(at) + remove0x(length) + remove0x(value),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 52,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```

send 0.001eth [0x0ed01566606a68e314422b62b132c00f015a0a8dd67568fabee3946e897b4f20](https://goerli.etherscan.io/tx/0x0ed01566606a68e314422b62b132c00f015a0a8dd67568fabee3946e897b4f20) -> success. because function is payable

```javascript
const { value, length, at } = convertDynamicTypeToByteWithPadding('hello world', 32)
const tx = {
  to: config.MANAGER_CONTRACT,
  value: ethers.utils.parseEther('0.001'),
  data: convertFunctionToSelector('setMessageWithEth(string)') + remove0x(at) + remove0x(length) + remove0x(value),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 53,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```
