import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState(url);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchFunction = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": window.localStorage.getItem("token"),
          },
        });
        const data = await response?.data?.result;
        setData(data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunction();
  }, [endpoint]);

  const refetch = useCallback(() => {
    const fetchFunction = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": window.localStorage.getItem("token"),
          },
        });
        const data = await response?.data.result;
        setData(data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunction();
  }, [endpoint]);

  return { data, loading, error, refetch, setEndpoint };
};
export default useFetch;
