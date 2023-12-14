import { Grid } from "@mui/material";
import React from "react";
import AreaChart from "../../components/Charts/AreaChart";
import ColumnChart from "../../components/Charts/ColumnChart";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-center">Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <p>Area chart</p>
          <AreaChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Column chart</p>
          <ColumnChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Pie chart</p>
          <PieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Line chart</p>
          <LineChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
