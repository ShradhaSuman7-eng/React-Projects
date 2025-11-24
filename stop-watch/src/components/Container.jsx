import React, { useState, useRef } from "react";

const Container = () => {
  const [mint, setMint] = useState(0);
  const [sec, setSec] = useState(0);
  const [milisec, setMiliSec] = useState(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setMiliSec((prev) => {
        if (prev + 1 === 1000) {
          setSec((prevSec) => {
            if (prevSec + 1 === 60) {
              setMint((prevMint) => prevMint + 1);
              return 0;
            }
            return prevSec + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMiliSec(0);
    setSec(0);
    setMint(0);
  };

  return (
    <div className="flex justify-center  mt-6">
      <div className="h-64 w-64 flex flex-col justify-center items-center border rounded-[50%]">
        <h1 className="text-3xl font-extrabold text-purple-800">Stopwatch</h1>
        <div className=" flex text-2xl text-red-800 text-4xl font-extrabold">
          <p>{mint.toString().padStart(2, "0")}</p>:
          <p>{sec.toString().padStart(2, "0")}</p>:
          <p> {milisec.toString().padStart(3, "0")}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            className=" p-2 border rounded-md bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 text-white font-semibold transition-transform duration-150 active:scale-95 active:shadow-lg"
          >
            START
          </button>

          <button
            onClick={handlePause}
            className=" p-2 border rounded-md bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 text-white font-semibold transition-transform duration-150 active:scale-95 active:shadow-lg"
          >
            PAUSE
          </button>

          <button
            onClick={handleReset}
            className=" p-2 border rounded-md bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 text-white font-semibold transition-transform duration-150 active:scale-95 active:shadow-lg"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;
