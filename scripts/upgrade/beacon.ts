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
  const beacon = await upgrades.deployBeacon(Box)
  await beacon.deployed()
  console.log('deployed Beacon:', beacon.address)

  const box = await upgrades.deployBeaconProxy(beacon.address, Box)
  await box.deployed()
  console.log('deployed Box:', box.address)

  // set x, y, z
  await Box__factory.connect(box.address, deployer).setX(1)
  await Box__factory.connect(box.address, deployer).setY(2)
  await Box__factory.connect(box.address, deployer).setZ(3)

  // get x, y, z
  console.log('value of BoxV1')
  console.log(
    'x',
    Number(await Box__factory.connect(box.address, deployer).getX()),
    'y',
    Number(await Box__factory.connect(box.address, deployer).getY()),
    'z',
    Number(await Box__factory.connect(box.address, deployer).getZ())
  )

  // upgrade v2
  const BoxV2 = await ethers.getContractFactory('BoxV2')
  await upgrades.upgradeBeacon(beacon.address, BoxV2)
  console.log('Box upgraded to V2')

  // get x, y, z
  console.log('value of BoxV2')
  console.log(
    'x',
    Number(await Box__factory.connect(box.address, deployer).getX()),
    'y',
    Number(await Box__factory.connect(box.address, deployer).getY()),
    'z',
    Number(await Box__factory.connect(box.address, deployer).getZ())
  )

  await Box__factory.connect(box.address, deployer).setX(11)
  await Box__factory.connect(box.address, deployer).setY(12)
  await Box__factory.connect(box.address, deployer).setZ(13)

  console.log('updated value of BoxV2')
  console.log(
    'x',
    Number(await Box__factory.connect(box.address, deployer).getX()),
    'y',
    Number(await Box__factory.connect(box.address, deployer).getY()),
    'z',
    Number(await Box__factory.connect(box.address, deployer).getZ())
  )

  // upgrade v3 is failed
  //const BoxV3 = await ethers.getContractFactory('BoxV3')
  //await upgrades.upgradeBeacon(beacon.address, BoxV3)
  //console.log('Box upgraded to V3')

  // upgrade v4 is succeeded
  //const BoxV4 = await ethers.getContractFactory('BoxV4')
  //await upgrades.upgradeBeacon(beacon.address, BoxV4)
  //console.log('Box upgraded to V4')

  // upgrade v5 is failed
  const BoxV5 = await ethers.getContractFactory('BoxV5')
  await upgrades.upgradeBeacon(beacon.address, BoxV5)
  console.log('Box upgraded to V5')

  // get x, y, z
  console.log('value of BoxV3/4/5')
  console.log(
    'x',
    Number(await Box__factory.connect(box.address, deployer).getX()),
    'y',
    Number(await Box__factory.connect(box.address, deployer).getY()),
    'z',
    Number(await Box__factory.connect(box.address, deployer).getZ())
  )

  await Box__factory.connect(box.address, deployer).setX(21)
  await Box__factory.connect(box.address, deployer).setY(22)
  await Box__factory.connect(box.address, deployer).setZ(23)

  console.log('updated value of BoxV3/4/5')
  console.log(
    'x',
    Number(await Box__factory.connect(box.address, deployer).getX()),
    'y',
    Number(await Box__factory.connect(box.address, deployer).getY()),
    'z',
    Number(await Box__factory.connect(box.address, deployer).getZ())
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
