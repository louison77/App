import React from 'react';

/* This code is the first version of the KpiDisplay component. 
It provides a simple display of the KPIs, with a fixed color for each one.
The current grade is always displayed in green, and the predicted grade is always displayed in orange.
*/


export default function KpiDisplay(props) {
    //data import
    //const array = props.array;
    //array.map((item) => Cout[parseInt(item.Priorite[1])] += item.Cout)
    //array.map((item) => Coutrun[parseInt(item.Priorite[1])] += item.Coutrun)

    //DEBUG
    const CurrentGrade = 5;
    const PredictedGrade = 6;



    //Style config
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '10px',
        border: '1px solid black',
    };

    const kpiStyle = {
        textAlign: 'center',
        fontSize: '30px',
        justifyContent: 'center',
        borderRadius: '5px',
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