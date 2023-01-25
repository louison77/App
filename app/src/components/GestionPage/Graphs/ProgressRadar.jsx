import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
);
  
export const data = {
    labels: ['ORG', 'PHY', 'TEC', 'MGM'],
    datasets: [
      //TODO: Properly set the scale and create variables associated with the graph categories.
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        data: [0, 0, 0, 0],
      },
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        data: [1, 1, 1, 1],
      },

      {
        label: 'Audit initial',
        data: [0.2, 0.7, 0.3, 0.6],
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: "Après plan d'action",
        data: [0.4, 0.8, 0.5, 0.6],
        backgroundColor: 'rgb(11, 163, 11,0.1)',
        borderColor: 'rgb(11, 163, 11,1)',
        borderWidth: 1,
      },

    ],
};
  
export default function RadarChart() {
    return <Radar data={data} />;
}