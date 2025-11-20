import "./App.css";

import OtpContainer from "./components/OtpContainer";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="h-16 shadow-md w-full flex justify-center items-center">
          <h2 className="text-4xl font-semibold">OTP</h2>
        </div>
        <OtpContainer />
      </div>
    </>
  );
}

export default App;
