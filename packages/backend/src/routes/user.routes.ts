import { Router } from 'express';

import { userController } from '@/controllers';

export const userRoutes = Router();

userRoutes.get('/', userController.getBySlackTeamId);
userRoutes.post('/', userController.createWithSettings);
userRoutes.put('/', userController.setAdminStatus);
