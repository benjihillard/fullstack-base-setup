import React from 'react';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Home from './Home';

vi.mock('axios');

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
  );
}

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the heading', () => {
    renderWithQuery(<Home />);
    expect(screen.getByText(/Vite \+ React \+ Node\.js \+ PostgreSQL/i)).toBeInTheDocument();
  });

  it('renders the check backend button', () => {
    renderWithQuery(<Home />);
    expect(screen.getByRole('button', { name: /check backend connection/i })).toBeInTheDocument();
  });

  it('shows success message when backend responds', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { success: true, message: 'Database connection successful' },
    });

    renderWithQuery(<Home />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/Database connection successful/)).toBeInTheDocument();
    });
  });

  it('shows error message when backend fails', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));

    renderWithQuery(<Home />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to backend/)).toBeInTheDocument();
    });
  });
});
