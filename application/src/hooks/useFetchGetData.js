import { useCallback, useState } from "react";
import useFetch from "./useFetch";
import axios from "axios";

const useFetchGetData = (apiEndpoint) => {
  const [endpoint, setEndpoint] = useState(apiEndpoint);

  const fetchData = useCallback(() => {
    return new Promise((resolve, reject) => {
      axios({
        url: endpoint,
        method: "GET",
        headers: {
          "x-api-key": window.localStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          const { data } = res;
          if (data.ok) return resolve(data.result);

          return reject(data);
        })
        .catch((err) => {
          console.log(err.response);
          return reject(err.response);
        });
    });
  }, [endpoint]);

  const { data, loading, error, refetch } = useFetch(fetchData);

  return { data, loading, error, refetch, setEndpoint };
};

export default useFetchGetData;
