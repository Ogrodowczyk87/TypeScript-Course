import { useEffect, useState } from 'react';

const CACHE_TTL = 10 * 1000; // 10 seconds
const cache = new Map<number, any>();
const expirations = new Map<number, ReturnType<typeof setTimeout>>();

async function fetchQuotes(skip: number) {
  const url = `https://dummyjson.com/quotes?limit=5&skip=${skip}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

function QuoteGallery() {
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (cache.has(skip)) {
        setData(cache.get(skip));
        return;
      }
      setLoading(true);
      try {
        const result = await fetchQuotes(skip);
        if (!mounted) return;
        setData(result);
        cache.set(skip, result);
        // schedule expiration
        if (expirations.has(skip)) clearTimeout(expirations.get(skip)!);
        const t = setTimeout(() => {
          cache.delete(skip);
          expirations.delete(skip);
        }, CACHE_TTL);
        expirations.set(skip, t);
      } catch (e) {
        if (!mounted) return;
        setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [skip]);

  return (
    <div data-testid="quote-gallery">
      <h1>Quote Gallery</h1>
      <div className="controls">
        <button
          data-testid="previous-page-button"
          onClick={() => setSkip((s) => Math.max(0, s - 5))}
          disabled={skip === 0}
        >
          Previous
        </button>

        <button
          data-testid="next-page-button"
          onClick={() => setSkip((s) => s + 5)}
        >
          Next
        </button>
      </div>
      <div>
        {loading && <div>Loading...</div>}
        {data && (
          <ul>
            {Array.isArray(data?.quotes)
              ? data.quotes.map((q: any) => (
                <li key={q.id}>{q.quote}</li>
              ))
              : null}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <QuoteGallery />;
}
