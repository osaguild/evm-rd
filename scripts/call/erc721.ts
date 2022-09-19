import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { Erc721__factory, Erc721Upgradeable__factory } from '../../typechain-types'
import { mumbai as config } from '../config'
;(async () => {
  const [deployer] = await ethers.getSigners()
  await Erc721__factory.connect(config.ERC721_CONTRACT, deployer as SignerWithAddress).mint(config.SUB1_WALLET)
  await Erc721Upgradeable__factory.connect(config.ERC721UPGRADEABLE_CONTRACT, deployer as SignerWithAddress).mint(
    config.SUB1_WALLET
  )
})()
