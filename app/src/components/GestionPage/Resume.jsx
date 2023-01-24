import React from "react";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/ProgressRadar.jsx";
import PolarAreaChart from "./Graphs/CostPolarArea.jsx";
//import ProgressBar from "./Graphs/ProgressBar";

const Resume = () => {
  return (
    <div class="container">
      <h1>Synthèse</h1>
      <div class="tile_two-third_left">
        <h3>Avancement</h3>
        <div class="tile_half_left">
          <RadarChart />
        </div>
        <div class="tile_half_right">Progress Bar here</div>
      </div>

      <div class="tile_one-third_right">
        <h3>Coûts</h3>
        <PolarAreaChart />
      </div>

      <div class="tile_full">
        <h3>Options</h3>
      </div>

      {/*
      <div class="tile_full"> full </div>
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
