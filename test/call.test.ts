import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Callee__factory, Caller__factory, Caller, Callee } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Partitioning', () => {
  let deployer: SignerWithAddress
  let user: SignerWithAddress
  let caller: Caller
  let callee: Callee

  beforeEach(async () => {
    // set signer
    const signers = (await ethers.getSigners()) as SignerWithAddress[]
    deployer = signers[0] as SignerWithAddress
    user = signers[1] as SignerWithAddress

    // deploy contract
    callee = await new Callee__factory(deployer).deploy()
    caller = await new Caller__factory(deployer).deploy()
    await caller.setCallee(callee.address)
  })

  it('call', async () => {
    await caller.addCall(1, 2)
    const res1 = await caller.get()
    console.log(
      'caller: x =',
      res1[0].toString(),
      ', y =',
      res1[1].toString(),
      ', v =',
      res1[2].toString(),
      ', w =',
      res1[3].toString(),
      ', sender =',
      res1[4].toString() == deployer.address ? 'deployer' : 'unknown'
    )
    const res2 = await callee.get()
    console.log(
      'callee: x =',
      res2[0].toString(),
      ', y =',
      res2[1].toString(),
      ', sender =',
      res2[2].toString() == caller.address ? 'caller' : 'unknown'
    )
  })

  it('delegate call', async () => {
    await caller.addDelegateCall(1, 2)
    const res1 = await caller.get()
    console.log(
      'caller: x =',
      res1[0].toString(),
      ', y =',
      res1[1].toString(),
      ', v =',
      res1[2].toString(),
      ', w =',
      res1[3].toString(),
      ', sender =',
      res1[4].toString() == deployer.address ? 'deployer' : 'unknown'
    )
    const res2 = await callee.get()
    console.log(
      'callee: x =',
      res2[0].toString(),
      ', y =',
      res2[1].toString(),
      ', sender =',
      res2[2].toString() == ethers.constants.AddressZero ? 'zero address' : 'unknown'
    )
  })

  it('initialize', async () => {
    await expect(caller.initialize()).to.be.emit(caller, 'Response').withArgs(true, 'ExternalContract')
    expect(await callee.getName()).to.be.equals('ExternalContract')
  })

  it('sayHello', async () => {
    await expect(caller.sayHello()).to.be.emit(caller, 'Response').withArgs(true, 'Hello')
    expect(await callee.getGreeting()).to.be.equals('Hello')
  })

  it('seyGreeting', async () => {
    await expect(caller.seyGreeting()).to.be.emit(caller, 'Response').withArgs(true, 'Have a nice day')
    expect(await callee.getGreeting()).to.be.equals('Good morning')
    expect(await callee.getMessage()).to.be.equals('Have a nice day')
  })

  it('getName', async () => {
    await caller.initialize()
    expect(await caller.getName()).to.be.equals('ExternalContract')
  })
})
