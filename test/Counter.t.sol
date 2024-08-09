// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Test} from "lib/forge-std/src/Test.sol";
import {XottleToken} from "../src/XottleToken.sol";

contract XottleTokenTest is Test {
    XottleToken public token;
    address public owner;

    function setUp() public {
        owner = address(this);
        token = new XottleToken(owner);
    }

    function testMint() public {
        uint256 amount = 1000;
        token.mint(address(this), amount);
        assertEq(token.balanceOf(address(this)), amount);
    }

    function testApprove() public {
        uint256 amount = 500;
        token.mint(address(this), 1000); // Mint tokens first
        token.approve(address(0xBEEF), amount);
        assertEq(token.allowance(address(this), address(0xBEEF)), amount);
    }
}