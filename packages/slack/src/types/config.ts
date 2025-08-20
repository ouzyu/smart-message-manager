import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

export interface SlackAppInstance {
  app: App;
  client: WebClient;
  start: (port?: number) => Promise<void>;
}

export interface SlackConfig {
  signingSecret: string;
  clientId: string;
  clientSecret: string;
  stateSecret?: string;
  scopes?: string[];
  environment: 'development' | 'production';
}
