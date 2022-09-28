const sigUtil = require('eth-sig-util')
const ethUtils = require('ethereumjs-util')

const { ethers } = require('hardhat')
const web3Abi = require('web3-eth-abi')

const { Erc721MetaTransaction__factory } = require('../../typechain-types')

const domainType = [
  {
    name: 'name',
    type: 'string',
  },
  {
    name: 'version',
    type: 'string',
  },
  {
    name: 'verifyingContract',
    type: 'address',
  },
  {
    name: 'salt',
    type: 'bytes32',
  },
]

const metaTransactionType = [
  {
    name: 'nonce',
    type: 'uint256',
  },
  {
    name: 'from',
    type: 'address',
  },
  {
    name: 'functionSignature',
    type: 'bytes',
  },
]

let mint = {
  inputs: [
    {
      internalType: 'address',
      name: 'to',
      type: 'address',
    },
  ],
  name: 'mint',
  outputs: [
    {
      internalType: 'uint256',
      name: '',
      type: 'uint256',
    },
  ],
  stateMutability: 'nonpayable',
  type: 'function',
}

const getTransactionData = async (address, privateKey, nonce, abi, domainData, params) => {
  const functionSignature = web3Abi.encodeFunctionCall(abi, params)

  let message = {}
  message.nonce = parseInt(nonce)
  message.from = await address
  message.functionSignature = functionSignature

  const dataToSign = {
    types: {
      EIP712Domain: domainType,
      MetaTransaction: metaTransactionType,
    },
    domain: domainData,
    primaryType: 'MetaTransaction',
    message: message,
  }

  const signature = sigUtil.signTypedData(ethUtils.toBuffer(privateKey), {
    data: dataToSign,
  })

  let r = signature.slice(0, 66)
  let s = '0x'.concat(signature.slice(66, 130))
  let v = '0x'.concat(signature.slice(130, 132))
  v = parseInt(v)
  if (![27, 28].includes(v)) v += 27

  return {
    r,
    s,
    v,
    functionSignature,
  }
}

;(async () => {
  const [sub_1] = await ethers.getSigners()
  const erc721 = await Erc721MetaTransaction__factory.connect('0x515BDA3FF61447a20e55263f029d5BEf1B13ab26', sub_1)

  let name = await erc721.name()
  let nonce = await erc721.getNonce(sub_1.address)
  let version = '1'
  let chainId = await erc721.getChainId()
  let domainData = {
    name: name,
    version: version,
    verifyingContract: erc721.address,
    salt: '0x' + chainId.toHexString().substring(2).padStart(64, '0'),
  }

  let { r, s, v, functionSignature } = await getTransactionData(
    sub_1.address,
    '0x' + process.env.PRIVATE_KEY,
    nonce,
    mint,
    domainData,
    [sub_1.address]
  )

  console.log('userAddress:', sub_1.address)
  console.log('functionSignature:', functionSignature)
  console.log('r:', r)
  console.log('s:', s)
  console.log('v:', v)
})()
