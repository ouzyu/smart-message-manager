import type { WebClient } from '@slack/web-api';

import { UserProfile } from '../types';

/**
 * ユーザーサービス
 * WebClient（Bolt/Web-API共通）のみに依存
 */

export const getProfile = async (client: WebClient, userId: string): Promise<UserProfile | null> => {
  try {
    const response = await client.users.profile.get({ user: userId });

    if (!response.ok) {
      console.error(`Failed to get user profile: ${userId}`);
      return null;
    }

    return response.profile ?? null;
  } catch (error) {
    console.error(`Error getting user profile for ${userId}:`, error);
    return null;
  }
};
