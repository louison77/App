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
const current_values = [50, 50, 60, 71, 26];
const goal_values = [65, 79, 80, 81, 56];

// Resulting values
const backdrop_values = [];
for (let i = 0; i < current_values.length; i++) {
  backdrop_values.push(100 - goal_values[i]);
}
const improvement_values = [];
for (let i = 0; i < current_values.length; i++) {
  improvement_values.push(goal_values[i] - current_values[i]);
}

// Chart Setup

const labels = ["Sécurité des RH","Gestion des actifs","Sécurité physique","Gestion des droits d’accès","Conformité"];

const options = {
  indexAxis: 'y',
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {display:false},
      display: false,
    },
    y: {
      stacked: true,
      grid: {display:false},
      border: {display: false},
      
    },
  },
  plugins: {
    legend: {display: false},
    tooltip: {enabled: false}
  }
};

const data = {
  labels,
  datasets: [
    {
      label: 'Niveau actuel',
      data:  current_values,
      backgroundColor: 'rgb(11, 163, 11)',
    },
    {
      label: 'Niveau souhaité',
      data: improvement_values,
      backgroundColor: 'rgb(255, 210, 31)',
    },
    {
      label: 'Dataset 0',
      data:  backdrop_values,
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
    },
  ],
};

export default function ProgressBar() {
  return <Bar options={options} data={data} />;
}