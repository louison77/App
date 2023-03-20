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

  const Cout0 = [1,0,0,0]
  const Cout1 = Cout0 + [0,1,0,0]
  const Cout2 = Cout1 + [0,0,1,0]



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
        label: 'P0',
        data: RollCost[0],
        backgroundColor: 'rgb(0, 0, 150)',
      },
      {
        label: '-> P1',
        data: RollCost[1],
        backgroundColor: 'rgb(0, 0, 150)',
      },
      {
        label: '-> P2',
        data: RollCost[2],
        backgroundColor: 'rgb(0, 0, 150)',
      },
      {
        label: '-> P3',
        data: RollCost[3],
        backgroundColor: 'rgb(0, 0, 150)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}