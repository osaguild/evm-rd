// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {DataTypes} from "./DataTypes.sol";
import {IProfile} from "./IProfile.sol";
import {Storage} from "./Storage.sol";
import {BusinessLogic} from "./BusinessLogic.sol";

contract Profile is IProfile, Storage {
    function createProfile(DataTypes.Profile calldata profile) external override {
        BusinessLogic.create(profile, ++_profileCounter, _profiles, _messages);
    }

    function getMessage(uint256 profileId) external view override returns (string memory) {
        return _messages[profileId];
    }

    event ProfileCreated(uint256 indexed profileId, DataTypes.Profile profile);
}
