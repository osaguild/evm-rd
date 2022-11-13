// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdminPausable is Pausable, Ownable {
    uint256 public count;

    constructor() {
        transferOwnership(msg.sender);
    }

    function addCount() external whenNotPaused {
        count += 1;
    }

    function getCount() external view returns (uint256) {
        return count;
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }
}
