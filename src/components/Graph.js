import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../APIs/api";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { CoinList } from "../APIs/api";
import { Multiselect } from "multiselect-react-dropdown";

export function Spinner() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}

const Graph = () => {
  const [id, setId] = useState("bitcoin");
  const [chart, setChart] = useState();
  const [days, setDays] = useState(1);
  const fetchChart = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setChart(data);
  };

  const [currency, setCurrency] = useState("USD");
  const handleChange = (e) => {
    setCurrency(e.target.value);
  };
  const [chartType, setChartType] = useState("Line");
  const handleChart = (e) => {
    setChartType(e.target.value);
  };

  const data = [
    { value: "Bitcoin", label: "bitcoin", id: 1 },
    { value: "Etherium", label: "etherium", id: 2 },
    { value: "Dogecoin", label: "dogecoin", id: 3 },
  ];
  const [options] = useState(data);
  useEffect(() => {
    fetchChart();
  }, [id, days]);
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
  return (
    <div className="px-8 w-full" id="main-graph">
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
          placeholder="Select Cryptocurrency"
          options={options}
          displayValue="value"
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
        <>
          {chartType === "Line" ? (
            <Line
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
                maintainAspectRatio: true,
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
                indexAxis: "y",
                maintainAspectRatio: true,
                responsive: true,
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
              }}
            />
          ) : (
            <Bar
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
                maintainAspectRatio: true,
                responsive: true,
                elements: {
                  bar: {
                    borderWidth: 4,
                  },
                },
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Graph;
