# template-web3-back-sol-hardhat

template repository for web3 back-end using solidity and hardhat

# stacks

| stack                | category     | description                          |
| -------------------- | ------------ | ------------------------------------ |
| solidity             | dev          | language of smart contract           |
| hardhat              | dev          | smart contract framework             |
| ethers               | dev          | javascript library for dapps         |
| typechain            | build        | provide abi to front-end test        |
| waffle               | test         | testing framework for smart contract |
| mocha                | test         | testing framework for bdd / tdd      |
| chai                 | test         | assertion library                    |
| hardhat-gas-reporter | test         | ethereum gas reporter                |
| solidity-coverage    | test         | coverage tool                        |
| solhint              | static check | linter for solidity                  |
| eslint               | static check | linter for javascript / typescript   |
| prettier             | static check | fix style automatically              |
| husky                | static check | prevent to commit non checked code   |

# how to use this template?

- update `xxx` on package.json
- delete sample code under `./contracts`, `./test` and `./scripts`
  - `./contracts` : sample solidity code.
  - `./test` : sample test code of contract.
  - `./scripts` : sample deploy script.
- set environment variables to `.env`. sample env is `.env.sample`.
  - `ALCHEMY_API_KEY` : for deploy via Alchemy api. please get api key from [here](https://www.alchemy.com/)
  - `PRIVATE_KEY` : your private key.
  - `ETHERSCAN_API_KEY` : your etherscan api key. use it to verify source code on etherscan. please get api key from [here](https://etherscan.io/)
  - `COIN_MARKET_CAP_API_KEY` : your coin market cap api key. use it to know USD price of eth. please get api key from [here](https://coinmarketcap.com/)

# how to verify your source code on etherscan?

## case.1: if contract hasn't constructor or has constructor with no arguments.

```yarn
yarn verify-goerli YOUR_CONTRACT_ADDRESS

/* sample */
yarn verify-goerli 0x3A345Cef4a5d672BADa38f9f03fc09Eb67e70e39
```

## case.2: if contract has constructor with arguments.

```yarn
yarn verify-goerli YOUR_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS_1
yarn verify-goerli YOUR_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS_1 CONSTRUCTOR_ARGUMENTS_2 ...

/* sample */
yarn verify-goerli 0x3A345Cef4a5d672BADa38f9f03fc09Eb67e70e39 "hello"
yarn verify-goerli 0x3A345Cef4a5d672BADa38f9f03fc09Eb67e70e39 "hello" "world" ...
```

## case.3: if you want to specify contract code. e.g. same structure contract on your repository.

```yarn
yarn verify-goerli --contract YOUR_CONTRACT_CODE_PATH:YOUR_CONTRACT_NAME YOUR_CONTRACT_ADDRESS

/* sample */
yarn verify-goerli --contract contracts/Token.sol:Token 0x3A345Cef4a5d672BADa38f9f03fc09Eb67e70e39
```
