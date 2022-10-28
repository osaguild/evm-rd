import { ethers } from 'hardhat'
import { expect } from 'chai'
import {
  ExternalLib__factory,
  MainWithExternal__factory,
  MainWithInternal__factory,
} from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Partitioning', () => {
  let deployer: SignerWithAddress
  let user: SignerWithAddress

  beforeEach(async () => {
    // set signer
    const signers = (await ethers.getSigners()) as SignerWithAddress[]
    deployer = signers[0] as SignerWithAddress
    user = signers[1] as SignerWithAddress
  })

  it('internal lib', async () => {
    const inMain = await new MainWithInternal__factory(deployer).deploy()
    expect(await inMain.add()).to.be.equals(3)
    expect(await inMain.sub()).to.be.equals(1)
  })

  it('external lib', async () => {
    const exLib = await new ExternalLib__factory(deployer).deploy()
    const exMain = await new MainWithExternal__factory(
      { 'contracts/lib2/ExternalLib.sol:ExternalLib': exLib.address },
      deployer
    ).deploy()
    expect(await exMain.add()).to.be.equals(3)
    expect(await exMain.sub()).to.be.equals(1)
  })
})
