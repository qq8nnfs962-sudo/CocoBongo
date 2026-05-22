import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export function useCsvData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse<T>(text, { header: true, skipEmptyLines: true });
        setData(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
