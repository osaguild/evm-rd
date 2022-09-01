# dynamic transaction

## link

[link of solidity](https://docs.soliditylang.org/en/latest/abi-spec.html#examples)

## case.1: bar(bytes3[2] memory)

- function; bar(bytes3[2] memory)
- param1: ["abc","def"]

```byte
0xfce353f6
6162630000000000000000000000000000000000000000000000000000000000
6465660000000000000000000000000000000000000000000000000000000000
```

sample transaction: [0x329302ee6819dcb85ff12146b88f626d7e3cd03ff034cf583d82a20b823d666f](https://goerli.etherscan.io/tx/0x329302ee6819dcb85ff12146b88f626d7e3cd03ff034cf583d82a20b823d666f)

```javascript
const tx = {
  to: config.FOO_CONTRACT,
  //    value: ethers.utils.parseEther('0.001'),
  data:
    convertFunctionToSelector('bar(bytes3[2])') +
    remove0x(convertStringToByteWithPadding('abc')) +
    remove0x(convertStringToByteWithPadding('def')),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 55,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```

## case.2: baz(uint32 x, bool y)

- function: baz(uint32 x, bool y)
- param1: 69
- param2: true

```byte
0xcdcd77c0                                                       // selector of "bar(bytes3[2] memory)"
0000000000000000000000000000000000000000000000000000000000000045 // first entity of the param
0000000000000000000000000000000000000000000000000000000000000001 // second entity of the param
```

sample transaction: [0x6645c7c8050fd7e1274dfcdad30a081b7bbde304b3c1d16e53b98ac0e70d34f0](https://goerli.etherscan.io/tx/0x6645c7c8050fd7e1274dfcdad30a081b7bbde304b3c1d16e53b98ac0e70d34f0)

```javascript
const tx = {
  to: config.FOO_CONTRACT,
  //    value: ethers.utils.parseEther('0.001'),
  data:
    convertFunctionToSelector('baz(uint32,bool)') +
    remove0x(convertNumberToByteWithPadding(69)) +
    remove0x(convertBoolToByteWithPadding(true)),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 57,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```

## case.3: sam(bytes memory, bool, uint256[] memory)

- function; sam(bytes memory, bool, uint256[] memory)
- param1: "dave"
- param2: true
- param3: [1, 2, 3]

```byte
0xa5643bf2                                                       // selector of "sam(bytes,bool,uint256[])"
0000000000000000000000000000000000000000000000000000000000000060 // dynamic param start position. this means the first param is started at 96 bytes
0000000000000000000000000000000000000000000000000000000000000001 // second param argument: true
00000000000000000000000000000000000000000000000000000000000000a0 // dynamic param start position. this means the third param is started at 160 bytes
0000000000000000000000000000000000000000000000000000000000000004 // length of first param
6461766500000000000000000000000000000000000000000000000000000000 // hex value of first param is "dave"
0000000000000000000000000000000000000000000000000000000000000003 // array length of third param
0000000000000000000000000000000000000000000000000000000000000001 // first entity of the third param
0000000000000000000000000000000000000000000000000000000000000002 // second entity of the third param
0000000000000000000000000000000000000000000000000000000000000003 // third entity of the third param
```

sample transaction: [0x114b14e5634e5e03ca015f0955a24caa3fed41910127f3c5d1269a9bdc59aa3c](https://goerli.etherscan.io/tx/0x114b14e5634e5e03ca015f0955a24caa3fed41910127f3c5d1269a9bdc59aa3c)

```javascript
const { value, length, at } = convertDynamicTypeToByteWithPadding('dave', 96)
const tx = {
  to: config.FOO_CONTRACT,
  //    value: ethers.utils.parseEther('0.001'),
  data:
    convertFunctionToSelector('sam(bytes,bool,uint256[])') +
    remove0x(at) +
    remove0x(convertBoolToByteWithPadding(true)) +
    remove0x(convertNumberToByteWithPadding(160)) +
    remove0x(length) +
    remove0x(value) +
    remove0x(convertNumberToByteWithPadding(3)) +
    remove0x(convertNumberToByteWithPadding(1)) +
    remove0x(convertNumberToByteWithPadding(2)) +
    remove0x(convertNumberToByteWithPadding(3)),
  gasLimit: '50000', // 21000 is the default, 53000 is contract creation
  maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
  nonce: 59,
  type: 2, // 2 means EIP1559 transaction
  chainId: 5, // goerli
}
```
