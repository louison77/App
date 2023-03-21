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


export default function KPI(props) {

  const arrayexigences = props.array;

  const arraymesures = props.arraymesure;
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countfinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels2 = ["Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Contrôle d'accès", "Politiques de sécurité de l'information", "Organisation de la sécurité de l'information", "Sécurité des ressources humaines", "Gestion des actifs", "Sécurité des communications", "Relations avec les fournisseurs", "Gestion des incidents liés à la sécurité de l'information", "Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Conformité", "Sécurité liée à l'exploitation", "Sécurité physique et environnementale", "Acquisition, développement et maintenance des systèmes d'information"]
  var datainit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var datafinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrayexigences.map((item) => datainit[labels2.indexOf(item.Domaine)] += parseFloat(item.Note))
  arrayexigences.map((item) => count[labels2.indexOf(item.Domaine)] += 1)
  arraymesures.map((item) => datafinal[labels2.indexOf(item.Domaine)] += item.Note)
  arraymesures.map((item) => countfinal[labels2.indexOf(item.Domaine)] += 1)

  for (let i = 0; i < datainit.length; i++) {
    datainit[i] /= count[i];
  }
  for (let i = 0; i < datafinal.length; i++) {
    datafinal[i] /= countfinal[i];
  }


  // Chart Setup
  const options = {
    plugins: { legend: { display: false } }
  };


  const data = {
    labels: labels2,
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
        data: datainit,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: "Après plan d'action",
        data: datafinal,
        backgroundColor: 'rgb(11, 163, 11,0.1)',
        borderColor: 'rgb(11, 163, 11,1)',
        borderWidth: 1,
      },

    ],
  };
  return <Radar options={options} data={data} />;
}