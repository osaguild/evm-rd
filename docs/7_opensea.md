# opensea

this is test for [issue](https://github.com/hackdays-io/mint-rally/issues/190). I researched about it but I couldn't find the solution. I try to test some ERC721 contract which how shows on the opensea.

## 0. environment

polygon mumbai test net

## 1. ERC721Enumerable

### code

```solidity
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Erc721 is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _baseTokenURI = 'https://osaguild.com/';

  constructor() ERC721('SimpleNFT', 'TEST') {}

  function mint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _tokenIds.increment();
    return newItemId;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }
}

```

### polygon scan

https://mumbai.polygonscan.com/tx/0xcb66442f3107e9d25b78d8babaca4b8c6e28e4defe66ecfd323799b318eade35

### opensea

https://testnets.opensea.io/assets/mumbai/0x99aad9c14f4ccda5e49e84d1dabd0400e4da2476/1

## 2. ERC721EnumerableUpgradeable

### code

```solidity
contract Erc721Upgradeable is Initializable, ERC721EnumerableUpgradeable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _baseTokenURI;

  function initialize(
    string memory name,
    string memory symbol,
    string memory baseTokenURI
  ) public initializer {
    __ERC721_init(name, symbol);
    _baseTokenURI = baseTokenURI;
  }

  function mint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _tokenIds.increment();
    return newItemId;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }
}

```

### polygon scan

https://mumbai.polygonscan.com/tx/0xeafedb60d9c98499255ceac6aa18e11fd6abd1c38197c35b5d6b0fe33a906552

### opensea

https://testnets.opensea.io/assets/mumbai/0x936a5159ddc71dda8d6f59aeba8dc08aa6b3ecac/0

## Opensea's metatransaction example

### links

- [docs](https://docs.opensea.io/docs/polygon-basic-integration#meta-transactions)
- [sample code](https://github.com/ProjectOpenSea/meta-transactions/blob/main/contracts/ERC721MetaTransactionMaticSample.sol)
- [OpenZeppelin](https://docs.openzeppelin.com/learn/sending-gasless-transactions)

### code

`./contracts/ERC721MetaTransaction.sol`

```solidity
contract Erc721MetaTransaction is ERC721Enumerable, ContextMixin, NativeMetaTransaction {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private _baseTokenURI = 'https://osaguild.com/';

  constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
    _initializeEIP712(name_);
  }

  /**
   * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
   */
  function _msgSender() internal view override returns (address sender) {
    return ContextMixin.msgSender();
  }

  /**
   * As another option for supporting trading without requiring meta transactions, override isApprovedForAll to whitelist OpenSea proxy accounts on Matic
   */
  function isApprovedForAll(address _owner, address _operator) public view override returns (bool isOperator) {
    if (_operator == address(0xf4aAA4b38a0E749415E37638879BeDfe47645a77)) {
      return true;
    }

    return ERC721.isApprovedForAll(_owner, _operator);
  }

  function mint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(to, newItemId);
    _tokenIds.increment();
    return newItemId;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }
}

```

### steps to run metatransaction

- deploy contract to mumbai testnets: `yarn deploy-mumbai`
- run script to get params for executeMetaTransaction(): `yarn run-mumbai ./scripts/call/erc721Meta.js`
- open [polygonscan mumbai](https://mumbai.polygonscan.com/address/0x515bda3ff61447a20e55263f029d5bef1b13ab26#writeContract)
- set params and click "Write" button

### polygon scan
https://mumbai.polygonscan.com/tx/0xd54df03d36c5b3ee8b9fb5c7d2eda79f602b4e1fd568c9dade20e959de878517

### opensea

https://testnets.opensea.io/assets/mumbai/0x515bda3ff61447a20e55263f029d5bef1b13ab26/0