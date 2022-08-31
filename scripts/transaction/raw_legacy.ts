import { ethers } from 'ethers'
import fetch from 'node-fetch'
import { config } from '../config'
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string

;(async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('wallet address:', wallet.address)

  const tx = {
    to: config.SUB2_WALLET,
    value: ethers.utils.parseEther('0.01').toHexString(),
    gasLimit: ethers.utils.hexlify(21000), // 21000 is the default
    gasPrice: ethers.utils.parseEther('0.000000001').toHexString(), // to avoid transaction underpriced
    nonce: 3,
    type: 0, // 0 means regacy transaction
    chainId: 5, // goerli
  }

  const rawTx = await wallet.signTransaction(tx)
  console.log('rawTx:', rawTx)

  const res = await fetch(
    `https://api-goerli.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTx}&apikey=${ETHERSCAN_API_KEY}`
  )
  const body = await res.json()
  console.log('response:', body)
})()
