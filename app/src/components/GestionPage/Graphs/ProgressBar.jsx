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

export default function ProgressBar(props) {

  const arrayexigences = props.arrayexigences;

  const arraymesures = props.arraymesure;
  console.log(arraymesures)
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countfinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels2 = ["Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Contrôle d'accès", "Politiques de sécurité de l'information", "Organisation de la sécurité de l'information", "Sécurité des ressources humaines", "Gestion des actifs", "Sécurité des communications", "Relations avec les fournisseurs", "Gestion des incidents liés à la sécurité de l'information", "Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Conformité", "Sécurité liée à l'exploitation", "Sécurité physique et environnementale", "Acquisition, développement et maintenance des systèmes d'information"]
  var datainit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var datafinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrayexigences?.map((item) => datainit[labels2.indexOf(item.Domaine)] += parseFloat(item.Note))
  arrayexigences?.map((item) => count[labels2.indexOf(item.Domaine)] += 1)
  arraymesures?.map((item) => datafinal[labels2.indexOf(item.Domaine)] += item.Note)
  arraymesures?.map((item) => countfinal[labels2.indexOf(item.Domaine)] += 1)

  for (let i = 0; i < datainit.length; i++) {
    if (datainit[i] !== 0) {
      datainit[i] /= count[i];
      datainit[i] *= 100
    }

  }

  for (let i = 0; i < datafinal.length; i++) {
    if (datafinal !== 0 && countfinal[i] !== 0) {
      datafinal[i] /= countfinal[i]
      datafinal[i] *= 100;
    }
  }



  // Resulting values
  const backdrop_values = [];
  for (let i = 0; i < datainit.length; i++) {
    if (datainit[i] !== 100) {
      backdrop_values.push(100 - datafinal[i]);
    }
    else {
      backdrop_values[i] = 0
    }

  }
  const improvement_values = [];
  for (let i = 0; i < datainit.length; i++) {
    if (datafinal[i] > datainit[i]) {
      improvement_values.push(datafinal[i] - datainit[i]);
    }
    else {
      improvement_values.push(0)
    }

  }


  // Chart Setup


  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        display: true,
      },
      y: {
        stacked: true,
        grid: { display: true },
        border: { display: true },

      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: false }
    }
  };


  const data = {
    labels: labels2,
    datasets: [
      {
        label: 'Niveau actuel',
        data: datainit,
        backgroundColor: 'rgb(11, 163, 11)',
      },
      {
        label: 'Niveau souhaité',
        data: improvement_values,
        backgroundColor: 'rgb(255, 210, 31)',
      },
      {
        label: '',
        data: backdrop_values,
        backgroundColor: 'rgba(200, 200, 200, 0.4)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}