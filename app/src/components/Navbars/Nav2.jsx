import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/NavbarsStyle/_nav2.css";

import axios from 'axios'


const Nav2 = (props) => {
  //code du projet
  const nom = props.name;
  //valeur du rôle, soit auditeur soit manager
  const user = props.user;
  //value qui est soit 0 soit 1, 1 on affiche l'affichage de l'auditeur (pas de page suivi), 0 celui de manager(chef de projet)
  //Initialisé de base à 0
  const [value, setvalue] = useState(0)
  //Url de l'api Projet
  const baseUrl = '/api/Projet';

  //on va récupérer le bon projet à l'aide de la varirable nom (projetid de la bdd) et si user(l'utilisateur) correspond au manager on modifie la valeur de value à 1
  useEffect(() => {
    const setProject = async () => {
      const response = await axios.get(`${baseUrl}`);
      const retrievedProject = response.data.projets;
      retrievedProject.forEach(element => {
        if (element.projetid === nom && element.manager === user) {

          setvalue(1)
        }

      });


    }
    setProject()

  })
  if (value === 0) {
    return (
      <div>
        <div className="navbar2">
          <div className="leftpart">
            <Link to="/">
              <img
                src="../logoorange.jpg"
                className="logoorange"
                alt="logo orange"
              />
            </Link>

            <span className="NameProject"> Projet : {nom}</span>
          </div>

          <div className="menu">
            <ul className="menu-liste">
              <Link to={"/Gestion/" + nom + "/Resume"} className="Menu-link">
                <li>Synthèse</li>
              </Link>
              <Link to={"/Gestion/" + nom + "/Exigences"} className="Menu-link">
                <li>Exigences</li>
              </Link>
              <Link to={"/Gestion/" + nom + "/Mesures"} className="Menu-link">
                <li>Plan d'actions</li>
              </Link>

            </ul>
          </div>
          <div className="rightpart">
            <div className="profil">

            </div>
          </div>
        </div>
      </div>
    );
  }
  // La seule différence avec l'affichage du dessus est le lien vers suivi qui est possible uniquement pour les chefs de projet
  else {


    return (
      <div>
        <div className="navbar2">
          <div className="leftpart">
            <Link to="/">
              <img
                src="../logoorange.jpg"
                className="logoorange"
                alt="logo orange"
              />
            </Link>

            <span className="NameProject"> Projet : {nom}</span>
          </div>

          <div className="menu">
            <ul className="menu-liste">
              <Link to={"/Gestion/" + nom + "/Resume"} className="Menu-link">
                <li>Synthèse</li>
              </Link>
              <Link to={"/Gestion/" + nom + "/Exigences"} className="Menu-link">
                <li>Exigences</li>
              </Link>
              <Link to={"/Gestion/" + nom + "/Mesures"} className="Menu-link">
                <li>Plan d'actions</li>
              </Link>
              <Link to={"/Gestion/" + nom + "/Suivi"} className="Menu-link">
                <li>Suivi</li>
              </Link>

            </ul>
          </div>
          <div className="rightpart">
            <div className="profil">

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Nav2;
