import "./App.css";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <>
      <div className="flex justify-center items-center shadow-md h-20 w-full">
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>
      <TodoContainer />
    </>
  );
}

export default App;
