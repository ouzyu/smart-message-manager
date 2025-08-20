import type { UsersProfileGetResponse } from '@slack/web-api';

export type UserProfile = NonNullable<UsersProfileGetResponse['profile']>;
