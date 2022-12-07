import "./App.css";
import Exchange from "./components/Exchange";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Sidebar from "./components/Sidebar";
import {useSelector} from "react-redux"

function App() {
  const {mode} = useSelector((state)=>state.darkMode)
  return (
    <>
      <Header />
      <div style={{background:mode? "#121212":"white", color:mode? "white":"#121212" ,height:"fit-screen"}} id="App" className="flex overflow-hidden">
        <div id="main" className="col-span-3 ">
          <Navbar />
          <Graph />
          <div id="container" className="flex w-full pt-2 pr-2">
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
