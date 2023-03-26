import React from 'react';
import KpiColorScale from './KpiColorScale.jsx';


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

  const kpiStyle = {
    textAlign: 'center',
    fontSize: '30px',
    justifyContent: 'center',
    borderRadius: '50px',
    width : '100px',
  };

  //Render

  return (
    <div style={gridStyle}>
      <div style={kpiStyle}>
        <KpiColorScale value={CurrentGrade} maxValue={6} />
      </div>
      <div style={kpiStyle}>
        <KpiColorScale value={PredictedGrade} maxValue={6} />
      </div>
    </div>
  );
}