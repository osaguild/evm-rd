// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PizzaV4 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public price;

    function initialize(uint256 _price) public initializer {
        price = _price;
        __Ownable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function addPrice() external {
        price += 1;
    }

    function getPrice() external view returns (uint256) {
        return price;
    }
}
