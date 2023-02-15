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


// Imported Values (must be ranged from 0 to 1)
const current_values = [0.2, 0.7, 0.3, 0.6];
const goal_values = [0.8, 0.9, 0.7, 0.8];

// Chart Setup
const options = {
  plugins: {legend: {display: false}}
};

  
const data = {
    labels: ['ORG', 'PHY', 'TEC', 'MGM'],
    datasets: [
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
        data: current_values,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: "Après plan d'action",
        data: goal_values,
        backgroundColor: 'rgb(11, 163, 11,0.1)',
        borderColor: 'rgb(11, 163, 11,1)',
        borderWidth: 1,
      },

    ],
};
  
export default function RadarChart() {
    return <Radar options={options} data={data} />;
}