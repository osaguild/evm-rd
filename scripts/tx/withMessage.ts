import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { goerli as config } from '../config'
import { convertStringToByte } from '../utils/converter'
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string

;(async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('wallet address:', wallet.address)

  const tx = {
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
  console.log('tx:', tx)

  const rawTx = await wallet.signTransaction(tx)
  console.log('rawTx:', rawTx)

  const res = await fetch(
    `https://api-goerli.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTx}&apikey=${ETHERSCAN_API_KEY}`
  )
  const body = await res.json()
  console.log('response:', body)
})()
