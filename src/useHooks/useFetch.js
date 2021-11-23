import { useEffect, useState } from "react";

const useFetch = (url, config = { method: "GET" }, dep = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchFunction = async () => {
      setIsLoading(true);
      setServerError(false);

      try {
        const response = await fetch(url, config);
        const { status, error } = response;
        if (status === 404 || error) throw response;
        const json = await response.json();

        setData(json);
      } catch (error) {
        setServerError(true);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFunction();
  }, dep);

  return { data, isLoading, serverError };
};

export default useFetch;
