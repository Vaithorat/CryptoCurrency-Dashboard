// import { Chart } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import "./App.css";
import Exchange from "./components/Exchange";
import Graph from "./components/Graph";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div id="App" className="flex ">
      <div id="main" className = "col-span-3 ">
        <Navbar />
        <Graph/>
        <div id="container" className="flex w-full pr-2">
          <Portfolio />
          <Exchange />
        </div>
      </div>
        <Sidebar />
    </div>
  );
}

export default App;
