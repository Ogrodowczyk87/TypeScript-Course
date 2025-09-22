import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStarships } from './api/starships';
import { Starship } from './types/starships';

const Starships: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['starships', currentPage],
    queryFn: () => getStarships(currentPage),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading starships</div>;
  }

  const starships = data?.results || [];

  return (
    <div>
      <div className="grid gap-4">
        {starships.map((starship: Starship, index: number) => (
          <div key={`${starship.name}-${index}`} className="p-4 border rounded">
            <h3>{starship.name}</h3>
            <p>Model: {starship.model}</p>
            <p>Class: {starship.starship_class}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          data-testid="prev-button"
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={!data?.next}
          data-testid="next-button"
          className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Starships;
