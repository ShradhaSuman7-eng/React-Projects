import React, { useEffect, useState } from "react";

const TraficData = {
  red: {
    next: "green",
    totalTime: 5000,
  },
  green: {
    next: "yellow",
    totalTime: 3000,
  },
  yellow: {
    next: "red",
    totalTime: 2000,
  },
};

const TraficContainer = () => {
  const [currentColor, setCurrentColor] = useState("red");
  const [timeLeft, setTimeLeft] = useState(TraficData["red"].totalTime / 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextColor = TraficData[currentColor].next;
          setCurrentColor(nextColor);
          return TraficData[nextColor].totalTime / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentColor]);

  return (
    <div className="flex flex-col gap-4 h-screen justify-center items-center">
      <div className="bg-black p-6 flex flex-col gap-4 rounded-2xl">
        <div
          className={`border w-20 h-20 rounded-full ${
            currentColor === "red" ? "bg-red-600" : "bg-gray-400"
          }`}
        ></div>

        <div
          className={`border w-20 h-20 rounded-full ${
            currentColor === "yellow" ? "bg-yellow-400" : "bg-gray-400"
          }`}
        ></div>

        <div
          className={`border w-20 h-20 rounded-full ${
            currentColor === "green" ? "bg-green-700" : "bg-gray-400"
          }`}
        ></div>
      </div>

      <p className="text-xl font-bold">{timeLeft}s</p>
    </div>
  );
};

export default TraficContainer;
