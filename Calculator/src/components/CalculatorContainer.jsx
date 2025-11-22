import React, { useState } from "react";

const CalculatorContainer = () => {
  const [inputVal, setInputVal] = useState("");

  const calcData = [
    "Clear",
    "Del",
    "+-",
    "x²",
    1,
    2,
    3,
    "+",
    4,
    5,
    6,
    "÷",
    7,
    8,
    9,
    "−",
    0,
    "xʸ",
    "√",
    "*",
    ".",
    "=",
  ];

  const handleBtnClick = (data) => {
    if (data === "Clear") return setInputVal("");
    if (data === "Del") return setInputVal(inputVal.slice(0, -1));

    if (data === "+-")
      return setInputVal((prev) =>
        prev ? (prev[0] === "-" ? prev.slice(1) : "-" + prev) : ""
      );

    if (data === "x²") return setInputVal((prev) => String(eval(prev) ** 2));

    if (data === "=") {
      try {
        const expression = inputVal.replace("÷", "/").replace("−", "-");
        setInputVal(eval(expression).toString());
      } catch {
        setInputVal("Error");
      }
      return;
    }

    setInputVal(inputVal + data);
  };

  const isOperator = (btn) =>
    ["+", "÷", "−", "*", "x²", "√", "xʸ", "+-", "="].includes(btn);

  const isSpecial = (btn) => ["Clear", "Del"].includes(btn);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300">
      <div className="bg-gray-200 p-5 rounded-3xl shadow-2xl">
        {/* Display */}
        <input
          type="text"
          value={inputVal}
          className="w-full text-3xl px-4 py-3 rounded-lg text-white bg-black mb-4 text-right"
          readOnly
        />

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 text-lg font-semibold">
          {calcData.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleBtnClick(btn)}
              className={`px-3 py-3 rounded-xl transition-all
                ${
                  isSpecial(btn)
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : isOperator(btn)
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-[#416d78] text-white hover:bg-[#365962]"
                }
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorContainer;
