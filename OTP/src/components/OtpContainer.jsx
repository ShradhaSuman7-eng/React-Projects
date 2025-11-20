import React, { useRef, useState } from "react";

const OtpContainer = () => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRef = useRef([]);

  const handleChanges = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, length)
      .split("");

    const newOtp = [...otp];

    paste.forEach((char, i) => {
      if (/^[0-9]$/.test(char)) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);

    const lastIndex = Math.min(paste.length - 1, length - 1);
    inputRef.current[lastIndex].focus();
  };

  return (
    <div className="flex justify-center items-center mt-12 gap-4  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChanges(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="border w-12 h-12 text-center text-xl rounded 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      ))}
    </div>
  );
};

export default OtpContainer;
