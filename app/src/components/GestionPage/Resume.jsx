import React, { useEffect, useState } from "react";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/ProgressRadar.jsx";
import CostBarChart from "./Graphs/CostBarChart.jsx";
//import { ProgressBar } from "react-bootstrap";
import ProgressBar from "./Graphs/ProgressBar";
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";


const Resume = () => {
  //code du projet
  const [code] = useOutletContext();
  //url api projet
  const baseUrl = "/api/Projet"
  const baseUrl2 = "/api/Mesure";
  const baseUrl3 = "/api/Exigence";
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
  const [localmesures, setlocalmesures] = useState([{
    Priorite: "",
    Complexite: "",
    Cout: "",
    Coutrun: "",
    Maturite: "",
    DateDebut: "",
    DateFin: "",
    Statut: "",
  }])

  const [localexigences, setlocalexigences] = useState([{
    Exigenceid: "",
    Note: "",
    Maturite: "",
  }])

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
    const getMesure = async () => {
      try {
        const response = await axios.get(`${baseUrl2}`);
        const retrievedMesure = response.data.mesures;
        var tab = []
        retrievedMesure.forEach(mesure => {
          if (mesure.mesureid.split(' ')[0] === code) {
            tab.push({
              Priorite: mesure.priorite,
              Complexite: mesure.complexite,
              Cout: mesure.cout,
              Coutrun: mesure.coutrun,
              Maturite: mesure.mesureid('.')[1],
              DateDebut: mesure.debut,
              DateFin: mesure.fin,
              Statut: mesure.statut,
            })
          }
        })
        setlocalmesures(tab)
      }
      catch (error) {
        console.log(error)
      }
    }
    getMesure()


    const getExigence = async () => {

      try {
        var tab2 = []
        const response = await axios.get(`${baseUrl3}`);
        const retrievedExigence = response.data.exigences;
        retrievedExigence.forEach(exigence => {
          if (exigence.projetid === code) {
            tab2.push({
              //domaine: exigence.Domaine,
              Exigenceid: exigence.exigenceid,
              Note: exigence.note,
              Maturite: exigence.maturite,
            })
          }
        })
        setlocalexigences(tab2)
      }
      catch (error) {
        console.log(error)
      }
    }
    getExigence()
    console.log(localexigences)
    console.log(localmesures)
  }, [refresh, code, localexigences, localmesures])

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
        <CostBarChart />
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
