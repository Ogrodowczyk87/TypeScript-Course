import { useState } from 'react';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface QuotesResponse {
  total: number;
  quotes: {
    id: number;
    quote: string;
    author: string;
  }[];
}

export async function getQuotes(page: number, limit: number): Promise<QuotesResponse> {
  const response = await axios.get<QuotesResponse>('/quotes', {
    params: { page, limit },
  });
  return response.data;
}

export function QuoteGallery() {
  const [page, setPage] = useState(0);
  const limit = 5;

  // Use React Query to fetch quotes
  const { data, isLoading, isError } = useQuery<QuotesResponse>({
    queryKey: ['quotes', page],
    queryFn: () => getQuotes(page, limit),
    staleTime: 5000, // Cache data for 5 seconds to allow smooth transitions
  });

  if (isLoading) {
    return <div className="text-gray-200">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="text-red-500">Failed to load quotes.</div>;
  }

  const totalPages = Math.ceil((data.total || 0) / limit);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-200">Quote Gallery</h1>
      <div className="flex flex-col gap-4" data-testid="quote-gallery">
        {data.quotes.map((quote) => (
          <div
            key={quote.id}
            className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors shadow-lg"
          >
            <div className="flex gap-3 items-start">
              <QuoteIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg italic text-gray-200">"{quote.quote}"</p>
                <p className="text-sm text-gray-400 mt-2">- {quote.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          data-testid="previous-page-button"
          disabled={page === 0}
          className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg disabled:bg-gray-900 disabled:text-gray-600 hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="py-2 text-gray-300">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          data-testid="next-page-button"
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg disabled:bg-gray-900 disabled:text-gray-600 hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
