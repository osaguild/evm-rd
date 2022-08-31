// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

contract Payable1 {
    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
