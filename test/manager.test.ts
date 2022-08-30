import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Manager } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('MedicalDataManager.sol', () => {
  let owner: SignerWithAddress
  let user: SignerWithAddress
  let contract: Manager

  before(async () => {
    const signers = await ethers.getSigners()
    owner = signers[0] as SignerWithAddress
    user = signers[1] as SignerWithAddress
    const factory = await ethers.getContractFactory('Manager')
    contract = await factory.deploy(owner.address)
  })
  it('set message', async () => {
    await expect(contract.connect(owner).setMessage('hello world!'))
      .to.emit(contract, 'SetMessage')
      .withArgs(owner.address, 'hello world!')
  })
  it('revert set message', async () => {
    await expect(contract.connect(user).setMessage('hello world!')).to.be.revertedWith('Only owner can call')
  })
  it('get message', async () => {
    expect(await contract.connect(user).getMessage()).to.equal('hello world!')
  })
})
