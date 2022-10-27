// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {DataTypes} from "./DataTypes.sol";

library Events {
    event ProfileCreated(uint256 indexed profileId, DataTypes.Profile profile);
}
