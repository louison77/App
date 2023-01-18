import React from "react";
import { PolarArea } from "react-chartjs-2";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/Radar.jsx"
import PolarAreaChart from "./Graphs/PolarAreaChart.jsx"

const Resume = () => {
  return (
    <div class="container">
      <h1>Synthèse</h1>
      <div class="tile_two-third_left"> 
      <h3>Avancement</h3> 
      <div class="tile_half_left"><RadarChart/></div>
      <div class="tile_half_right"><PolarAreaChart/></div> 
      </div>

      <div class="tile_one-third_right"> 
      <h3>Coûts</h3>

      </div>


      {/*
      <div class="tile_half_left"> half left </div>
      <div class="tile_half_right"> half right </div>
      <div class="tile_two-third_left"> two-third left </div>
      <div class="tile_one-third_right"> one-third right </div>
      <div class="tile_one-third_left"> one-third left </div>
      <div class="tile_two-third_right"> two-third right </div>
      */}
    </div>
  );

};

export default Resume;