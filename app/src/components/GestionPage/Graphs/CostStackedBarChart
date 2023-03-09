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

// Imported Values (must be converted to %)
const build_cost = [50, 50, 60, 26];
const run_cost = [65, 79, 80, 56];

// Chart Setup

const labels = ["P0","P1","P2","P3"];

const options = {
  indexAxis: 'x',
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {display:false},
      border: {display: false}
    },
    y: {
      stacked: false,
      grid: {display:true},
      border: {display: false},
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Coûts par Priorité'
    },
    legend: {display: true},
    tooltip: {enabled: true}, 
  }
};

const data = {
  labels,
  datasets: [
    {
      label: 'Build Cost',
      data:  build_cost,
      backgroundColor: 'rgb(0, 0, 150)',
    },
    {
      label: 'Run Cost',
      data: run_cost,
      backgroundColor: 'rgb(0, 150, 0)',
    },
  ],
};

export default function CostStackedBarChart() {
  return <Bar options={options} data={data} />;
}