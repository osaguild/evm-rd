// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {InternalLib} from "./InternalLib.sol";

contract MainWithInternal {
    function add() external pure returns (uint256) {
        return InternalLib.add(1, 2);
    }

    function sub() external pure returns (uint256) {
        return InternalLib.sub(2, 1);
    }
}
