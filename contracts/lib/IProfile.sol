// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {DataTypes} from "./DataTypes.sol";

interface IProfile {
    function createProfile(DataTypes.Profile calldata profile) external;

    function getMessage(uint256 profileId) external view returns (string memory);
}
