import React, { useEffect, useState } from "react";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/ProgressRadar.jsx";
import CostBarChart from "./Graphs/CostBarChart.jsx";
import CostRollingBarChart from "./Graphs/CostRollingBarChart";
//import { ProgressBar } from "react-bootstrap";
import ProgressBar from "./Graphs/ProgressBar";
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";

//Debug

/*const TESTcostarray = [{
  Cout: 2000,
  Coutrun: 1200,
},
{
  Cout: 3000,
  Coutrun: 2000,
},
{
  Cout: 4000,
  Coutrun: 3000,
},
{
  Cout: 5000,
  Coutrun: 4000,
},
{
  Cout: 6000,
  Coutrun: 5000,
}]*/

const TESTprogressarray = [{
  Priorite: "P0",
  Complexite: 0,
  Cout: 0,
  Coutrun: 0,
  Maturite: 0,
},
{
  Priorite: "P1",
  Complexite: 1,
  Cout: 1,
  Coutrun: 1,
  Maturite: 1,
},
{
  Priorite: "P2",
  Complexite: 2,
  Cout: 2,
  Coutrun: 2,
  Maturite: 2,
},
{
  Priorite: "P3",
  Complexite: 3,
  Cout: 3,
  Coutrun: 3,
  Maturite: 3,
}]

// Importation des données de l'API

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
    Domaine: "",
    Note: 0,
  }])

  const [localexigences, setlocalexigences] = useState([{
    Exigenceid: "",
    Note: "",
    Maturite: "",
    Domaine: ""
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
        const retrievedMesure = response.data.mesure;
        var tab = []
        retrievedMesure.forEach(mesure => {
          if (mesure.mesureid.split(' ')[0] === code) {
            tab.push({
              Priorite: mesure.priorite,
              Complexite: mesure.complexite,
              Cout: mesure.cout,
              Coutrun: mesure.coutrun,
              Maturite: mesure.mesureid.split('.')[1],
              DateDebut: mesure.debut,
              DateFin: mesure.fin,
              Statut: mesure.statut,
              Domaine: mesure.domaine,
              Note: mesure.note
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
        const retrievedExigence = response.data.exigence;
        retrievedExigence.forEach(exigence => {
          if (exigence.projetid === code) {
            tab2.push({
              //domaine: exigence.Domaine,
              Exigenceid: exigence.exigenceid,
              Note: exigence.note,
              Maturite: exigence.maturite,
              Domaine: exigence.domaine,
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

  }, [refresh, code])

  const changeToggle = (type, id) => {
    console.log(localexigences)
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
    <div>
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

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
          Content1
          <div className="grid-container-two-elem">
            <div>
              <img src="https://d2ph5fj80uercy.cloudfront.net/05/cat480.jpg" alt="this is alt text." />
            </div>
            <div>
              <img src="https://d2ph5fj80uercy.cloudfront.net/05/cat480.jpg" alt="this is alt text." />
            </div>
          </div>
        </div>
        <hr />
        <div>
          Content2
          <div className="grid-container-one-elem">
            <div>
              <img src="https://d2ph5fj80uercy.cloudfront.net/05/cat480.jpg" alt="this is alt text." />
            </div>
          </div>
        </div>
      </div>




      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <p>Work In Progress</p>
      <br />
      <div class="container">
        <div class="advances">
          <div class="progress_bar"><ProgressBar array={TESTprogressarray} /></div>
          <div class="radar"><RadarChart array={localexigences} arraymesure={localmesures} /></div>
          <div class="kpi">KPI</div>
        </div>
        <div class="costs"><CostBarChart array={TESTprogressarray} /></div>
        <div class="settings">
          <div class="audit_status"></div>
          <div class="action_plan_status"></div>
          <div class="info"></div>
        </div>
      </div>


      <div class="tile_two-third_left">
        <h3>Avancement</h3>
        <div class="tile_half_left">
          <RadarChart array={localexigences} arraymesure={localmesures} />
        </div>
        <div class="tile_half_right"><ProgressBar /></div>
      </div>

      <div class="tile_one-third_right">
        <h3>Coûts</h3>
        <CostRollingBarChart array={localmesures}
        />
      </div>

      <div class="tile_full">
        <h3>Options</h3>
      </div>
    </div>
  );
};

export default Resume;
