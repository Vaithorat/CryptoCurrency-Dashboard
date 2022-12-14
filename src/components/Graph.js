import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../APIs/api";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { CoinList } from "../APIs/api";
import { Multiselect } from "multiselect-react-dropdown";
import { CryptoState } from "../APIs/CryptoContext";
import { useSelector } from "react-redux";
//show spinner when content is not loaded
export function Spinner() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}

const Graph = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const { currency } = CryptoState();
  //list of currencies the graph is available for
  const options = [
    { value: `Bitcoin`, label: `bitcoin`, id: 1 },
    { value: "Ethereum", label: "ethereum", id: 2 },
    { value: "XRP", label: "ripple", id: 3 },
    { value: "Solana", label: "solana", id: 4 },
    { value: "BNB", label: "binancecoin", id: 5 },
    { value: "Dogecoin", label: "dogecoin", id: 6 },
    { value: "Cardano", label: "cardano", id: 7 },
    { value: "Chainlink", label: "chainlink", id: 8 },
    { value: "Polkadot", label: "polkadot", id: 9 },
    { value: "Avalanche", label: "avalanche-2", id: 10 },
    { value: "Monero", label: "monero", id: 11 },
    { value: "Tron", label: "tron", id: 12 },
    { value: "Litecoin", label: "litecoin", id: 13 },
    { value: "Algorand", label: "algorand", id: 14 },
    { value: "Cosmos Hub", label: "cosmos", id: 15 },
  ];
  function onSelect(selectedList, selectedItem) {
    // return (selectedItem.id);
    setId(options[selectedItem.id].label);
  }
  const [id, setId] = useState(options[0].label);
  //show show
  const [chart, setChart] = useState();
  //select days as 1 by default
  const [days, setDays] = useState(1);
  //fetch chart from coingecko api
  const fetchChart = async () => {
    const { data } = await axios.get(
      HistoricalChart(id, days, currency, interval)
    );
    setChart(data);
  };
  const [interval, setInterval] = useState([]);
  useEffect(() => {
    fetchChart();
    // eslint-disable-next-line
  }, [id, days, currency, interval]);
  //fetch coinlist from coingecko api
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get(CoinList()).then((response) => {
      setPost(response.data);
    });
  }, []);
  //take id of the coins
  const handleId = (e) => {
    setId(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  //select line chart as default
  const [chartType, setChartType] = useState("Line");
  const handleChart = (e) => {
    setChartType(e.target.value);
  };
  // console.log("chart", chartType);
  const styles = {
    multiselectContainer: {
      width: "14vw",
      borderRadius: "20px",
      background: mode ? "#121212" : "white",
      color: mode ? " white" : "#121212",
    },
    optionContainer: {
      background: mode ? "#121212" : "white",
      color: mode ? "white" : "#121212",
    },
    selectedOptionContainer: {
      background: mode ? "#121212" : "white",
      color: mode ? "white" : "#121212",
    },   
    chips:{
      fontSize: "16px",
      fontWeight:"bold",
    },
    searchBox: { border: "none" },
  };
  //For functionality of buttons to change days
  function oneDay() {
    setInterval((prevInterval) => "hourly");
    setDays((prevDays) => 1);
  }
  function oneWeek() {
    setDays((prevDays) => 7);
    setInterval((prevInterval) => "daily");
  }
  function oneMonth() {
    setDays((prevDays) => 30);
    setInterval((prevInterval) => "daily");
  }
  function sixMonths() {
    setDays((prevDays) => 180);
    setInterval((prevInterval) => "monthly");
  }
  function oneYear() {
    setDays((prevDays) => 365);
    setInterval((prevInterval) => "yearly");
  }
  return (
    <div
      className="px-8 xs:w-full sm:w-full md:w-full lg:w-fit lg:gap-2"
      id="main-graph"
    >
      <div className="xl:justify-evenly md:justify-around justify-start  gap-6 flex w-full items-center xs:text-xs sm:text-xs md:text-sm text-md ">
        <button
          value={1}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          onClick={oneDay}
          style={{ color: mode ? "white" : "black" }}
        >
          1 Day
        </button>
        <button
          value={7}
          onClick={oneWeek}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          style={{ color: mode ? "white" : "black" }}
        >
          1 Week
        </button>
        <button
          value={30}
          onClick={oneMonth}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          style={{ color: mode ? "white" : "black" }}
        >
          1 Month
        </button>
        <button
          value={6}
          onClick={sixMonths}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          style={{ color: mode ? "white" : "black" }}
        >
          6 Months
        </button>
        <button
          value={365}
          onClick={oneYear}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          style={{ color: mode ? "white" : "black" }}
        >
          1 Year
        </button>
        <button
          style={{ color: mode ? "white" : "black" }}
          className="flex items-center hover:shadow-xl hover:border-b-2 transform transition-transform hover:scale-110 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          <BsFillCalendarWeekFill />
        </button>
        {/* Implement multiselect imported from library */}
        <Multiselect
          className="rounded-lg hover:shadow-xl "
          closeOnSelect={true}
          onSelect={onSelect}
          singleSelect={true}
          placeholder="Select Cryptocurrency"
          options={options}
          displayValue="value"
          avoidHighlightFirstOption={false}
          value={options.filter((obj) => id.includes(obj.value))}
          onChange={handleId}
          style={styles}
        />

        <div className="flex items-center md:w-full ml-8 ">
          <label htmlFor="chartType" className="sr-only ">
            Chart Type
          </label>
          <select
            id="chartType"
            name="chartType"
            onChange={handleChart}
            value={chartType}
            style={{
              color: mode ? "white" : "#121212",
              background: mode ? "#121212" : "white",
            }}
            className="bg-white w-42 md:w-30 sm:w-24 h-10 xs:text-xs sm:text-sm md:text-sm  font-semibold rounded-md transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <option value="Line">Line Chart</option>
            <option value="Bar">Bar Chart Horizontal</option>
            <option value="BarVer">Bar Chart Vertical</option>
          </select>
        </div>
      </div>
      {!chart ? (
        <Spinner />
      ) : (
        <div className="relative w-full h-full">
          {chartType === "Line" ? (
            <Line
              height={500}
              datasetIdKey="id"
              data={{
                labels: chart.prices?.map((chartMap) => {
                  let date = new Date(chartMap[0]);
                  let time = `${date.getHours()}:00`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    spanGaps: true,
                    id: 1,
                    borderColor: "red",
                    backgroundColor: "red",
                    label: `Price during Past ${days} ${
                      days !== 1 ? "Days" : "Day"
                    } in ${currency}`,
                    data: chart.prices.map((chartMap) => {
                      return chartMap[options[0].id];
                    }),
                  },
                ],
              }}
              options={{
                spanGaps: true,
                scales: {
                  y: {
                    ticks: {
                      source: "auto",
                      autoSkip: false,
                    },
                  },
                  x: {
                    ticks: {
                      source: "auto",
                      autoSkip: false,
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  point: {
                    radius: 0,
                  },
                },
              }}
            />
          ) : chartType === "Bar" ? (
            <Bar
              height={500}
              datasetIdKey="id"
              data={{
                labels: chart.prices?.map((chartMap) => {
                  let date = new Date(chartMap[0]);

                  let time = `${date.getHours()}:00`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    id: 1,
                    borderColor: "red",
                    backgroundColor: "red",
                    label: `Price during Past ${days} ${
                      days !== 1 ? "Days" : "Day"
                    } in USD`,
                    data: chart.prices.map((chartMap) => {
                      return chartMap[options[0].id];
                    }),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    ticks: {
                      source: "auto",
                      autoSkip: true,
                      maxRotation: 0,
                    },
                  },
                },
                indexAxis: "y",
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  bar: {
                    barThickness: 50,
                  },
                },
              }}
            />
          ) : chartType === "BarVer" ? (
            <Bar
              height={500}
              datasetIdKey="id"
              data={{
                labels: chart.prices?.map((chartMap) => {
                  let date = new Date(chartMap[0]);
                  let time = `${date.getHours()}:00`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    id: 1,
                    borderColor: "red",
                    backgroundColor: "red",
                    label: `Price during Past ${days} ${
                      days !== 1 ? "Days" : "Day"
                    } in USD`,
                    data: chart.prices.map((chartMap) => {
                      return chartMap[options[0].id];
                    }),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    ticks: {
                      source: "auto",
                      autoSkip: true,
                      maxRotation: 0,
                    },
                  },
                },
                indexAxis: "x",
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  bar: {
                    barThickness: 50,
                  },
                },
              }}
            />
          ) : (
            // else show nothing
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default Graph;
