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
