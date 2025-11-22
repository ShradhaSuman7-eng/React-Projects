import "./App.css";
import TraficContainer from "./components/TraficContainer";

function App() {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <div className="flex justify-center items-center shadow-md w-full h-20">
        <h2 className="text-3xl font-extrabold">Traffic Lights</h2>
      </div>
      <TraficContainer />
    </div>
  );
}

export default App;
