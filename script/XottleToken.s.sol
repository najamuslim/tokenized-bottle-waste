// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "lib/forge-std/src/Script.sol";
import {XottleToken} from "../src/XottleToken.sol";

contract XottleTokenScript is Script {
    XottleToken public xottleToken;

    function setUp() public {
      vm.createSelectFork(vm.rpcUrl("lisk_testnet"));
    }

    function run() public {
      uint256 privateKey = vm.envUint("PRIVATE_KEY_DEPLOY");
      vm.startBroadcast(privateKey);
      xottleToken = new XottleToken(vm.envAddress("OWNER_WALLET_ADDRESS"));
      vm.stopBroadcast();
    }
}