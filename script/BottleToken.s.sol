// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "lib/forge-std/src/Script.sol";
import {XottleToken} from "../src/XottleToken.sol";

contract XottleTokenScript is Script {
    XottleToken public xottleToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        xottleToken = new XottleToken(msg.sender);

        vm.stopBroadcast();
    }
}