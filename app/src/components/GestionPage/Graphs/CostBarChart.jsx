import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CostBarChart(props) {
  const array = props.array
  const Cout = [0, 0, 0, 0]
  const Coutrun = [0, 0, 0, 0]
  array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

  const labels = ['P0', 'P1', 'P2', 'P3'];

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
        data: Cout,
        backgroundColor: 'rgb(0, 0, 150)',
      },
      {
        label: 'Run Cost',
        data: Coutrun,
        backgroundColor: 'rgb(0, 150, 0)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
