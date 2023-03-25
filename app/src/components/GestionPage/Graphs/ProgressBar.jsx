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
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countfinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countEnCours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countNotStart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countTerminé = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const labels2 = ["Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Contrôle d'accès", "Politiques de sécurité de l'information", "Organisation de la sécurité de l'information", "Sécurité des ressources humaines", "Gestion des actifs", "Sécurité des communications", "Relations avec les fournisseurs", "Gestion des incidents liés à la sécurité de l'information", "Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Conformité", "Sécurité liée à l'exploitation", "Sécurité physique et environnementale", "Acquisition, développement et maintenance des systèmes d'information"]
  const labels_display = [
    "Sécurité liée à la Gestion",
    "Contrôle d'accès",
    "Politiques de sécurité de l'information",
    "Organisation de la sécurité de l'information",
    "Sécurité des ressources humaines",
    "Gestion des actifs",
    "Sécurité des communications",
    "Relations avec les fournisseurs",
    "Gestion des incidents",
    "Sécurité liée à la Gestion",
    "Conformité",
    "Sécurité liée à l'exploitation",
    "Sécurité physique et environnementale",
    "Gestion des systèmes d'information"]
  var datainit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var datafinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  arrayexigences?.map((item) => datainit[labels2.indexOf(item.Domaine)] += parseFloat(item.Note))
  arrayexigences?.map((item) => count[labels2.indexOf(item.Domaine)] += 1)
  arraymesures?.map((item) => datafinal[labels2.indexOf(item.Domaine)] += item.Note)
  arraymesures?.map((item) => countfinal[labels2.indexOf(item.Domaine)] += 1)
  arraymesures.forEach(element => {
    if (element.Statut === "Pas démarré") {
      countNotStart[labels2.indexOf(element.Domaine)] += 1
    }
    if (element.Statut === "En cours") {
      countEnCours[labels2.indexOf(element.Domaine)] += 1
    }
    if (element.Statut === "Terminé") {
      countTerminé[labels2.indexOf(element.Domaine)] += 1
    }

  });

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

  const Encoursvalues = []
  for (let i = 0; i < datainit.length; i++) {
    Encoursvalues.push(countNotStart[i] + countEnCours[i]);
  }

  const Terminevalues = []
  for (let i = 0; i < datainit.length; i++) {
    Terminevalues.push(countNotStart[i] + countEnCours[i] + countTerminé[i]);
  }

  // Resulting values




  // Chart Setup


  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        display: false,
      },
      y: {
        stacked: true,
        grid: { display: false },
        border: { display: false },

      },
    },
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Progression des mesures' },
      tooltip: { enabled: false }
    }
  };


  const data = {
    labels: labels_display,
    datasets: [
      {
        label: 'Pas commencées',
        data: countNotStart,
        backgroundColor: 'rgb(11, 163, 11)',
      },
      {
        label: 'En cours',
        data: countEnCours,
        backgroundColor: 'rgb(255, 210, 31)',
      },
      {
        label: 'Terminées',
        data: countTerminé,
        backgroundColor: "red",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}