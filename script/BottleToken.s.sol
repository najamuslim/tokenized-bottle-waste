// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BottleToken} from "../src/BottleToken.sol";

contract BottleTokenScript is Script {
    BottleToken public bottleToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        bottleToken = new BottleToken();

        vm.stopBroadcast();
    }
}