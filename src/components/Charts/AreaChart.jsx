import React from "react";
import ReactApexChart from "react-apexcharts";

const data = {
  series: [
    {
      name: "Data 1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Data 2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
  },
};

const AreaChart = () => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="area"
      height={300}
    />
  );
};

export default AreaChart;
