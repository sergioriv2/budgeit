import { useCallback } from "react";

import useFetch from "./useFetch";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";

const useFetchGetData = (apiEndpoint) => {
  const [token] = useLocalStorage("token");

  const fetchData = useCallback(() => {
    return new Promise((resolve, reject) => {
      axios({
        url: apiEndpoint,
        method: "GET",
        headers: {
          "x-api-key": token,
        },
      })
        .then(async (res) => {
          const { data } = res;
          if (data.ok) return resolve(data.result);

          return reject(data);
        })
        .catch((err) => {
          console.log(err.response.data);
          return reject(err.response.data);
        });
    });
  }, [token, apiEndpoint]);

  const { data, loading, error, refetch } = useFetch(fetchData);

  return { data, loading, error, refetch };
};

export default useFetchGetData;
