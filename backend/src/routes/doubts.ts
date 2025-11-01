import { Router, Request, Response } from 'express';
import { doubtsService } from '../services/doubtsService';
import { Server } from 'socket.io';

export const createDoubtsRouter = (io: Server) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const doubts = await doubtsService.getAllDoubts();
      res.json(doubts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch doubts' });
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      const { title, description, subject, createdBy } = req.body;
      if (!title || !description || !subject || !createdBy) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const doubt = await doubtsService.createDoubt({ title, description, subject, createdBy });
      io.emit('doubt:created', doubt);
      res.status(201).json(doubt);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create doubt' });
    }
  });

  router.post('/:id/reply', async (req: Request, res: Response) => {
    try {
      const { message, repliedBy } = req.body;
      if (!message || !repliedBy) {
        return res.status(400).json({ error: 'Message and repliedBy are required' });
      }
      const doubt = await doubtsService.addReply(req.params.id, message, repliedBy);
      if (!doubt) return res.status(404).json({ error: 'Doubt not found' });
      io.emit('doubt:replied', doubt);
      res.json(doubt);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.patch('/:id/resolve', async (req: Request, res: Response) => {
    try {
      const doubt = await doubtsService.resolveDoubt(req.params.id);
      if (!doubt) return res.status(404).json({ error: 'Doubt not found' });
      io.emit('doubt:resolved', doubt);
      res.json(doubt);
    } catch (error) {
      res.status(500).json({ error: 'Failed to resolve doubt' });
    }
  });

  return router;
};
