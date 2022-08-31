# transaction

## info

[gas tracker](https://etherscan.io/gastracker)  
[tutorial](https://docs.etherscan.io/tutorials/signing-raw-transactions)

## EIP1559 transaction

send 0.01eth [0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70](https://goerli.etherscan.io/tx/0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70)

```javascript
{
    sto: SUB2_ADDRESS,
    value: ethers.utils.parseEther('0.01'),
    gasLimit: '21000', // 21000 is the default
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 2,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}
```

## legacy transactions

send 0.01eth [0xfd512aa1941ca8d9751c705eb65d804a8a1c1dc1b39ece1666ab1b88edc2ce3f](https://goerli.etherscan.io/tx/0xfd512aa1941ca8d9751c705eb65d804a8a1c1dc1b39ece1666ab1b88edc2ce3f)

```javascript
{
    to: SUB2_ADDRESS,
    value: ethers.utils.parseEther('0.01').toHexString(),
    gasLimit: ethers.utils.hexlify(21000), // 21000 is the default
    gasPrice: ethers.utils.parseEther('0.000000001').toHexString(), // to avoid transaction underpriced
    nonce: 3,
    type: 0, // 0 means regacy transaction
    chainId: 5, // goerli
}
```

## small nonce transaction

etherscan error is occurred. message: `nonce too low`

## big nonce transaction (success)

- success to broadcast transaction, but not become success status is pending. because skipped nonce 5.
- nonce 6 transaction [0x39901e6a7cce1c15b446fd5e23a8447574769da491b56e546c1fe30a6f3b03a9](https://goerli.etherscan.io/tx/0x39901e6a7cce1c15b446fd5e23a8447574769da491b56e546c1fe30a6f3b03a9)
- I send another transaction which nonce is 5 after.
- nonce 5 transaction [0xf9a55ba56688c10fd5ff150a065dfc64ce4e97675b8945e4db3521a0802883e5](https://goerli.etherscan.io/tx/0xf9a55ba56688c10fd5ff150a065dfc64ce4e97675b8945e4db3521a0802883e5)
- after it nonce 5 and 6 become success status.

## send value transaction to EOA

send 0.01eth [0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70](https://goerli.etherscan.io/tx/0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70)

```javascript
{
    sto: SUB2_ADDRESS,
    value: ethers.utils.parseEther('0.01'),
    gasLimit: '21000', // 21000 is the default
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 2,
    type: 2, // 2 means EIP1559 transaction
    chainId: 5, // goerli
}
```

## contract creation transaction

### ERC721 contract is named Token

transaction is [0x8552efe69d6846902f22079df3bcbab1169a0b153b35dcab0236bfcf96a9b0fd](https://goerli.etherscan.io/tx/0x8552efe69d6846902f22079df3bcbab1169a0b153b35dcab0236bfcf96a9b0fd)  
contract is [0x19eD33a3F483895845B16Bf2426DEABED30FA76c](https://goerli.etherscan.io/address/0x19ed33a3f483895845b16bf2426deabed30fa76c)

```typescript
const tokenFactory = await ethers.getContractFactory('Token')
const token = await tokenFactory.deploy()
console.log('Token address:', token.address)
```
