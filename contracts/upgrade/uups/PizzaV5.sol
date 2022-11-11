// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "./Pizza.sol";

contract PizzaV5 is Pizza {
    uint256 public price;

    function addPrice() external {
        price += 1;
    }

    function getPrice() external view returns (uint256) {
        return price;
    }
}
