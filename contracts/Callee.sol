// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "hardhat/console.sol";

contract Callee {
    uint256 public x;
    uint256 public y;
    address public sender;

    string private _name;
    string private _greeting;
    string private _message;

    function add(uint256 _x, uint256 _y) public returns (uint256, uint256) {
        x = _x + 1;
        y = _y + 1;
        sender = msg.sender;
        return (x, y);
    }

    function get()
        public
        view
        returns (
            uint256,
            uint256,
            address
        )
    {
        return (x, y, sender);
    }

    function initialize() external returns (string memory) {
        _name = "ExternalContract";
        return _name;
    }

    function sayHello(string memory greeting) external returns (string memory) {
        _greeting = greeting;
        return _greeting;
    }

    function seyGreeting(string memory greeting, string memory message) external returns (string memory) {
        _greeting = greeting;
        _message = message;
        return _message;
    }

    function getName() external view returns (string memory) {
        return _name;
    }

    function getGreeting() external view returns (string memory) {
        return _greeting;
    }

    function getMessage() external view returns (string memory) {
        return _message;
    }
}
