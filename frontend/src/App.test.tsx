import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import App from './App';

vi.mock('axios');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the heading', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React \+ Node\.js \+ PostgreSQL/i)).toBeInTheDocument();
  });

  it('renders the check backend button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /check backend connection/i })).toBeInTheDocument();
  });

  it('shows success message when backend responds', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { message: 'Database connection successful' },
    });

    render(<App />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/Database connection successful/)).toBeInTheDocument();
    });
  });

  it('shows error message when backend fails', async () => {
    vi.mocked(axios.get).mockRejectedValue({
      response: { data: { message: 'Connection refused' } },
    });

    render(<App />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to backend/)).toBeInTheDocument();
    });
  });

  it('disables button while loading', async () => {
    vi.mocked(axios.get).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { message: 'OK' } }), 100)),
    );

    render(<App />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(screen.getByText(/Checking\.\.\./)).toBeInTheDocument();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
