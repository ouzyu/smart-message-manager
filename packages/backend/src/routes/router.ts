import { Router } from 'express';

import { messageRoutes } from '@/routes/message.routes';
import { messageCategoryRoutes } from '@/routes/messageCategory.routes';
import { teamRoutes } from '@/routes/team.routes';
import { userRoutes } from '@/routes/user.routes';
import { userSettingRoutes } from '@/routes/userSetting.routes';

export const router = Router();

router.use('/users', userRoutes);
router.use('/user-settings', userSettingRoutes);
router.use('/teams', teamRoutes);
router.use('/messages', messageRoutes);
router.use('/message-categories', messageCategoryRoutes);
