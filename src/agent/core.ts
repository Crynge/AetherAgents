// Agent Framework — Core types and runtime

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error';

export enum MarketStrategy {
  LIQUIDITY_PROVISION = 'liquidity',
  ARBITRAGE = 'arbitrage',
  RISK_MANAGEMENT = 'risk',
  SENTIMENT = 'sentiment',
  EXECUTION = 'execution',
}

export interface AgentConfig {
  name: string;
  strategy: MarketStrategy;
  minProfitPercent?: number;
  maxExposure?: number;
  markets?: string[];
}

export interface AgentEvent {
  type: string;
  timestamp: Date;
  data: Record<string, unknown>;
}

export class Agent {
  public name: string;
  public strategy: MarketStrategy;
  public status: AgentStatus = 'idle';

  private config: AgentConfig;
  private handlers: Map<string, (event: AgentEvent) => Promise<void>> = new Map();

  constructor(config: AgentConfig) {
    this.name = config.name;
    this.strategy = config.strategy;
    this.config = config;
  }

  on(event: string, handler: (event: AgentEvent) => Promise<void>): void {
    this.handlers.set(event, handler);
  }

  async start(): Promise<void> {
    this.status = 'running';
    console.log(`[${this.name}] Agent started (strategy: ${this.strategy})`);
  }

  async stop(): Promise<void> {
    this.status = 'idle';
    console.log(`[${this.name}] Agent stopped`);
  }

  async execute(opportunity: { type: string; value: number }): Promise<boolean> {
    const handler = this.handlers.get('opportunity');
    if (handler) {
      await handler({ type: opportunity.type, timestamp: new Date(), data: opportunity });
      return true;
    }
    return false;
  }

  getConfig(): AgentConfig {
    return { ...this.config };
  }
}
