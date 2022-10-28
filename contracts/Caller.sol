// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import "hardhat/console.sol";

contract Caller {
    uint256 public x;
    uint256 public y;
    uint256 public v;
    uint256 public w;
    address public callee;
    address public sender;
    string private name;

    function setCallee(address _callee) public {
        callee = _callee;
    }

    function addCall(uint256 _x, uint256 _y) public {
        (bool success, bytes memory data) = callee.call(abi.encodeWithSignature("add(uint256,uint256)", _x, _y));
        require(success);
        (v, w) = bytesToUint256(data);
        sender = msg.sender;
    }

    function addDelegateCall(uint256 _x, uint256 _y) public {
        (bool success, bytes memory data) = callee.delegatecall(
            abi.encodeWithSignature("add(uint256,uint256)", _x, _y)
        );
        require(success);
        (v, w) = bytesToUint256(data);
        sender = msg.sender;
    }

    function bytesToUint256(bytes memory _b) internal pure returns (uint256, uint256) {
        uint256 res1;
        uint256 res2;
        assembly {
            res1 := mload(add(_b, 32))
            res2 := mload(add(_b, 64))
        }
        return (res1, res2);
    }

    function get()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (x, y, v, w, sender);
    }

    function initialize() external {
        (bool success, bytes memory data) = callee.call(abi.encodeWithSignature("initialize()"));
        emit Response(success, abi.decode(data, (string)));
    }

    function sayHello() external {
        (bool success, bytes memory data) = callee.call(abi.encodeWithSignature("sayHello(string)", "Hello"));
        emit Response(success, abi.decode(data, (string)));
    }

    function seyGreeting() external {
        (bool success, bytes memory data) = callee.call(
            abi.encodeWithSignature("seyGreeting(string,string)", "Good morning", "Have a nice day")
        );
        emit Response(success, abi.decode(data, (string)));
    }

    function getName() external view returns (string memory) {
        (bool success, bytes memory data) = callee.staticcall(abi.encodeWithSignature("getName()"));
        return abi.decode(data, (string));
    }

    event Response(bool success, string data);
}
