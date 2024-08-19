// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract XottleNFT is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;

    // Mappings to track which badges a user has received
    mapping(address => bool) public has10BottlesBadge;
    mapping(address => bool) public has50BottlesBadge;
    mapping(address => bool) public has100BottlesBadge;

    constructor() ERC721("XottleNFT", "XOFT") {}

    // General mint function
    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Function to mint the 10 Bottles Badge
    function mint10BottlesBadge(string memory uri) public {
        require(!has10BottlesBadge[msg.sender], "User already has the 10 Bottles Badge");
        safeMint(msg.sender, uri);
        has10BottlesBadge[msg.sender] = true;
    }

    // Function to mint the 50 Bottles Badge
    function mint50BottlesBadge(string memory uri) public {
        require(!has50BottlesBadge[msg.sender], "User already has the 50 Bottles Badge");
        safeMint(msg.sender, uri);
        has50BottlesBadge[msg.sender] = true;
    }

    // Function to mint the 100 Bottles Badge
    function mint100BottlesBadge(string memory uri) public {
        require(!has100BottlesBadge[msg.sender], "User already has the 100 Bottles Badge");
        safeMint(msg.sender, uri);
        has100BottlesBadge[msg.sender] = true;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
