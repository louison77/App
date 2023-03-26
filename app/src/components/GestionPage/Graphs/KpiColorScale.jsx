import React from 'react';

/* This component is used to display Key Point Indicators with a color scale.
It sets the color scale to a custom gradient from #CD3C14 orange, through #FFCC00 (yellow) to #32C832 (green). 
Those colors were pulled from the official Orange graphic charter.
It's currently used in the KpiDisplay component.
*/


function ColorScale({ value, maxValue }) {
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
  const style = {
    backgroundColor: `rgb(${red}, ${green}, ${blue})`,
  };

  return (
    <div style={style}>
        {value}
    </div>
  );
}

export default ColorScale;