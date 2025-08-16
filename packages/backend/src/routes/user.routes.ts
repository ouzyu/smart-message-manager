import { Router } from 'express';

import { userController } from '@/controllers';

export const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/:id', userController.get);
