import { Router } from 'express';

import { userRoutes } from '@/routes/user.routes';

export const router = Router();

router.use('/users', userRoutes);
