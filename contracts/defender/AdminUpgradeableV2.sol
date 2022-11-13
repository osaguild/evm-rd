// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract AdminUpgradeableV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public count;

    function initialize(uint256 _defaultCount) public initializer {
        count = _defaultCount;
        __Ownable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function addCount() external {
        count += 2;
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}
