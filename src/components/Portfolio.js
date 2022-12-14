import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
  labels: ["Bitcoin", "Ethereum", "Tether"],
  datasets: [
    {
      label: "PortFolio",
      data: [(335968787768), (145133911784), (69864480321)],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  maintainAspectRatio:false,
  plugins: {
    legend: {
      display: true,
      position: "right",
    },
  },
};
const Portfolio = () => {
  return (
    <div className="w-full h-24 border-2 rounded-lg p-2 flex-shrink max-w-xl" id="top">
      <div className="flex justify-start mx-2 ">
        <div id="portfolio">Portfolio</div>
        <div className="transform transition-transform flex-shrink hover:scale-105 pt-11 h-2">
          <Pie data={data} options={options} />
        </div>
        <div>Total Value <strong>$1000</strong></div>
      </div>
    </div>
  );
};

export default Portfolio;
