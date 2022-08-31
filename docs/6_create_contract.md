# create contract

## Token which is ERC721 contract

transaction is [0x8552efe69d6846902f22079df3bcbab1169a0b153b35dcab0236bfcf96a9b0fd](https://goerli.etherscan.io/tx/0x8552efe69d6846902f22079df3bcbab1169a0b153b35dcab0236bfcf96a9b0fd)  
contract is [0x19eD33a3F483895845B16Bf2426DEABED30FA76c](https://goerli.etherscan.io/address/0x19ed33a3f483895845b16bf2426deabed30fa76c)

```typescript
const tokenFactory = await ethers.getContractFactory('Token')
const token = await tokenFactory.deploy()
console.log('Token address:', token.address)
```

## Manager

transaction is [0x66e68c1e7c31c333b54d3b3ae7590ded99a63bd4d56406046f698bbcf3cb3d0c](https://goerli.etherscan.io/tx/0x66e68c1e7c31c333b54d3b3ae7590ded99a63bd4d56406046f698bbcf3cb3d0c)  
contract is [0x2fe69a0E82DfaB96d1D9BBec2c459Aca3a221C60](https://goerli.etherscan.io/address/0x2fe69a0e82dfab96d1d9bbec2c459aca3a221c60)

```typescript
const tokenFactory = await ethers.getContractFactory('Token')
const token = await tokenFactory.deploy()
console.log('Token address:', token.address)
```
