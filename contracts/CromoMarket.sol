// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CromoMarket {
    IERC20 public yoppenToken;
    address public owner;

    struct Cromo {
        uint id;
        string name;
        uint price;
        address owner;
    }

    mapping(uint => Cromo) public cromos;
    uint public nextCromoId;

    event CromoPurchased(uint cromoId, address buyer);

    constructor(address _yoppenTokenAddress) {
        yoppenToken = IERC20(_yoppenTokenAddress);
        owner = msg.sender;
    }

    function createCromo(string memory _name, uint _price) external {
        require(msg.sender == owner, "Only owner can create cromos");
        cromos[nextCromoId] = Cromo(nextCromoId, _name, _price, address(0));
        nextCromoId++;
    }

    function buyCromo(uint _cromoId) external {
        Cromo storage cromo = cromos[_cromoId];
        require(cromo.price > 0, "Cromo does not exist");
        require(cromo.owner == address(0), "Cromo already sold");
        require(yoppenToken.transferFrom(msg.sender, owner, cromo.price), "Token transfer failed");

        cromo.owner = msg.sender;
        emit CromoPurchased(_cromoId, msg.sender);
    }

    function getCromo(uint _cromoId) external view returns (Cromo memory) {
        return cromos[_cromoId];
    }
}
