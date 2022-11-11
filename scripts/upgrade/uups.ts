import { ethers, upgrades } from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {
  Pizza__factory,
  PizzaV2__factory,
  PizzaV3__factory,
  PizzaV4__factory,
  PizzaV5__factory,
} from '../../typechain-types'

async function main() {
  // account check
  const deployer = (await ethers.getSigners())[0] as SignerWithAddress
  const balance = (await deployer.getBalance()).toString()
  console.log('deploying contract with the account:', deployer.address)
  console.log('account balance:', balance)

  // pizza with proxy
  const Pizza = await ethers.getContractFactory('Pizza')
  const pizza = await upgrades.deployProxy(Pizza, [8], {
    initializer: 'initialize',
  })
  await pizza.deployed()
  console.log('deployed Pizza:', pizza.address)

  // eat slice
  await Pizza__factory.connect(pizza.address, deployer).eatSlice()

  // get slice
  console.log('value of PizzaV1')
  console.log('slice', Number(await Pizza__factory.connect(pizza.address, deployer).getSlices()))

  // upgrade v2
  const PizzaV2 = await ethers.getContractFactory('PizzaV2')
  await upgrades.upgradeProxy(pizza.address, PizzaV2)
  console.log('Pizza upgraded to V2')

  console.log('value of PizzaV2')
  // get slice
  console.log('slice', Number(await PizzaV2__factory.connect(pizza.address, deployer).getSlices()))
  // eat slice
  await PizzaV2__factory.connect(pizza.address, deployer).eatSlice()
  // get slice
  console.log('slice', Number(await PizzaV2__factory.connect(pizza.address, deployer).getSlices()))
  // refill slice
  await PizzaV2__factory.connect(pizza.address, deployer).refillSlice()
  // get slice
  console.log('slice', Number(await PizzaV2__factory.connect(pizza.address, deployer).getSlices()))
  // pizza version
  console.log('version', Number(await PizzaV2__factory.connect(pizza.address, deployer).pizzaVersion()))

  // upgrade v3
  //const PizzaV3 = await ethers.getContractFactory('PizzaV3')
  //await upgrades.upgradeProxy(pizza.address, PizzaV3)
  //console.log('Pizza upgraded to V3')

  // upgrade v4
  //const PizzaV4 = await ethers.getContractFactory('PizzaV4')
  //await upgrades.upgradeProxy(pizza.address, PizzaV4)
  //console.log('Pizza upgraded to V4')

  // upgrade v5
  const PizzaV5 = await ethers.getContractFactory('PizzaV5')
  await upgrades.upgradeProxy(pizza.address, PizzaV5)
  console.log('Pizza upgraded to V5')

  console.log('value of PizzaV5')
  // get slice
  console.log('slice', Number(await PizzaV5__factory.connect(pizza.address, deployer).getSlices()))
  // eat slice
  await PizzaV5__factory.connect(pizza.address, deployer).eatSlice()
  // get slice
  console.log('slice', Number(await PizzaV5__factory.connect(pizza.address, deployer).getSlices()))

  // get price
  console.log('price', Number(await PizzaV5__factory.connect(pizza.address, deployer).getPrice()))
  // add price
  await PizzaV5__factory.connect(pizza.address, deployer).addPrice()
  // get price
  console.log('price', Number(await PizzaV5__factory.connect(pizza.address, deployer).getPrice()))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
