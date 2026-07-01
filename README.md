[![CI](https://github.com/Crynge/AetherAgents/actions/workflows/ci.yml/badge.svg)](https://github.com/Crynge/AetherAgents/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://typescriptlang.org)
[![Solidity](https://img.shields.io/badge/Solidity-0.8-363636)](https://soliditylang.org)

# AetherAgents

**Autonomous AI agents for prediction markets and decentralized trading.**

AetherAgents combines LLM-powered agent reasoning with on-chain smart contracts to participate in prediction markets, execute trades, and manage portfolios autonomously.

```
          ╭──────────────────────────╮
          │      Agent Swarm         │
          │  ┌────┐ ┌────┐ ┌────┐   │
          │  │A1  │ │A2  │ │A3  │   │
          │  └──┬─┘ └──┬─┘ └──┬─┘   │
          ╰─────┼──────┼──────┼─────╯
                │      │      │
          ┌─────┴──────┴──────┴─────┐
          │    MCP Protocol Bus     │
          └─────┬──────┬──────┬─────┘
                │      │      │
     ╭──────────┴──╮ ╭──┴──────────╮
     │  On-Chain   │ │   Web API  │
     │  Contracts  │ │   Gateway  │
     ╰─────────────╯ ╰─────────────╯
```

## Features

- **Autonomous agents** — Goal-oriented agents that plan, reason, and execute trades
- **MCP integration** — Model Context Protocol for standardized tool calling
- **Smart contracts** — Solidity prediction market with on-chain settlement
- **Portfolio management** — Risk-aware position sizing and rebalancing
- **Market analysis** — Real-time sentiment scoring and volatility estimation

## Usage

```bash
npm install @crynge/aether-agents

# Start agent swarm
npx aether-agents start --config agents.yaml

# Deploy prediction market contract
npx aether-agents deploy --market election-2026
```

```typescript
import { AgentSwarm } from '@crynge/aether-agents/agent';

const swarm = new AgentSwarm({
  agents: [
    { role: 'analyst', model: 'gpt-4', tools: ['market-data'] },
    { role: 'trader', model: 'gpt-4', tools: ['execute-trade'] },
    { role: 'risk-manager', model: 'claude-3', tools: ['risk-check'] },
  ],
});

await swarm.start({
  market: 'Will candidate X win the 2026 election?',
  capital: 10000,
});
```

## Smart Contract

```solidity
// PredictionMarket.sol
contract PredictionMarket {
    struct Outcome {
        string description;
        uint256 yesShares;
        uint256 noShares;
        uint256 expiry;
    }

    function trade(address market, uint256 amount, bool side) external {
        // Automated agent trading logic
    }

    function settle(uint256 marketId, bool outcome) external {
        // On-chain settlement and payout
    }
}
```

## Modules

```
src/
├── agent/
│   ├── core.ts         # Agent runtime and planning loop
│   └── runtime.ts      # Tool execution and memory management
├── mcp/
│   └── server.ts       # Model Context Protocol server
├── web/
│   └── server.ts       # REST API and web dashboard
└── contracts/
    └── PredictionMarket.sol  # On-chain prediction market
```
