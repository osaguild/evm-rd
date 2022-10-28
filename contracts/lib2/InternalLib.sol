// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

library InternalLib {
    function add(uint256 _x, uint256 _y) internal pure returns (uint256) {
        return (_x + _y);
    }

    function sub(uint256 _x, uint256 _y) internal pure returns (uint256) {
        return (_x - _y);
    }
}
