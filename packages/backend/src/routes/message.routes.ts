import { Router } from 'express';

import { messageController } from '@/controllers';

export const messageRoutes = Router();

messageRoutes.get('/daily', messageController.getDailyMessage);
messageRoutes.put('/:id', messageController.setNotified);
