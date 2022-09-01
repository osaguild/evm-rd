import fetch from 'node-fetch'
import 'dotenv/config'

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string
const txHash = "0xcae6df0c681a9ab8322636d7782a17a41f0e7ea39f83cf2169f4674d270e0d09"

;(async () => {
  const res = await fetch(
    `https://api-goerli.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`
  )
  console.log('response:', res)
})()
