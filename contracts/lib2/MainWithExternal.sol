// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {ExternalLib} from "./ExternalLib.sol";

contract MainWithExternal {
    function add() external pure returns (uint256) {
        return ExternalLib.add(1, 2);
    }

    function sub() external pure returns (uint256) {
        return ExternalLib.sub(2, 1);
    }
}
