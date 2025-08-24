import { Router } from 'express';

import { userSettingController } from '@/controllers';

export const userSettingRoutes = Router();

userSettingRoutes.get('/', userSettingController.getCurrentUserSetting);
userSettingRoutes.put('/:id', userSettingController.update);
