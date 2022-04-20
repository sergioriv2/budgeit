import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFunction()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setData([]);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [fetchFunction]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchFunction()
      .then((res) => {
        setData(res);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [fetchFunction]);

  return { data, loading, error, refetch };
};
export default useFetch;
