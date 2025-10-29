// src/hooks/useApi.js
import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

export const useApi = ({ url, options = {} }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = apiClient();

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!url) throw new Error("API URL is undefined");

      const response = await client.get(url, options);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchData };
};
