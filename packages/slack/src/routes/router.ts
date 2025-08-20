import { App } from '@slack/bolt';

import { messageRoutes } from './message.routes';

export const slackEventRouter = (app: App) => {
  messageRoutes(app);
};
