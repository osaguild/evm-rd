import { ethers } from 'hardhat'
import { expect } from 'chai'
import { BusinessLogic__factory, Profile__factory, Profile } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Partitioning', () => {
  let deployer: SignerWithAddress
  let user: SignerWithAddress
  let profile: Profile

  before(async () => {
    // set signer
    const signers = (await ethers.getSigners()) as SignerWithAddress[]
    deployer = signers[0] as SignerWithAddress
    user = signers[1] as SignerWithAddress

    // deploy contract
    const logic = await new BusinessLogic__factory(deployer).deploy()
    const libs = {
      'contracts/lib/BusinessLogic.sol:BusinessLogic': logic.address,
    }
    profile = await new Profile__factory(libs, deployer).deploy()
  })

  it('call Profile.createProfile()', async () => {
    const _profile = {
      firstName: 'John',
      lastName: 'Doe',
      sex: 0, // Male
      bloodType: 0, // A
      age: 20,
    }
    const _tx = await profile.createProfile(_profile)
    const _receipt = await _tx.wait()

    await expect(_tx).to.be.emit(profile, 'ProfileCreated')
  })

  it('call Profile.getMessage()', async () => {
    const _tx = await profile.getMessage(1)

    await expect(_tx).to.be.equals('Mr.John')
  })

  it('error Profile.createProfile()', async () => {
    const _profile = {
      firstName: 'John',
      lastName: 'Doe',
      sex: 0, // Male
      bloodType: 0, // A
      age: 15,
    }
    try {
      await profile.createProfile(_profile)
    } catch (e: any) {
      expect(e.message).to.be.include("reverted with custom error 'Validation()'")
    }
  })
})
