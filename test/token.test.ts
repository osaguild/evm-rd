import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Token } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Token.sol', () => {
  let user: SignerWithAddress
  let contract: Token

  before(async () => {
    // set signer
    const signers = (await ethers.getSigners()) as SignerWithAddress[]
    user = signers[1] as SignerWithAddress
    // deploy contract
    const factory = await ethers.getContractFactory('Token')
    contract = await factory.deploy()
  })
  it('mint', async () => {
    await expect(contract.connect(user).mint('token uri 1'))
      .to.emit(contract, 'Transfer')
      .withArgs('0x0000000000000000000000000000000000000000', user.address, 1)
  })
  it('balanceOf', async () => {
    expect(await contract.connect(user).balanceOf(user.address)).to.equal(1)
  })
  it('ownerOf', async () => {
    expect(await contract.connect(user).ownerOf(1)).to.equal(user.address)
  })
  it('tokenURI', async () => {
    expect(await contract.connect(user).tokenURI(1)).to.equal('token uri 1')
  })
})
