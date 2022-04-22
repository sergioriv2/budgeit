import { useState } from "react";

const useLocalStorage = (key, initialValue = "") => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = (value) => {
    try {
      setStoredValue(null);
      window.localStorage.removeItem(value);
    } catch (e) {
      console.log(e);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
