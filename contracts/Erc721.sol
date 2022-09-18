// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Erc721 is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private _baseTokenURI = "https://osaguild.com/";

    constructor() ERC721("SimpleNFT", "TEST") {}

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
