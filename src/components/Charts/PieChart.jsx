import React from "react";
import ReactApexChart from "react-apexcharts";

const data = {
  series: [44, 55, 13, 43],
  options: {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Data 1", "Data 2", "Data 3", "Data 4"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};

const PieChart = () => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="pie"
      width="100%"
    />
  );
};

export default PieChart;
