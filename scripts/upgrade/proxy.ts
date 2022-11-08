import { ethers, upgrades } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { Box__factory } from '../../typechain-types'

async function main() {
  // account check
  const deployer = (await ethers.getSigners())[0] as SignerWithAddress
  const balance = (await deployer.getBalance()).toString()
  console.log('deploying contract with the account:', deployer.address)
  console.log('account balance:', balance)

  // Box with proxy
  const Box = await ethers.getContractFactory('Box')
  const box = await upgrades.deployProxy(Box)
  await box.deployed()
  console.log('deployed Box:', box.address)

  // set x, y, z
  await Box__factory.connect(box.address, deployer).setX(1)
  await Box__factory.connect(box.address, deployer).setY(2)
  await Box__factory.connect(box.address, deployer).setZ(3)

  // get x, y, z
  console.log('value of Box')
  console.log('x', await Box__factory.connect(box.address, deployer).getX())
  console.log('y', await Box__factory.connect(box.address, deployer).getY())
  console.log('z', await Box__factory.connect(box.address, deployer).getZ())

  // upgrade v2
  const BoxV2 = await ethers.getContractFactory('BoxV2')
  await upgrades.upgradeProxy(box.address, BoxV2)
  console.log('Box upgraded to V2')

  // get x, y, z
  console.log('value of BoxV2')
  console.log(await Box__factory.connect(box.address, deployer).getX())
  console.log(await Box__factory.connect(box.address, deployer).getY())
  console.log(await Box__factory.connect(box.address, deployer).getZ())

  await Box__factory.connect(box.address, deployer).setX(11)
  await Box__factory.connect(box.address, deployer).setY(12)
  await Box__factory.connect(box.address, deployer).setZ(13)

  console.log(await Box__factory.connect(box.address, deployer).getX())
  console.log(await Box__factory.connect(box.address, deployer).getY())
  console.log(await Box__factory.connect(box.address, deployer).getZ())

  // upgrade v3 is failed
  //const BoxV3 = await ethers.getContractFactory('BoxV3')
  //await upgrades.upgradeProxy(box.address, BoxV3)
  //console.log('Box upgraded to V3')

  // upgrade v4 is failed
  //const BoxV4 = await ethers.getContractFactory('BoxV4')
  //await upgrades.upgradeProxy(box.address, BoxV4)
  //console.log('Box upgraded to V3')

  /*
  // get x, y, z
  console.log('value of BoxV3')
  console.log(await Box__factory.connect(box.address, deployer).getX())
  console.log(await Box__factory.connect(box.address, deployer).getY())
  console.log(await Box__factory.connect(box.address, deployer).getZ())

  await Box__factory.connect(box.address, deployer).setX(21)
  await Box__factory.connect(box.address, deployer).setY(22)
  await Box__factory.connect(box.address, deployer).setZ(23)

  console.log(await Box__factory.connect(box.address, deployer).getX())
  console.log(await Box__factory.connect(box.address, deployer).getY())
  console.log(await Box__factory.connect(box.address, deployer).getZ())
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
