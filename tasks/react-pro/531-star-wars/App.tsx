import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Starships from './Starships';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Star Wars Starships</h1>
        <Starships />
      </div>
    </QueryClientProvider>
  );
};

export default App;
