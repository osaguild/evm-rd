import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { config } from '../config'
import { convertFunctionToSelector, convertDynamicTypeToByteWithPadding } from '../utils/converter'
import 'dotenv/config'
import { remove0x } from '../utils/util'

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string

;(async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('wallet address:', wallet.address)

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
  console.log('tx:', tx)

  const rawTx = await wallet.signTransaction(tx)
  console.log('rawTx:', rawTx)

  const res = await fetch(
    `https://api-goerli.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTx}&apikey=${ETHERSCAN_API_KEY}`
  )
  const body = await res.json()
  console.log('response:', body)
})()
