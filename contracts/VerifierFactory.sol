// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

import {Verifier} from "./Verifier.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VerifierFactory {
    using Counters for Counters.Counter;
    Counters.Counter private _verifierId;
    mapping(uint256 => address) private _verifierAddress;

    function deployVerifier(Verifier.VerifyingKeyPoint memory vkp) external {
        _verifierId.increment();
        Verifier verifier = new Verifier(vkp);
        _verifierAddress[_verifierId.current()] = address(verifier);
    }

    function getVerifierAddress(uint256 id) external view returns (address) {
        return _verifierAddress[id];
    }
}
