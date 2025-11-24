import "./App.css";
import ColumnTable from "./components/ColumnTable";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center  ">
        <div className="flex justify-center items-center shadow-md w-full h-20">
          <h2 className="text-4xl font-bold">Column Table</h2>
        </div>
        <ColumnTable />
      </div>
    </>
  );
}

export default App;
