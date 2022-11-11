// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

contract Box {
    uint256 private _x;
    uint256 private _y;
    uint256 private _z;

    function setX(uint256 x) external {
        _x = x;
    }

    function setY(uint256 y) external {
        _y = y;
    }

    function setZ(uint256 z) external {
        _z = z;
    }

    function getX() external view returns (uint256) {
        return _x;
    }

    function getY() external view returns (uint256) {
        return _y;
    }

    function getZ() external view returns (uint256) {
        return _z;
    }
}
