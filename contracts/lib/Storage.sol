// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {DataTypes} from "./DataTypes.sol";

abstract contract Storage {
    mapping(uint256 => DataTypes.Profile) internal _profiles;
    mapping(uint256 => string) internal _messages;
    uint256 internal _profileCounter;
}
