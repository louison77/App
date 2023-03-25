import React from 'react';
import { useState, useEffect } from 'react';


export default function KpiDisplay(props) {
  //data import
  //const array = props.array;
  //array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
  //array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

  //DEBUG
  const CurrentGrade = 2.6;
  const PredictedGrade = 3;

  //Color scale
  const [hue, setHue] = useState(120);
  useEffect(() => {
    const mappedHue = 120 - (CurrentGrade * 120 / 100); // map value to hue between 0 and 120
    setHue(mappedHue);

  }, [CurrentGrade]);


  const color = `hsl(${hue}, 100%, 50%)`;

  //Style config
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '10px',
  };

  const kpiStyle = {
    backgroundColor: color,
    textAlign: 'center',
    fontSize: '30px',
    justifyContent: 'center'
  };

  //Render

  return (
    <div style={{ gridStyle }}>
      <div style={{ kpiStyle }}>
        {CurrentGrade}
      </div>
      <div style={{ kpiStyle }}>
       {PredictedGrade}
      </div>
    </div>

  );

}