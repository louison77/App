import React from 'react';

/* This component is used to display Key Point Indicators inside of colored tiles.
It uses values calculated in the KpiDisplay component. The backgrounds of each KPI are colored depending on their respective values.
It sets a custom color scale to a custom gradient from #CD3C14 orange, through #FFCC00 (yellow) to #32C832 (green). 
Those colors were pulled from the official Orange graphic charter.
It's currently used in the KpiDisplay component.
*/


function KpiElement({ name, value, maxValue }) {
    // Calculate a value between 0 and 1 based on the ratio of value to maxValue
    const ratio = value / maxValue;

    // Map the ratio to a custom color gradient
    let red, green, blue;
    if (ratio < 0.5) {
        // Transition from #CD3C14 to #FFCC00
        red = Math.round(205 + (ratio * 2 * (255 - 205)));
        green = Math.round(60 + (ratio * 2 * (204 - 60)));
        blue = Math.round(20 + (ratio * 2 * (0 - 20)));
    } else {
        // Transition from #FFCC00 to #32C832
        red = Math.round(255 - ((ratio - 0.5) * 2 * (255 - 50)));
        green = Math.round(204 + ((ratio - 0.5) * 2 * (200 - 204)));
        blue = Math.round(0 + ((ratio - 0.5) * 2 * (50 - 0)));
    }

    // Apply the color to the div
    const Elementstyle = {
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        width: '100px',
        borderRadius: '5px',
        justifyContent: 'center',
        paddingBottom: '5px',
    };

    const Labelstyle = {
        paddingLeft: '5px',
        textAlign: 'left',
        fontSize: '10px',
        color: 'rgba(0,0,0,0.5)',
        fontWeight: "bold"
    }

    const Valuestyle = {
        marginLeft: '6px',
        marginRight: '6px',
        borderLeft: '1px solid rgba(0,0,0,0.3)',
        textAlign: 'center',
        fontSize: '30px',
    }

    return (
        <div style={Elementstyle}>
            <div style={Labelstyle}>
                {name}
            </div>
            <div style={Valuestyle}>
                {value}
            </div>
        </div>
    );
}

export default KpiElement;