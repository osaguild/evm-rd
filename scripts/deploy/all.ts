import { ethers, upgrades } from 'hardhat'
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

  // payable
  const payable1Factory = await ethers.getContractFactory('Payable1')
  const payable1 = await payable1Factory.deploy()
  console.log('Payable1 address:', payable1.address)

  const payable2Factory = await ethers.getContractFactory('Payable2')
  const payable2 = await payable2Factory.deploy()
  console.log('Payable2 address:', payable2.address)

  const payable3Factory = await ethers.getContractFactory('Payable3')
  const payable3 = await payable3Factory.deploy()
  console.log('Payable3 address:', payable3.address)

  // Foo
  const fooFactory = await ethers.getContractFactory('Foo')
  const foo = await fooFactory.deploy()
  console.log('Foo address:', foo.address)

  // Erc721
  const erc721Factory = await ethers.getContractFactory('Erc721')
  const erc721 = await erc721Factory.deploy()
  console.log('Erc721 address:', erc721.address)

  // Erc721Upgradeable
  const erc721UpgradeableFactory = await ethers.getContractFactory('Erc721Upgradeable')
  const erc721Upgradeable = await upgrades.deployProxy(erc721UpgradeableFactory, [
    'SimpleNFT',
    'TEST',
    'https://osaguild.com/',
  ])
  await erc721Upgradeable.deployed()
  console.log('Erc721Upgradeable address:', erc721Upgradeable.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
