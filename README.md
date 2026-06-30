<div align="center">
  <img src="docs/assets/logo.svg" alt="AetherAgents" width="300">
  <p><strong>Autonomous AI Agent Framework for Prediction Markets & Decentralized Trading</strong></p>
  <p>Multi-agent coordination · On-chain settlement · MCP integration · Real-time market making</p>

  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Solidity](https://img.shields.io/badge/Solidity-0.8.26-363636?logo=solidity&logoColor=white)](https://soliditylang.org/)
  [![Go](https://img.shields.io/badge/Go-1.22%2B-00ADD8?logo=go&logoColor=white)](https://go.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![CI](https://github.com/Crynge/AetherAgents/actions/workflows/ci.yml/badge.svg)](https://github.com/Crynge/AetherAgents/actions/workflows/ci.yml)
  [![GitHub Stars](https://img.shields.io/github/stars/Crynge/AetherAgents?style=social)](https://github.com/Crynge/AetherAgents)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Agent Framework](#agent-framework)
- [Smart Contracts](#smart-contracts)
- [MCP Integration](#mcp-integration)
- [Web Dashboard](#web-dashboard)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**AetherAgents** is a comprehensive framework for building, deploying, and managing autonomous AI agents that operate in decentralized prediction markets and trading environments. It combines multi-agent coordination, on-chain smart contracts, real-time market data processing, and the Model Context Protocol (MCP) for agent-to-agent communication.

Built for developers building the next generation of decentralized autonomous trading systems.

---

## Architecture

```mermaid
graph TB
    subgraph "Agent Layer"
        A1[Market Agent] --> O[Orchestrator]
        A2[Risk Agent] --> O
        A3[Execution Agent] --> O
        A4[Analysis Agent] --> O
    end

    subgraph "Communication"
        O --> MCP[MCP Server]
        MCP --> M1[Agent A]
        MCP --> M2[Agent B]
    end

    subgraph "On-Chain"
        O --> SC[Smart Contracts]
        SC --> PM[PredictionMarket]
        SC --> CL[CollateralManager]
        SC --> RS[ResolutionService]
    end

    subgraph "Data Layer"
        O --> DL[Data Lake]
        DL --> FD[Market Feeds]
        DL --> OD[On-Chain Data]
        DL --> HF[Historical Data]
    end

    subgraph "Web Dashboard"
        O --> WB[API Server]
        WB --> UI[React Dashboard]
    end
```

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/Crynge/AetherAgents.git
cd AetherAgents

# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start development environment
npm run dev

# Deploy contracts (local network)
npm run contracts:deploy -- --network localhost

# Start agent runtime
npm run agents:start

# Open dashboard
open http://localhost:3000
```

---

## Installation

```bash
# npm
npm install @aetheragents/core

# Go
go get github.com/Crynge/AetherAgents/go-client

# Docker
docker pull crynge/aether-agents:latest
```

---

## Agent Framework

### Creating an Agent

```typescript
import { Agent, MarketStrategy } from '@aetheragents/core';

const agent = new Agent({
  name: 'ArbitrageBot-1',
  strategy: MarketStrategy.ARBITRAGE,
  config: {
    minProfitPercent: 0.5,
    maxExposure: 10000,
    markets: ['football-premier-league', 'crypto-btc-usd'],
  },
});

agent.on('opportunity', async (opportunity) => {
  console.log(`Found opportunity: ${opportunity.type}`);
  await agent.execute(opportunity);
});

await agent.start();
```

### Agent Types

| Type | Description | Strategy |
|------|-------------|----------|
| `MarketMaker` | Provides liquidity | `LIQUIDITY_PROVISION` |
| `ArbitrageBot` | Cross-market arbitrage | `ARBITRAGE` |
| `RiskManager` | Portfolio hedging | `RISK_MANAGEMENT` |
| `SentimentAnalyst` | Sentiment-based trading | `SENTIMENT` |
| `ExecutionAgent` | Order execution optimization | `EXECUTION` |

---

## Smart Contracts

```solidity
// contracts/PredictionMarket.sol
pragma solidity ^0.8.26;

contract PredictionMarket {
    struct Market {
        string question;
        uint256 closeTime;
        uint256 resolveTime;
        bool resolved;
        uint256 yesShares;
        uint256 noShares;
    }

    mapping(uint256 => Market) public markets;
    uint256 public marketCount;

    event MarketCreated(uint256 indexed id, string question);
    event PositionTaken(uint256 indexed market, address trader, bool outcome, uint256 amount);

    function createMarket(string calldata question, uint256 closeTime) external {
        markets[marketCount] = Market({
            question: question,
            closeTime: closeTime,
            resolveTime: 0,
            resolved: false,
            yesShares: 0,
            noShares: 0
        });
        emit MarketCreated(marketCount, question);
        marketCount++;
    }

    function takePosition(uint256 marketId, bool outcome) external payable {
        Market storage market = markets[marketId];
        require(block.timestamp < market.closeTime, "Market closed");
        require(msg.value > 0, "Must send value");

        if (outcome) {
            market.yesShares += msg.value;
        } else {
            market.noShares += msg.value;
        }

        emit PositionTaken(marketId, msg.sender, outcome, msg.value);
    }
}
```

Deployed contracts are verified on Etherscan/OKLink.

---

## MCP Integration

AetherAgents implements the Model Context Protocol for agent-to-agent communication:

```typescript
import { MCPServer } from '@aetheragents/mcp';

const server = new MCPServer({
  tools: [
    {
      name: 'create_market',
      description: 'Create a new prediction market',
      parameters: {
        question: { type: 'string', required: true },
        closeTime: { type: 'number', required: true },
      },
    },
    {
      name: 'analyze_sentiment',
      description: 'Analyze market sentiment',
      parameters: {
        marketId: { type: 'string', required: true },
      },
    },
  ],
});

server.start(8080);
```

---

## Web Dashboard

The AetherAgents Dashboard provides:
- Real-time market data and price feeds
- Agent performance metrics and P&L tracking
- Smart contract interaction UI
- Agent configuration management
- Alerting and notifications

---

## Configuration

```yaml
# config/default.yaml
agents:
  maxAgents: 10
  heartbeatIntervalMs: 5000
  defaultGas: 200000

markets:
  supported: ["crypto", "sports", "politics"]
  refreshIntervalMs: 1000

contracts:
  predictionMarket: "0x..."
  collateralManager: "0x..."
  resolutionService: "0x..."

networks:
  localhost:
    chainId: 31337
    rpc: http://localhost:8545
  xlayer:
    chainId: 196
    rpc: https://xlayer.rpc.url
```

---

## API Reference

```bash
GET  /api/v1/agents           # List all agents
POST /api/v1/agents           # Create an agent
GET  /api/v1/agents/:id       # Get agent details
POST /api/v1/agents/:id/start # Start an agent
POST /api/v1/agents/:id/stop  # Stop an agent
GET  /api/v1/markets          # List markets
POST /api/v1/markets          # Create a market
GET  /api/v1/analytics        # Get performance analytics
```

---

## Testing

```bash
# TypeScript tests
npm test

# Solidity tests (Foundry)
npm run contracts:test

# Go tests
cd go-client && go test ./...

# E2E tests
npm run test:e2e
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT License — see [LICENSE](LICENSE).

---

<div align="center">
  <p>Built for the decentralized AI agent ecosystem</p>
  <p>
    <a href="https://github.com/Crynge/AetherAgents/issues">Report Bug</a> ·
    <a href="https://github.com/Crynge/AetherAgents/discussions">Discussions</a>
  </p>
</div>
