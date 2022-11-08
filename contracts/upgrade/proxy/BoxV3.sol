// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

contract BoxV2 {
    uint256 private _x;
    uint256 private _y;

    function setX(uint256 x) external {
        _x = x;
    }

    function setY(uint256 y) external {
        _y = y;
    }

    function getX() external view returns (uint256) {
        return _x + 1;
    }

    function getY() external view returns (uint256) {
        return _y + 1;
    }
}
