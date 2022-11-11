// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract PizzaV3 {
    uint256 public slices;

    ///@dev decrements the slices when called
    function eatSlice() external {
        require(slices > 1, "no slices left");
        slices -= 1;
    }

    function getSlices() external view returns (uint256) {
        return slices;
    }
}
