import { ethers, upgrades } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

async function main() {
  // account check
  const deployer = (await ethers.getSigners())[0] as SignerWithAddress
  const balance = (await deployer.getBalance()).toString()
  console.log('deploying contract with the account:', deployer.address)
  console.log('account balance:', balance)

  // Upgradeable
  // const Upgradeable = await ethers.getContractFactory('AdminUpgradeable')
  // const upgradeable = await upgrades.deployProxy(Upgradeable, [11])
  // await upgradeable.deployed()
  // console.log('upgradeable address:', upgradeable.address)

  // UpgradeableV2
  // const UpgradeableV2 = await ethers.getContractFactory('AdminUpgradeableV2')
  // const upgradeableV2 = await upgrades.deployProxy(UpgradeableV2, [21])
  // await upgradeableV2.deployed()
  // console.log('upgradeableV2 address:', upgradeableV2.address)

  // Pauseable
  // const Pausable = await ethers.getContractFactory('AdminPausable')
  // const pausable = await Pausable.deploy()
  // await pausable.deployed()
  // console.log('pausable address:', pausable.address)

  // Pauseable
  const Access = await ethers.getContractFactory('AdminAccessControl')
  const access = await Access.deploy()
  await access.deployed()
  console.log('access address:', access.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
