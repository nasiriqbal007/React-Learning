import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "random_secret_key";

const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const decrypt = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getCacheKey = (url: string) => `cache_${url}`;

const safeGet = (key: string): string | null => {
  try {
    const val = localStorage.getItem(key);
    if (!val) return null;

    const decrypted = decrypt(val);
    return decrypted || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const safeSet = (key: string, value: string): void => {
  try {
    const encrypted = encrypt(value);
    localStorage.setItem(key, encrypted);
  } catch (err) {
    console.log(err);
  }
};

const useFetch = <T,>(url: string) => {
  const cacheKey = getCacheKey(url);

  const [data, setData] = useState<T | null>(() => {
    const cached = safeGet(cacheKey);
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState<boolean>(() => !safeGet(cacheKey));

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (safeGet(cacheKey)) return;

    fetch(url)
      .then((r) => {
        if (!r.ok) return;
        return r.json();
      })
      .then((json: T) => {
        safeSet(cacheKey, JSON.stringify(json));
        setData(json);
      })
      .catch((err) => {
        console.log(err);
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setLoading(false));
  }, [url, cacheKey]);

  return {
    data,
    loading,
    error,
    setData,
    setCacheData: (newData: T) => {
      safeSet(cacheKey, JSON.stringify(newData));
      setData(newData);
    },
  };
};

export default useFetch;
