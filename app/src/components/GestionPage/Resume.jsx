import React, { useEffect, useState } from "react";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/ProgressRadar.jsx";
import PolarAreaChart from "./Graphs/CostPolarArea.jsx";
//import { ProgressBar } from "react-bootstrap";
import ProgressBar from "./Graphs/ProgressBar";
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";


const Resume = () => {
  const [code] = useOutletContext();
  const baseUrl = "/api/Projet"
  const [refresh, setrefresh] = useState(true)
  const [valueAudit, setValueAudit] = useState("")
  const [valuePA, setvaluePA] = useState("")
  const [checked1] = useState([
    {
      name: "En cours", id: 0
    },
    {
      name: "Terminé", id: 1
    }
  ]
  )
  const [checked2] = useState([
    {
      name: "En cours", id: 0
    },
    {
      name: "Terminé", id: 1
    }
  ]
  )
  useEffect(() => {
    const getProject = async () => {
      try {


        const response = await axios.get(`${baseUrl}`);
        const retrievedProject = response.data.projets;
        retrievedProject.forEach(projet => {
          if (projet.projetid === code) {
            setValueAudit(projet.statutaudit)
            setvaluePA(projet.statutplanaction)
          }
        })
      }
      catch (error) {
        console.log(error)
      }

    }
    getProject()
  }, [refresh, code])
  const changeToggle = (type, id) => {
    if (type) {
      const patchStatutProjet = async () => {
        try {
          if (id === 0 && valueAudit !== "En cours") {
            await axios.patch(`${baseUrl}`,
              {
                projetid: code,
                statutaudit: "En cours"
              }, {
              'Content-Type': 'application/json'
            })
          }
          else if (id === 1 && valueAudit !== "Terminé") {
            await axios.patch(`${baseUrl}`,
              {
                projetid: code,
                statutaudit: "Terminé"
              }, {
              'Content-Type': 'application/json'
            })

          }

        }
        catch (error) {
          console.log(error)
        }

      }

      //sendexigences()
      patchStatutProjet();
      setrefresh(!refresh)
    }
    else {

      const patchStatutPA = async () => {
        try {
          if (id === 0 && valuePA !== "En cours") {
            await axios.patch(`${baseUrl}`,
              {
                projetid: code,
                statutplanaction: "En cours"
              }, {
              'Content-Type': 'application/json'
            })
          }
          else if (id === 1 && valuePA !== "Terminé") {
            await axios.patch(`${baseUrl}`,
              {
                projetid: code,
                statutplanaction: "Terminé"
              }, {
              'Content-Type': 'application/json'
            })

          }

        }
        catch (error) {
          console.log(error)
        }
      }
      patchStatutPA()
      setrefresh(!refresh)
    }


  }
  return (
    <div class="container">
      <div className="StatutGestion">
        <div className="StatutAudit">
          <h3>Statut de l'audit</h3>
          <buttongroup>
            {checked1.map((radio) => (
              <ToggleButton style={{
                backgroundColor:
                  valueAudit === radio.name ? "Orange" : "Whitesmoke", color: "Black", border: "none"
              }} type="radio" checked={valueAudit === radio.name} onClick={() => changeToggle(true, radio.id)}>
                {radio.name}
              </ToggleButton>
            ))

            }</buttongroup>
        </div>
        <div className="StatutPA">
          <h3>Statut du plan d'action</h3>
          <buttongroup>
            {checked2.map((radio) => (
              <ToggleButton style={{
                backgroundColor:
                  valuePA === radio.name ? "Orange" : "Whitesmoke", color: "Black", border: "none"
              }} type="radio" checked={valuePA === radio.name} onClick={() => changeToggle(false, radio.id)}>
                {radio.name}
              </ToggleButton>
            ))

            }</buttongroup>

        </div>
      </div>
      <div class="tile_two-third_left">
        <h3>Avancement</h3>
        <div class="tile_half_left">
          <RadarChart />
        </div>
        <div class="tile_half_right"><ProgressBar /></div>
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
