import React from 'react';
import KpiElement from './KpiElement.jsx';

/* This component provides a display of some Key Point Indicators (KPIs), namely the current average grade and the predicted average grade.
The current average grade is calculated from the grades of the measures that have already been taken.
The predicted average grade is calculated from the grades of the measures that have been planned, but not yet taken.
Those values are then passed to the KpiElement component, which displays them in colored tiles.
*/



export default function KpiDisplay(props) {
  // data var setup 
  var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countfinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countEnCours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countNotStart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var countTerminé = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const labels2 = ["Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Contrôle d'accès", "Politiques de sécurité de l'information", "Organisation de la sécurité de l'information", "Sécurité des ressources humaines", "Gestion des actifs", "Sécurité des communications", "Relations avec les fournisseurs", "Gestion des incidents liés à la sécurité de l'information", "Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité", "Conformité", "Sécurité liée à l'exploitation", "Sécurité physique et environnementale", "Acquisition, développement et maintenance des systèmes d'information"]
  var datainit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var datafinal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  //data import
  const arrayexigences = props.arrayexigences;
  const arraymesures = props.arraymesure;
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

  //Data processing

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

  //Calculating the average grades
  const CurrentGrade = Math.round(datainit.reduce((a, b) => a + b, 0) / datainit.length);
  const PredictedGrade = Math.round(datafinal.reduce((a, b) => a + b, 0) / datafinal.length);

  //DEBUG
  //const CurrentGrade = 3;
  //const PredictedGrade = 6;

  //Style config
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '20px',
    justifyContent: 'center',
  };

  //Render

  return (
    <div style={gridStyle}>
        <KpiElement name={'Current Grade'} value={CurrentGrade} maxValue={6} />
        <KpiElement name={'Predicted Grade'} value={PredictedGrade} maxValue={6} />
    </div>
  );
}