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

## case.2: baz(uint32 x, bool y)

- function: baz(uint32 x, bool y)
- param1: 69
- param2: true

```byte
0xcdcd77c0                                                       // selector of "bar(bytes3[2] memory)"
0000000000000000000000000000000000000000000000000000000000000045 // first entity of the param
0000000000000000000000000000000000000000000000000000000000000001 // second entity of the param
```

## case.3: sam(bytes memory, bool, uint[] memory)

- function; sam(bytes memory, bool, uint[] memory)
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
0000000000000000000000000000000000000000000000000000000000000003 // start position of the third param
0000000000000000000000000000000000000000000000000000000000000001 // first entity of the third param
0000000000000000000000000000000000000000000000000000000000000002 // second entity of the third param
0000000000000000000000000000000000000000000000000000000000000003 // third entity of the third param
```
