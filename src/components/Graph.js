import React, { useEffect, useState } from "react";
// import { CryptoState } from "../APIs/CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../APIs/api";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ClipLoader from "react-spinners/ClipLoader";

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
    setChart(data.prices);
  };
  useEffect(() => {
    fetchChart();
  }, [id, days]);
  console.log("chart", chart);
  return (
    <>
      {!chart ? (
        <Spinner />
      ) : (
        <>
          <Line
            datasetIdKey="id"
            data={{
              labels: chart?.map((chartMap) => {
                let date = new Date(chartMap[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes} AM`;
                return date.toLocaleDateString();
              }),
            }}
          />
        </>
      )}
    </>
  );
};

export default Graph;
