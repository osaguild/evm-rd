// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AdminAccessControl is AccessControl {
    uint256 public devCount;
    uint256 public manageCount;
    bytes32 private constant DEVELOPER_ROLE = keccak256(bytes("DEVELOPER_ROLE"));
    bytes32 private constant MANAGER_ROLE = keccak256(bytes("MANAGER_ROLE"));

    function beDeveloper() external {
        _setupRole(DEVELOPER_ROLE, msg.sender);
    }

    function beManager() external {
        _setupRole(MANAGER_ROLE, msg.sender);
    }

    function dev() external onlyRole(DEVELOPER_ROLE) {
        devCount += 1;
    }

    function manage() external onlyRole(MANAGER_ROLE) {
        manageCount += 1;
    }

    function getDevCount() external view returns (uint256) {
        return devCount;
    }

    function getManageCount() external view returns (uint256) {
        return manageCount;
    }
}
