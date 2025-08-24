import { Router } from 'express';

import { teamController } from '@/controllers';

export const teamRoutes = Router();

teamRoutes.delete('/:id', teamController.remove);
