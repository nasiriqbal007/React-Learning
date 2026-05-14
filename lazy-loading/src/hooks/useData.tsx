import axios from "axios";
import { BASE_URL } from "../api/Baseurl";
import { useState } from "react";

interface ApiError {
  message: string;
  code: number;
  isError: boolean;
}

function useData<T>() {
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setError({
        message:
          error.response?.data?.message || error.message || "Request failed",
        code: error.response?.status || 0,
        isError: true,
      });
    }
  };
  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}${url}`);

      setData(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, fetchData };
}

export default useData;
