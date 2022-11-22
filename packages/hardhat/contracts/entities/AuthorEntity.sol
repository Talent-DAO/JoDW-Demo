pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ArticleEntity.sol";

contract AuthorEntity is ArticleEntity {
    using Counters for Counters.Counter;

    Counters.Counter public _authorIds;

    struct Author {
        address authorAddress;
        string[] lensNames;
        uint256 id;
        string arweaveProfileHash;
        Article[] articles;
    }

    mapping(address => Author) public authors;
    mapping(uint256 => Author) public idToAuthor;

    constructor() {}

    /// @dev add a new author on-chain
    /// @param authorAddress the address of the author
    function addAuthor(
        address authorAddress,
        string memory arweaveProfileHash,
        string[] memory lensNames
    )
        public
        returns (uint256)
    {
        _authorIds.increment();
        uint256 id = _authorIds.current();
        Author storage newAuthor = authors[authorAddress];
        newAuthor.id = id;
        newAuthor.arweaveProfileHash = arweaveProfileHash;
        newAuthor.lensNames = lensNames;

        return id;
    }

    /// @dev edit an author on-chain
    /// @param authorAddress the address of the author
    function updateAuthorAddress(address authorAddress)
        public
    {
        Author storage updatedAuthor = authors[authorAddress];
        // now edit...
        updatedAuthor.authorAddress = authorAddress;
    }

    /// @dev edit an author on-chain
    /// @param arweaveProfileHash profile hash for the author
    function updateAuthorProfileHash(string memory arweaveProfileHash)
        public
    {
        Author storage updatedAuthor = authors[msg.sender];
        // now edit...
        updatedAuthor.arweaveProfileHash = arweaveProfileHash;
    }

    function getAuthor(address authorAddress)
        public
        view
        returns(address, uint256, string memory)
    {
        return (authors[authorAddress].authorAddress, authors[authorAddress].id, authors[authorAddress].arweaveProfileHash);
    }
}