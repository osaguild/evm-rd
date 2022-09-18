import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { Manager__factory } from '../../typechain-types'
import { goerli as config } from '../config'
;(async () => {
  const [deployer] = await ethers.getSigners()
  await Manager__factory.connect(config.MANAGER_CONTRACT, deployer as SignerWithAddress).setMessage('hello world')
})()
