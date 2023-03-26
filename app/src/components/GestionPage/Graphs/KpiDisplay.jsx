import React from 'react';
import KpiElement from './KpiElement.jsx';

/* This component provides a display of some Key Point Indicators (KPIs), namely the current average grade and the predicted average grade.
The current average grade is calculated from the grades of the measures that have already been taken.
The predicted average grade is calculated from the grades of the measures that have been planned, but not yet taken.
Those values are then passed to the KpiElement component, which displays them in colored tiles.
*/



export default function KpiDisplay(props) {
  //data import
  //const array = props.array;
  //array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  //array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

  //DEBUG
  const CurrentGrade = 3;
  const PredictedGrade = 6;

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