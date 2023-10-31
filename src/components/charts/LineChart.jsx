import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ props }) => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    setChartData(props.chartData);
    setChartOptions(props.chartOptions);
  }, []);

  return (
    <ReactApexChart
      // options={props.chartData}
      // series={props.chartOptions}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
