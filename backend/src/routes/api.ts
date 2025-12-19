import express, { Request, Response, Router } from 'express';
import { testConnection } from '../db/connect.js';

const router: Router = express.Router();

router.get('/health', async (_req: Request, res: Response) => {
  const result = await testConnection();
  res.status(result.success ? 200 : 500).json(result);
});

export default router;

