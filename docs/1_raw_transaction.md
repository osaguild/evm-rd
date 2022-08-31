# transaction

## EIP1559 transaction

send 0.01eth [0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70](https://goerli.etherscan.io/tx/0xc7ec42f73e17361b140bd64c23e74daa67d949f8cecd9324c2ad7125d1ad7d70)

```javascript
{
    to: SUB2_ADDRESS,
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
