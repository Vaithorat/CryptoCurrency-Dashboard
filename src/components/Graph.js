import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../APIs/api";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import Select from "react-select";
import { CoinList } from "../APIs/api";

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
  const [days, setDays] = useState(30);
  const fetchChart = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setChart(data);
  };
const [currency, setCurrency] = useState("USD");
const handleChange = (e) => {
  setCurrency(e.target.value);}
  
  const options = [{ value: "Bitcoin", label: "bitcoin" },
  {value: "Etherium", label: "etherium"}];
  
  useEffect(() => {
    fetchChart();
  }, [id, days]);
  // console.log("chart", chart);
  return (
    <div className="px-8 w-fit" id="main-graph">
      <div className=" justify-center gap-24 flex w-full items-center ">
        <button
          value={1}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Day
        </button>
        <button
          value={7}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Week
        </button>
        <button
          value={30}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Month
        </button>
        <button
          value={6}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          6 Months
        </button>
        <button
          value={365}
          className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1"
        >
          1 Year
        </button>
        <button className="flex items-center hover:shadow-xl hover:border-b-2 hover:border-blue-700 rounded-lg  text-black w-fit p-1">
          <BsFillCalendarWeekFill />
        </button>
        <Select options={options} />
        <div className="flex items-center ml-8">
          <label htmlFor="currency" className="sr-only">
            Chart Type
          </label>
          <select
            id="currency"
            name="currency"
            onChange={handleChange}
            value={currency}
            className="bg-white w-fit h-10  text-sm font-semibold rounded-md"
          >
            <option value="line">Line Chart</option>
            <option value="bar-hor">Bar Chart Horizontal</option>
            <option value="bar-ver">Bar Chart Vetical</option>
          </select>
        </div>
      </div>
      {!chart ? (
        <Spinner />
      ) : (
        <>
          <Line
            datasetIdKey="id"
            data={{
              labels: chart.prices?.map((chartMap) => {
                let date = new Date(chartMap[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  id: 1,
                  borderColor: "red",
                  label: `Price of Past ${days} Days in USD`,
                  data: chart.prices.map((chartMap) => {
                    return chartMap[1];
                  }),
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
            
        </>
      )}
    </div>
  );
};

export default Graph;
