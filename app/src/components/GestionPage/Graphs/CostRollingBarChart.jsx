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

export default function CostRollingBarChart(props) {
  const array = props.array

  //const Cout = [0, 0, 0, 0]
  //const Coutrun = [0, 0, 0, 0]
  //array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  //array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

  const Cout = [0, 0, 0, 0]
  const Coutrun = [0, 0, 0, 0]
  array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)


  const CoutP0 = [Cout[0], Cout[0], Cout[0], Cout[0]]
  const CoutP1 = [0, Cout[1], Cout[1], Cout[1]]
  const CoutP2 = [0, 0, Cout[2], Cout[2]]
  const CoutP3 = [0, 0, 0, Cout[3]]

  const CoutrunP0 = [Coutrun[0], Coutrun[0], Coutrun[0], Coutrun[0]]
  const CoutrunP1 = [0, Coutrun[1], Coutrun[1], Coutrun[1]]
  const CoutrunP2 = [0, 0, Coutrun[2], Coutrun[2]]
  const CoutrunP3 = [0, 0, 0, Coutrun[3]]


  const labels = ['P0', '+P1', '+P2', '+P3'];

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
        label: 'Build Cost P0',
        data: CoutP0,
        backgroundColor: 'rgb(0, 0, 150)',
      },
      { label: 'Build Cost P0->P1',
        data: CoutP1,
        backgroundColor: 'rgb(0, 0, 150)',
      },
      { label: 'Build Cost P0->P2',
        data: CoutP2,
        backgroundColor: 'rgb(0, 0, 150)',
      },
      { label: 'Build Cost P0->P3',
        data: CoutP3,
        backgroundColor: 'rgb(0, 0, 150)',
      },
      { label: 'Run Cost P0',
        data: CoutrunP0,
        backgroundColor: 'rgb(0, 150, 0)',
      },
      { label: 'Run Cost P0->P1',
        data: CoutrunP1, 
        backgroundColor: 'rgb(0, 150, 0)',
      },
      { label: 'Run Cost P0->P2',
        data: CoutrunP2,
        backgroundColor: 'rgb(0, 150, 0)',
      },
      { label: 'Run Cost P0->P3',
        data: CoutrunP3,
        backgroundColor: 'rgb(0, 150, 0)',
      },
    ],
  };

  return <Bar options={options} data={data} width={300} height={200}  />;
}