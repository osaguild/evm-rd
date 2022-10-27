// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {DataTypes} from "./DataTypes.sol";
import {Errors} from "./Errors.sol";
import {Events} from "./Events.sol";
import {Constants} from "./Constants.sol";
import "hardhat/console.sol";

library BusinessLogic {
    function create(
        DataTypes.Profile calldata vars,
        uint256 profileId,
        mapping(uint256 => DataTypes.Profile) storage _profiles,
        mapping(uint256 => string) storage _messages
    ) external returns (uint256) {
        if (bytes(vars.firstName).length == 0) {
            revert Errors.Validation();
        }

        if (bytes(vars.lastName).length == 0) {
            revert Errors.Validation();
        }

        if (vars.age < 18) {
            revert Errors.Validation();
        }

        _profiles[profileId] = vars;
        _messages[profileId] = _strConnect(Constants.MR, vars.firstName);

        emit Events.ProfileCreated(profileId, vars);

        return profileId;
    }

    function _strConnect(string memory str1, string memory str2) internal pure returns (string memory) {
        return string(abi.encodePacked(str1, str2));
    }
}
