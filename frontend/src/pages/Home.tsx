import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HealthResponse {
  success: boolean;
  message: string;
}

async function fetchHealth(): Promise<HealthResponse> {
  const response = await axios.get<HealthResponse>('/api/health');
  return response.data;
}

function Home() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    enabled: false, // Don't fetch automatically
  });

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Vite + React + Node.js + PostgreSQL</h1>

      <button
        onClick={() => refetch()}
        disabled={isLoading}
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
      >
        {isLoading ? 'Checking...' : 'Check Backend Connection'}
      </button>

      {data && (
        <p className={`mt-4 text-lg ${data.success ? 'text-green-600' : 'text-red-600'}`}>
          {data.message}
        </p>
      )}

      {isError && (
        <p className="mt-4 text-lg text-red-600">
          Failed to connect to backend
          {error instanceof Error ? `: ${error.message}` : ''}
        </p>
      )}
    </div>
  );
}

export default Home;
