// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract PredictionMarket {
    struct Market {
        string question;
        uint256 closeTime;
        uint256 resolveTime;
        bool resolved;
        uint256 yesShares;
        uint256 noShares;
        bool outcome; // true = yes, false = no
    }

    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => mapping(bool => uint256))) public positions;
    uint256 public marketCount;

    event MarketCreated(uint256 indexed id, string question, uint256 closeTime);
    event PositionTaken(uint256 indexed market, address indexed trader, bool outcome, uint256 amount);
    event MarketResolved(uint256 indexed market, bool outcome);

    function createMarket(string calldata question, uint256 closeTime) external returns (uint256) {
        require(closeTime > block.timestamp, "Close time must be in future");
        uint256 id = marketCount++;
        markets[id] = Market(question, closeTime, 0, false, 0, 0, false);
        emit MarketCreated(id, question, closeTime);
        return id;
    }

    function takePosition(uint256 marketId, bool outcome) external payable {
        Market storage market = markets[marketId];
        require(block.timestamp < market.closeTime, "Market closed");
        require(msg.value > 0, "Must send value");
        positions[marketId][msg.sender][outcome] += msg.value;
        if (outcome) market.yesShares += msg.value;
        else market.noShares += msg.value;
        emit PositionTaken(marketId, msg.sender, outcome, msg.value);
    }

    function resolveMarket(uint256 marketId, bool outcome) external {
        Market storage market = markets[marketId];
        require(block.timestamp > market.closeTime, "Market not closed");
        require(!market.resolved, "Already resolved");
        market.resolved = true;
        market.outcome = outcome;
        market.resolveTime = block.timestamp;
        emit MarketResolved(marketId, outcome);
    }
}
