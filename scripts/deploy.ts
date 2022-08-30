import { ethers } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

async function main() {
  // account check
  const deployer = (await ethers.getSigners())[0] as SignerWithAddress
  const balance = (await deployer.getBalance()).toString()
  console.log('deploying contract with the account:', deployer.address)
  console.log('account balance:', balance)

  // token
  const tokenFactory = await ethers.getContractFactory('Token')
  const token = await tokenFactory.deploy()
  console.log('Token address:', token.address)

  // manager
  const managerFactory = await ethers.getContractFactory('Manager')
  const manager = await managerFactory.deploy(deployer.address)
  console.log('Manager address:', manager.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
