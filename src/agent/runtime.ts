// Agent runtime — starts and manages multiple agents

import { Agent, MarketStrategy } from './core';

const agents: Agent[] = [];

function createDefaultAgents(): Agent[] {
  return [
    new Agent({ name: 'MarketMaker-1', strategy: MarketStrategy.LIQUIDITY_PROVISION, maxExposure: 50000 }),
    new Agent({ name: 'ArbitrageBot-1', strategy: MarketStrategy.ARBITRAGE, minProfitPercent: 0.3 }),
    new Agent({ name: 'RiskManager-1', strategy: MarketStrategy.RISK_MANAGEMENT, maxExposure: 100000 }),
    new Agent({ name: 'SentimentBot-1', strategy: MarketStrategy.SENTIMENT }),
  ];
}

async function main() {
  const defaultAgents = createDefaultAgents();
  agents.push(...defaultAgents);

  for (const agent of agents) {
    await agent.start();
  }

  console.log(`\nAetherAgents Runtime: ${agents.length} agents active`);
  console.log('Press Ctrl+C to stop');

  process.on('SIGINT', async () => {
    for (const agent of agents) {
      await agent.stop();
    }
    process.exit(0);
  });
}

main().catch(console.error);
