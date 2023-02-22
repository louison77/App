import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/NavbarsStyle/_nav2.css";

import axios from 'axios'


const Nav2 = (props) => {
  const nom = props.name;
  const user = props.user;
  const [value, setvalue] = useState(0)
  const baseUrl = '/api/Projet';

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
              <Link to={"/Gestion/" + nom + "/Export"} className="Menu-link">
                <li>Export</li>
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
              <Link to={"/Gestion/" + nom + "/Export"} className="Menu-link">
                <li>Export</li>
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
