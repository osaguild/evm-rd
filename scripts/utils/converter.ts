import { ethers } from 'ethers'

// no padding
const convertStringToByte = (str: string) => {
  const byte = ethers.utils.toUtf8Bytes(str)
  return ethers.utils.hexlify(byte)
}

const convertStringToByteWithPadding = (str: string) => {
  const byte = ethers.utils.toUtf8Bytes(str)
  const hex = ethers.utils.hexlify(byte)
  return (hex + Array(64).join('0')).slice(0, 66)
}

// selector format : 0xaabbccdd
const convertFunctionToSelector = (func: string) => {
  const byte = ethers.utils.toUtf8Bytes(func)
  const keccak256 = ethers.utils.keccak256(byte)
  return keccak256.slice(0, 10)
}

const convertNumberToByteWithPadding = (num: number) => {
  //const byte = ethers.utils.toUtf8Bytes(num.toString())
  const hex = ethers.utils.hexlify(num)
  const removed0xHex = hex.slice(2)
  const paddingNumber = (Array(64).join('0') + removed0xHex).slice(removed0xHex.length - 1)
  return '0x' + paddingNumber
}

const convertBoolToByteWithPadding = (bool: boolean) => {
  return bool
    ? '0x0000000000000000000000000000000000000000000000000000000000000001'
    : '0x0000000000000000000000000000000000000000000000000000000000000000'
}

// usually startPosition is 32,64,96,128,160,192,224,256...
const convertDynamicTypeToByteWithPadding = (str: string, startPosition: number) => {
  const value = convertStringToByteWithPadding(str)
  const length = convertNumberToByteWithPadding(str.length)
  const at = convertNumberToByteWithPadding(startPosition)
  return { value, length, at }
}

;(async () => {
  console.log('convertStringToByte("hello world")                   :', convertStringToByte('hello world'))
  console.log('convertStringToByteWithPadding("hello world")        :', convertStringToByteWithPadding('hello world'))
  console.log('convertFunctionToSelector("withdraw(uint256)")       :', convertFunctionToSelector('withdraw(uint256)'))
  console.log('convertNumberToByteWithPadding(123)                  :', convertNumberToByteWithPadding(123))
  console.log('convertBoolToByteWithPadding(true)                   :', convertBoolToByteWithPadding(true))
  console.log('convertDynamicTypeToByteWithPadding("hello world",32):', convertDynamicTypeToByteWithPadding('hello world', 32))
})()

export {
  convertStringToByte,
  convertStringToByteWithPadding,
  convertFunctionToSelector,
  convertNumberToByteWithPadding,
  convertBoolToByteWithPadding,
  convertDynamicTypeToByteWithPadding,
}
