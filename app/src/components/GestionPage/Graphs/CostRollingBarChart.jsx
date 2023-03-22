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

  const Cout = [0, 0, 0, 0]
  const Coutrun = [0, 0, 0, 0]
  array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

  //DEBUG
  //const Cout = [2, 6, 8, 3]
  //const Coutrun = [1, 3, 1, 10]


  const CoutP0 = [Cout[0], Cout[0], Cout[0], Cout[0]]
  const CoutP1 = [0, Cout[1], Cout[1], Cout[1]]
  const CoutP2 = [0, 0, Cout[2], Cout[2]]
  const CoutP3 = [0, 0, 0, Cout[3]]

  const CoutrunP0 = [Coutrun[0], Coutrun[0], Coutrun[0], Coutrun[0]]
  const CoutrunP1 = [0, Coutrun[1], Coutrun[1], Coutrun[1]]
  const CoutrunP2 = [0, 0, Coutrun[2], Coutrun[2]]
  const CoutrunP3 = [0, 0, 0, Coutrun[3]]


  const labels = ['P0', '+P1', '+P2', '+P3'];

  //tooltip config

  /*function tooltipFilter(tooltipItem, data) {
    return tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 4;
  }*/
  
  /*const footer = (tooltipItems) => {
    let sum = 0;
  
    tooltipItems.forEach(function(tooltipItem) {
      sum += tooltipItem.parsed.y;
    });
    return 'Total: ' + sum;
  };*/

  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
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
      legend: { display: false },
      title: { display: true, text: 'Coûts cumulés des mesures' },
      tooltip: { 
        enabled: true,
        //filter: tooltipFilter,
        //callbacks: {
        //  footer: footer,
        //},
      },
    },
    //interaction: {
    //  intersect: true,
    //  mode: 'index',
    //},
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Build Cost P0',
        data: CoutP0,
        backgroundColor: '#E12729',
        stack: 1
      },
      { label: 'Build Cost P1',
        data: CoutP1,
        backgroundColor: '#F37324',
        stack: 1
      },
      { label: 'Build Cost P2',
        data: CoutP2,
        backgroundColor: '#F8CC1B',
        stack: 1
      },
      { label: 'Build Cost P3',
        data: CoutP3,
        backgroundColor: '#72B043',
        stack: 1
      },
      { label: 'Run Cost P0',
        data: CoutrunP0,
        backgroundColor: '#E12729',
        stack: 2
      },
      { label: 'Run Cost P1',
        data: CoutrunP1, 
        backgroundColor: '#F37324',
        stack: 2
      },
      { label: 'Run Cost P2',
        data: CoutrunP2,
        backgroundColor: '#F8CC1B',
        stack: 2
      },
      { label: 'Run Cost P3',
        data: CoutrunP3,
        backgroundColor: '#72B043',
         stack: 2
      },
      ],
    };

    return <Bar options={options} data={data}/>;
  }