// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {BottleToken} from "../src/BottleToken.sol"; // Import the BottleToken contract

contract BottleTokenScript is Script {
    BottleToken public bottleToken; // Declare a BottleToken variable

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        bottleToken = new BottleToken(); // Instantiate the BottleToken contract

        vm.stopBroadcast();
    }
}