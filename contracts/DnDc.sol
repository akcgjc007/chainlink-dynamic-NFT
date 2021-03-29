// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./RandomNumberConsumer.sol";

contract DnDc is ERC721, RandomNumberConsumer {
    string public tokenURI;
    struct Character {
        uint256 strength;
        uint256 speed;
        uint256 stamina;
        string name;
    }

    Character[] public characters;

    mapping(bytes32 => string) requestToCharacterName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => address) requestToTokenId;

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyHash,
        uint256 _fee,
        string memory _tokenURI
    )
        public
        RandomNumberConsumer(_LinkToken, _keyHash, _VRFCoordinator, _fee)
        ERC721("Dungeons and dragons character", "DnDc")
    {
        tokenURI = _tokenURI;
    }

    function requestNewRandomCharacter(
        uint256 userProvidedSeed,
        string memory name
    ) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToCharacterName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        // Define the creation of the NFT
        uint256 newId = characters.length;
        uint256 strength = randomNumber % 100;
        uint256 speed = (randomNumber % 10000) / 100;
        uint256 stamina = (randomNumber % 1000000) / 10000;

        characters.push(
            Character(
                strength,
                speed,
                stamina,
                requestToCharacterName[requestId]
            )
        );

        _safeMint(requestToSender[requestId], newId);
        _setTokenURI(newId, tokenURI);
    }
}
