import { ethers } from 'ethers'
import fetch from 'node-fetch'
import 'dotenv/config'

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const SUB2_ADDRESS = '0x164dCE432070439B6595c21d41CB28f9B8114342'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string

;(async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  console.log('wallet address:', wallet.address)

  const tx = {
    to: SUB2_ADDRESS,
    value: ethers.utils.parseEther('0.01'),
    gasLimit: '21000', // 21000 is the default
    maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'), // for EIP1559
    maxFeePerGas: ethers.utils.parseUnits('20', 'gwei'), // for EIP1559
    nonce: 5,
    type: 2, // 2 means EIP1559 transaction
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
