import { useState, useEffect } from "react";

const LoadingComponent: React.FC = () => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);
    return () => clearInterval(loadingInterval);
  });

  return <p className="loading-indicator">Загрузка{dots}</p>;
};

export default LoadingComponent;
