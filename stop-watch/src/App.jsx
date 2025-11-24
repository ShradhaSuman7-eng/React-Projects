import "./App.css";
import Container from "./components/Container";

function App() {
  return (
    <div className="flex flex-col justify-center  ">
      <div className="flex justify-center items-center shadow-md w-full h-20">
        <h2 className="text-3xl font-extrabold">Traffic Lights</h2>
      </div>
      <Container />
    </div>
  );
}

export default App;
