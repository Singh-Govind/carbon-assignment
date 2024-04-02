import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BarChart = ({ data }) => {
  const years = data.map((item) => item.Year);
  const populations = data.map((item) => item.Population);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Population",
        backgroundColor: "rgba(230, 205, 47, 0.2)",
        borderColor: "#beeb56",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: populations,
      },
    ],
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          type: "category",
          categoryPercentage: 0.5,
          barPercentage: 0.9,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
