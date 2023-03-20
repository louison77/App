import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  //GridLineOptions,
  //scales,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function CostBarChart(props) {
  const array = props.array
  const Cout = array.map((item) => item.Cout)
  const Coutrun = array.map((item) => item.Coutrun)

  const CoutRolling = [{
    label: "P0",
    CoutP0: 2000,
    CoutP1: 0,
    CoutP2: 0,
    CoutP3: 0,
    CoutrunP0: 1000,
    CoutrunP1: 0,
    CoutrunP2: 0,
    CoutrunP3: 0,
  },
  {
    label: "P1",
    CoutP0: 2000,
    CoutP1: 3000,
    CoutP2: 0,
    CoutP3: 0,
    CoutrunP0: 1000,
    CoutrunP1: 2000,
    CoutrunP2: 0,
    CoutrunP3: 0,
  },
  {
    label: "P2",
    CoutP0: 2000,
    CoutP1: 3000,
    CoutP2: 4000,
    CoutP3: 0,
    CoutrunP0: 1000,
    CoutrunP1: 2000,
    CoutrunP2: 3000,
    CoutrunP3: 0,
  },
  {
    label: "P3",
    CoutP0: 2000,
    CoutP1: 3000,
    CoutP2: 4000,
    CoutP3: 5000,
    CoutrunP0: 1000,
    CoutrunP1: 2000,
    CoutrunP2: 3000,
    CoutrunP3: 4000,
  }]

  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: false,
        grid: { display: false },
        border: { display: false },
      },
      y: {
        stacked: false,
        grid: { display: true },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Build Cost',
        data: CoutRolling.Cout,
        backgroundColor: 'rgb(0, 0, 150)',

      },
      {
        label: 'Build Cost',
        data: CoutRolling.Cout,
        backgroundColor: 'rgb(0, 0, 150)',

      },
      {
        label: 'Build Cost',
        data: CoutRolling.Cout,
        backgroundColor: 'rgb(0, 0, 150)',

      }
    ]
  };

  return <Bar options={options} data={data} />;
}