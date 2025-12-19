import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Application } from 'express';

// Mock the db connection before importing the router
vi.mock('../db/connect.js', () => ({
  testConnection: vi.fn(),
  default: {},
}));

// Import after mocking
import apiRoutes from './api.js';
import { testConnection } from '../db/connect.js';

describe('API Routes', () => {
  let app: Application;

  beforeEach(() => {
    app = express();
    app.use('/api', apiRoutes);
    vi.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('returns 200 with success message when database connects', async () => {
      vi.mocked(testConnection).mockResolvedValue({
        success: true,
        message: 'Database connection successful',
      });

      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Database connection successful',
      });
    });

    it('returns 500 with error message when database fails', async () => {
      vi.mocked(testConnection).mockResolvedValue({
        success: false,
        message: 'Database connection failed: Connection refused',
      });

      const res = await request(app).get('/api/health');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        success: false,
        message: 'Database connection failed: Connection refused',
      });
    });
  });
});

