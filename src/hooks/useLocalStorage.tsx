import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch (e) {
      console.error("Ошибка загрузки из localStorage:", e);
      return defaultValue;
    }
  });

  // Функция обновления состояния
  const update = (newValue: T | ((prev: T) => T)) => {
    setState((prev) =>
      typeof newValue === "function"
        ? (newValue as (prev: T) => T)(prev)
        : newValue
    );
  };

  // Автоматически сохраняем в localStorage при изменении state
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Ошибка сохранения в localStorage:", error);
    }
  }, [key, state]); // Теперь useEffect следит за `state`

  return { state, update };
};

export default useLocalStorage;
