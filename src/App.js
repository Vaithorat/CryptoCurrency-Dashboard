import "./App.css";
import Exchange from "./components/Exchange";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Sidebar from "./components/Sidebar";
import {useSelector} from "react-redux"

function App(props) {
  const {mode} = useSelector((state)=>state.darkMode)
  return (
    <>
      <Header />
      <div style={{background:mode? "#121212":"white", color:mode? "white":"#121212" ,height:"fit-screen"}} id="App" className="sm:flex-col md:flex-col lg:flex-col flex overflow-hidden">
        <div id="main" className="col-span-3 ">
          <Navbar />
          <Graph />
          <div id="container" className="flex lg:w-full xl:w-full pt-2 pr-2 h-75 pl-12 sm:pl-2 md:pl-4 lg:pl-6">
            <Portfolio />
            <Exchange />
          </div>
        </div>
        <div className="flex-col w-full h-75">
          <Sidebar data={props.filteredCoins} />
        </div>
      </div>
    </>
  );
}

export default App;
