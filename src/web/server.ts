// Web dashboard API server

import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/v1/agents', (_req, res) => {
  res.json({
    agents: [
      { id: '1', name: 'MarketMaker-1', strategy: 'liquidity', status: 'running', pnl: 12450 },
      { id: '2', name: 'ArbitrageBot-1', strategy: 'arbitrage', status: 'running', pnl: 8900 },
      { id: '3', name: 'RiskManager-1', strategy: 'risk', status: 'running', pnl: -1200 },
      { id: '4', name: 'SentimentBot-1', strategy: 'sentiment', status: 'idle', pnl: 3400 },
    ],
  });
});

app.get('/api/v1/markets', (_req, res) => {
  res.json({
    markets: [
      { id: '1', question: 'Will BTC reach $150k by Dec 2026?', volume: 2500000, yesPrice: 0.65, noPrice: 0.35 },
      { id: '2', question: 'Will Team A win the World Cup?', volume: 1800000, yesPrice: 0.42, noPrice: 0.58 },
    ],
  });
});

app.get('/api/v1/analytics', (_req, res) => {
  res.json({
    totalVolume: 4300000,
    activeAgents: 3,
    totalTrades: 1247,
    avgResponseTime: 342,
    pnl: { total: 23550, daily: 1240, weekly: 8900 },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AetherAgents Dashboard API on http://localhost:${PORT}`);
});
