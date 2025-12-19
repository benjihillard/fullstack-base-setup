import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to create mocks that are hoisted with vi.mock
const { mockClient, mockConnect } = vi.hoisted(() => ({
  mockClient: {
    query: vi.fn(),
    release: vi.fn(),
  },
  mockConnect: vi.fn(),
}));

// Mock pg before importing the module
vi.mock('pg', () => ({
  Pool: vi.fn(() => ({
    connect: mockConnect,
  })),
}));

// Import after mocking
import { testConnection } from './connect.js';

describe('testConnection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success when database connects', async () => {
    mockConnect.mockResolvedValue(mockClient);
    mockClient.query.mockResolvedValue({ rows: [] });

    const result = await testConnection();

    expect(result).toEqual({
      success: true,
      message: 'Database connection successful',
    });
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('returns failure when database connection throws', async () => {
    mockConnect.mockRejectedValue(new Error('Connection refused'));

    const result = await testConnection();

    expect(result).toEqual({
      success: false,
      message: 'Database connection failed: Connection refused',
    });
  });

  it('returns failure when query throws', async () => {
    mockConnect.mockResolvedValue(mockClient);
    mockClient.query.mockRejectedValue(new Error('Query timeout'));

    const result = await testConnection();

    expect(result).toEqual({
      success: false,
      message: 'Database connection failed: Query timeout',
    });
  });
});
