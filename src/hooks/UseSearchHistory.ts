import { useState, useEffect, useCallback } from 'react';

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;

    const newHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('search-history', JSON.stringify(newHistory));
  };

  const removeFromHistory = (query: string) => {
    const newHistory = searchHistory.filter((item) => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('search-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search-history');
  };

  const filterHistory = useCallback(
    (query: string) => {
      return searchHistory.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
    },
    [searchHistory],
  );

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    filterHistory,
  };
}
