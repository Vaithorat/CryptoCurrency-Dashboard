import "./App.css";
import Exchange from "./components/Exchange";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header/>
    <div id="App" className="flex overflow-hidden">
      <div id="main" className = "col-span-3 ">
        <Navbar />
        <Graph/>
        <div id="container" className="flex w-full pr-2">
          <Portfolio />
          <Exchange />
        </div>
      </div>
      <div className="flex flex-col w-full h-75">
        <Sidebar />
      </div>
    </div>
    </>
  );
}

export default App;
