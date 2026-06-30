import { describe, it, expect } from 'vitest';
import { Agent, MarketStrategy } from '../src/agent/core';

describe('Agent', () => {
  it('should create agent with correct config', () => {
    const agent = new Agent({ name: 'TestBot', strategy: MarketStrategy.ARBITRAGE });
    expect(agent.name).toBe('TestBot');
    expect(agent.strategy).toBe(MarketStrategy.ARBITRAGE);
  });

  it('should start and stop', async () => {
    const agent = new Agent({ name: 'TestBot', strategy: MarketStrategy.LIQUIDITY_PROVISION });
    await agent.start();
    expect(agent.status).toBe('running');
    await agent.stop();
    expect(agent.status).toBe('idle');
  });

  it('should handle events', async () => {
    const agent = new Agent({ name: 'EventBot', strategy: MarketStrategy.SENTIMENT });
    let handled = false;
    agent.on('opportunity', async () => { handled = true; });
    await agent.execute({ type: 'test', value: 100 });
    expect(handled).toBe(true);
  });
});
