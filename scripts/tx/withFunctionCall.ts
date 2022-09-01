import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { config } from '../config'
import {
  convertBoolToByteWithPadding,
  convertDynamicTypeToByteWithPadding,
  convertFunctionToSelector,
  convertNumberToByteWithPadding,
} from '../utils/converter'
import 'dotenv/config'
import { remove0x } from '../utils/util'

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string

;(async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('wallet address:', wallet.address)

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
  console.log('tx:', tx)

  const rawTx = await wallet.signTransaction(tx)
  console.log('rawTx:', rawTx)

  const res = await fetch(
    `https://api-goerli.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTx}&apikey=${ETHERSCAN_API_KEY}`
  )
  const body = await res.json()
  console.log('response:', body)
})()
