import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ categories }) => {
  const data = {
    labels: categories.map((category) => category.category),
    datasets: [
      {
        data: categories.map((category) => category.count),
        backgroundColor: categories.map(
          (category, index) => "rgba(75, 192, 192, 0.2)"
        ),
        borderColor: categories.map(
          (category, index) => "rgba(75, 192, 192, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";

          return ` ${percentage}`;
        },
        color: "#000",
      },
    },
  };

  return (
    <div className="absolute top-0 left-0 w-48 h-48">
      {" "}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
