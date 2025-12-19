import {
  describe, it, expect,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('renders the navigation', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the home page by default', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Vite \+ React \+ Node\.js \+ PostgreSQL/i)).toBeInTheDocument();
  });

  it('renders the check backend button on home page', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('button', { name: /check backend connection/i })).toBeInTheDocument();
  });
});
