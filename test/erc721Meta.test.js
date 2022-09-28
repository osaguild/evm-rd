const sigUtil = require('eth-sig-util')
const ethUtils = require('ethereumjs-util')

const { expect } = require('chai')
const { ethers } = require('hardhat')
const web3Abi = require('web3-eth-abi')

const { MockProvider } = require('ethereum-waffle')

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

const getTransactionData = async (user, nonce, abi, domainData, params) => {
  const functionSignature = web3Abi.encodeFunctionCall(abi, params)

  let message = {}
  message.nonce = parseInt(nonce)
  message.from = await user.getAddress()
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

  const signature = sigUtil.signTypedData(ethUtils.toBuffer(user.privateKey), {
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

describe('Erc721MetaTransaction', function () {
  let erc721

  before(async () => {
    const Erc721MetaTransactionFactory = await ethers.getContractFactory('Erc721MetaTransaction')
    const erc721MetaTransaction = await Erc721MetaTransactionFactory.deploy('Sample Token', 'ST')

    erc721 = await erc721MetaTransaction.deployed()
  })
  it('mint MetaTransaction Test', async function () {
    const wallet = new MockProvider().createEmptyWallet()

    let name = await erc721.name()
    let nonce = await erc721.getNonce(wallet.getAddress())
    let version = '1'
    let chainId = await erc721.getChainId()
    let domainData = {
      name: name,
      version: version,
      verifyingContract: erc721.address,
      salt: '0x' + chainId.toHexString().substring(2).padStart(64, '0'),
    }

    let { r, s, v, functionSignature } = await getTransactionData(wallet, nonce, mint, domainData, [wallet.address])

    let user = await wallet.getAddress()
    const metaTransaction = await erc721.executeMetaTransaction(user, functionSignature, r, s, v)
    expect(metaTransaction).to.emit(erc721, 'Transfer').withArgs(ethers.constants.AddressZero, wallet.address, 0)
  })
})
