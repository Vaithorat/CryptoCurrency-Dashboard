import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../APIs/api";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { CoinList } from "../APIs/api";
import { Multiselect } from "multiselect-react-dropdown";
import Navbar from "./Navbar";

export function Spinner() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}

const Graph = () => {
  const labelData = [
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
  const [options, setOptions] = useState(labelData);
  const handleOptions = (e) => {
    setOptions(e.target.value);
  };
  console.log("options", options[0].label);
  const [id, setId] = useState(options[0].label);
  const [chart, setChart] = useState();
  const [days, setDays] = useState(1);
  const [coinList, setCoinList] = useState([]);

  const fetchChart = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setChart(data);
  };
  // console.log("chart:" ,chart);
  useEffect(() => {
    fetchChart();
  }, [id, days]);
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get(CoinList()).then((response) => {
      setPost(response.data);
    });
  }, []);
  // console.log("post", [post][0][0]);

  // const [currency, setCurrency] = useState("USD");
  // const handleChange = (e) => {
  //   setCurrency(e.target.value);
  // };
  // console.log(currency);
  const [chartType, setChartType] = useState("Line");
  const handleChart = (e) => {
    setChartType(e.target.value);
  };
  // console.log("chart", chartType);

  const styles = {
    multiselectContainer: { width: "15vw", borderRadius: "20px" },
    inputField: { width: "14vw", borderRadius: "10px", border: "none" },
    searchBox: { border: "none" },
  };

  // useEffect(() => {}, []);
  // console.log("chart", chart);
  function oneDay() {
    setDays((prevDays) => 1);
  }
  function oneWeek() {
    setDays((prevDays) => 7);
  }
  function oneMonth() {
    setDays((prevDays) => 30);
  }
  function sixMonths() {
    setDays((prevDays) => 180);
  }
  function oneYear() {
    setDays((prevDays) => 365);
  }
  const decimation = {
    enabled: false,
    algorithm: "min-max",
  };
  return (
    <div className="px-8 w-full " id="main-graph">
      <div className=" justify-center gap-10 flex w-full items-center ">
        <button
          value={1}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
          onClick={oneDay}
        >
          1 Day
        </button>
        <button
          value={7}
          onClick={oneWeek}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Week
        </button>
        <button
          value={30}
          onClick={oneMonth}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Month
        </button>
        <button
          value={6}
          onClick={sixMonths}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          6 Months
        </button>
        <button
          value={365}
          onClick={oneYear}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Year
        </button>
        <button className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1">
          <BsFillCalendarWeekFill />
        </button>

        <Multiselect
          className="rounded-lg hover:shadow-xl"
          showCheckbox
          selectionLimit={2}
          placeholder="Select Cryptocurrency"
          options={options}
          displayValue="value"
          style={styles}
        />

        <div className="flex items-center ml-8">
          <label htmlFor="chartType" className="sr-only">
            Chart Type
          </label>
          <select
            id="chartType"
            name="chartType"
            onChange={handleChart}
            value={chartType}
            className="bg-white w-fit h-10  text-sm font-semibold rounded-md"
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
                  let time = `${date.getHours()}:${date.getMinutes()}`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    id: 1,
                    borderColor: "red",
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
                plugins: {
                  decimation: decimation,
                },
                scales: {
                  x: {
                    ticks: {
                      source:"auto",
                      autoSkip: true,
                      maxTicksLimit: 10,
                      maxRotation:0
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  point: {
                    radius: 1,
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
                  let time = `${date.getHours()}:${date.getMinutes()}`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    id: 1,
                    borderColor: "red",
                    label: `Price during Past ${days} ${
                      days !== 1 ? "Days" : "Day"
                    } in USD`,
                    data: chart.prices.map((chartMap) => {
                      return chartMap[1];
                    }),
                  },
                ],
              }}
              options={{
                plugins: {
                  decimation: decimation,
                },
                scales: {
                  y: {
                    ticks: {
                      source:"auto",
                      autoSkip: true,
                      maxTicksLimit: 10,
                      maxRotation:0
                    },
                  },
                },
                indexAxis: "y",
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  bar: {
                    borderWidth: 1,
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
                  let time = `${date.getHours()}:${date.getMinutes()}`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    id: 1,
                    borderColor: "red",
                    label: `Price during Past ${days} ${
                      days !== 1 ? "Days" : "Day"
                    } in USD`,
                    data: chart.prices.map((chartMap) => {
                      return chartMap[1];
                    }),
                  },
                ],
              }}
              options={{
                plugins: {
                  decimation: decimation,
                },
                scales: {
                  xAxis: {
                    ticks: {
                      source:"auto",
                      autoSkip: true,
                      maxTicksLimit: 10,
                      maxRotation:0
                    },
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
                elements: {
                  bar: {
                    borderWidth: 4,
                  },
                },
              }}
            />
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default Graph;
