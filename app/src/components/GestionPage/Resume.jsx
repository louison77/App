import React, { useEffect, useState } from "react";
import "../../styles/components/GestionStyle/_resume.css";
import RadarChart from "./Graphs/ProgressRadar.jsx";
import CostBarChart from "./Graphs/CostBarChart.jsx";
import CostRollingBarChart from "./Graphs/CostRollingBarChart";
//import { ProgressBar } from "react-bootstrap";
import ProgressBar from "./Graphs/ProgressBar";
import axios from 'axios'
import { useOutletContext } from "react-router-dom";



// Importation des données de l'API

const Resume = () => {
  //code du projet
  const [code] = useOutletContext();
  //url api projet
  //const baseUrl = "/api/Projet"
  const baseUrl2 = "/api/Mesure";
  const baseUrl3 = "/api/Exigence";


  const [localmesures, setlocalmesures] = useState([{
    Priorite: "",
    Complexite: "",
    Cout: "",
    Coutrun: "",
    Maturite: "P0",
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

  }, [code])





  return (
    <div>
      <div className="Title-and-Buttons-Area">
      </div>
      <div className="big_container">
        <div className="left_pannel">
          <h3>Conformité </h3>
          <div className="grid-container-two-elem">
            <div>
              <div style={{ width: '400px', height: '400px' }}>
                <RadarChart array={localexigences} arraymesure={localmesures} width={400} height={400} />
              </div>
              <div id="scrollbox" className="RadarLegend">
                "GEST": Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité <br />
                "ACCS": Contrôle d'accès <br />
                "POLI": Politiques de sécurité de l'information <br />
                "ORGA": Organisation de la sécurité de l'information <br />
                "RH": Sécurité des ressources humaines <br />
                "ACTF": Gestion des actifs <br />
                "COMM": Sécurité des communications <br />
                "FRNI": Relations avec les fournisseurs <br />
                "INCD": Gestion des incidents liés à la sécurité de l'information <br />
                "GEST": Aspects de la sécurité de l'information dans la gestion de la continuité de l'activité <br />
                "CONF": Conformité <br />
                "EXPL": Sécurité liée à l'exploitation  <br />
                "P&E": Sécurité physique et environnementale  <br />
                "SYS": Acquisition, développement et maintenance des systèmes d'information <br />
              </div>
            </div>

            <div style={{ width: '500px', height: '500px' }}>
              <ProgressBar className="chart" arrayexigences={localexigences} arraymesure={localmesures} width={500} height={500} />
            </div>
          </div>
        </div>
        <hr className="separator"></hr>
        <div className="right_pannel">
          <h3>Coûts</h3>
          <div className="grid-container-one-elem">
            <div style={{ width: '500px', height: '300px' }}>
              <CostBarChart className="chart" array={localmesures} width={500} height={300} />
            </div>
            <div style={{ width: '500px', height: '300px' }}>
              <CostRollingBarChart className="chart" array={localmesures} width={500} height={300} />
            </div>
          </div>
        </div>
      </div>
      <div className="Title-and-Buttons-Area">

      </div>

    </div>

  );
};

export default Resume;
