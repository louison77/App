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

export const options = {
  indexAxis: 'y',
  plugins: {
    title: {
      display: false,
      text: 'ProgressBar Chart',
    },
    LinearScale:{grid:{display:false}},
    //Legend: {display: false}
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
    //grid:{display:true}
  },
  //Legend: {display: false}
};

const labels = ["Sécurité des RH","Gestion des actifs","Sécurité physique","Gestion des droits d’accès","Conformité"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:  [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgb(11, 163, 11)',
    },
    {
      label: 'Dataset 2',
      data: [50, 50, 60, 71, 26, 35, 10],
      backgroundColor: 'rgb(255, 210, 31)',
    },
  ],
};

export default function App() {
  return <Bar options={options} data={data} />;
}