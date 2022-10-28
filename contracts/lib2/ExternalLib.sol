// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

library ExternalLib {
    function add(uint256 _x, uint256 _y) external pure returns (uint256) {
        return (_x + _y);
    }

    function sub(uint256 _x, uint256 _y) external pure returns (uint256) {
        return (_x - _y);
    }
}
