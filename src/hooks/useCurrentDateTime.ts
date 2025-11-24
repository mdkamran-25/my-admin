// Custom hook for current date and time

import { useState, useEffect } from "react";

interface CurrentDateTime {
  currentDate: string;
  currentTime: string;
}

export const useCurrentDateTime = (): CurrentDateTime => {
  const [dateTime, setDateTime] = useState<CurrentDateTime>(() => {
    const now = new Date();
    return {
      currentDate: now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      currentTime: now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setDateTime({
        currentDate: now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        currentTime: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return dateTime;
};
