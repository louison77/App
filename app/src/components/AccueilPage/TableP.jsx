import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/AccueilStyle/_tableP.css";
import axios from 'axios'
import Confirmation from "./Confirmation";




function TableP(props) {
  //role de l'utilisateur
  const role = props.role
  //Url de l'api projet
  const baseUrl = '/api/Projet';
  //tableau contenant informations différents projets
  const [projets, setprojets] = useState([
  ]);
  //tableau tampon pour pouvoir ajouter un projet dans le tableau au dessus
  const [newProjet, setNewProjet] = useState("");
  //Id maximum pour le code du projet
  const [maxId, setmaxID] = useState(0);

  //Code pour le popup de confirmation de suppression, se référer à la page admin

  const [confirmation, setconfirmation] = useState({
    message: "",
    isLoading: false,
    NameConfirmation: ""
  })
  const HandleConfirmation = (message, isLoading, NameConfirmation) => {
    setconfirmation({
      message, isLoading, NameConfirmation
    })
  }
  const handleDelete = (id, nom) => {
    HandleConfirmation("Voulez-vous supprimer ce Projet?", true, (nom + " / " + id));

  }
  const tableRef = useRef(null)



  //Récupération à l'aide d'une fonction asynchrone des informations des projets selon les auditeurs ou le manager du projet
  //Il est réactualisé à chaque modification de maxId, props.userDetails, newProjet et confirmation
  useEffect(() => {
    const getBDD = async () => {

      try {

        const response = await axios.get(`${baseUrl}`);
        const retrievedProject = response.data.projets;

        const tab = []

        retrievedProject.forEach(projet => {
          if (projet.auditeur.includes(props.user.userDetails) === true || projet.manager === props.user.userDetails) {
            const NewProject = {
              Nom: projet.nom,
              Code: projet.projetid,
              StatutAudit: projet.statutaudit,
              StatutPA: projet.statutplanaction,
              Manager: projet.manager
            }
            tab.push(NewProject);
          }
          if (parseInt(projet.projetid.substring(7)) >= maxId) {

            const VALUE = (parseInt(projet.projetid.substring(7)) + 1)
            setmaxID(VALUE.toString())



          }
        },
          setprojets(tab));
      }
      catch (error) {
        console.log(error)
      }
    }
    getBDD();
  }, [props.user.userDetails, maxId, newProjet, confirmation]);

  //Ajout du projet en local et création d'un nouveau projet avec une requête post(fonction sendProject)
  const handleSubmit = (event) => {
    //pour ne pas que la page se réactualise quand on appuie sur le bouton
    event.preventDefault();
    if (newProjet !== "") {
      //copie du state
      const ProjetCopy = [...projets];
      //manipulation copie du state, on génère un id aléatoire
      const Code = newProjet[0].toUpperCase() + "-" + (new Date().getFullYear()).toString() + "-" + maxId.toString();
      const nom = newProjet;
      const StatutAudit = "Pas démarré";
      const StatutPA = "Pas démarré";
      ProjetCopy.push({
        Nom: nom,
        Code: Code,
        StatutAudit: StatutAudit,
        StatutPA: StatutPA,
        Manager: props.user.userDetails,
      });



      const sendProject = async () => {

        try {

          await axios.post(`${baseUrl}`, {
            nom: nom,
            projetid: Code,
            statutaudit: StatutAudit,
            statutplanaction: StatutPA,
            manager: props.user.userDetails
          }, {
            'Content-Type': 'application/json'
          },).then(function (response) {
            console.log(response);
          })

        }
        catch (error) {
          console.log(error)
        }
      }
      sendProject()
      //modifier state projet

      setprojets(ProjetCopy);
      //réinitialise variable tampon du nom du projet
      setNewProjet("");
    }
  };

  //permet de taper dans la zone de texte en récupérant la chaine de caractères à chaque entrée d'une touche dans le formulaire
  const handleChange = (event) => {
    setNewProjet(event.target.value);
  };
  //Effectue une requête delete vers l'api Projet, cette fonction nécessite l'id du projet et l'attribut test est true on delete sinon on réinitialise les paramètres de confirmation pour faire partir le popup
  const DeleteProjet = (id, test) => {

    if (test) {
      const DeleteOne = async () => {
        try {
          await axios.delete(`${baseUrl}`, {
            data: {
              projetid: id.split("/ ")[1],
            }
          }, {
            'Content-Type': 'application/json'
          },).then(function (response) {
            console.log(response);
          })
        }
        catch (error) {
          console.log(error)
        }
      }

      DeleteOne()
      HandleConfirmation("", false);
    }
    else {
      HandleConfirmation("", false);
    }
  }

  //Il y a différents affichage selon le rôle de l'utilisateur soit Manager, soit Auditeur
  //La seule différence réside dans la possibilité de créer un projet
  if (role === "Manager") {
    return (
      <div>

        <div className="Inputpart">
          <form className="boutons" action="submit" onSubmit={handleSubmit}>
            <input
              className="InputProjet"
              value={newProjet}
              type="text"
              placeholder="Ajouter un projet"
              onChange={handleChange}
            />
            <button className="Button1">Nouveau projet</button>
          </form>
        </div>

        <table ref={tableRef} style={{ width: "60%" }} className="TableProjects">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Nom Client</th>
              <th>Code Projet</th>
              <th>Chef de Projet</th>
              <th>Statut Audit</th>
              <th>Statut PA</th>
            </tr>
          </thead>

          <tbody>
            {projets.map((project) => (
              <tr>
                <td style={{ textAlign: "left", fontWeight: "bold" }}><Link to={"/Gestion/" + project.Code} state={{ Currentuser: props.user.userDetails }}>
                  {project.Nom}
                </Link>
                </td>
                <td>{project.Code}</td>
                <td>{project.Manager}</td>
                <td>{project.StatutAudit}</td>
                <td>{project.StatutPA}</td>
                <div><button onClick={() => handleDelete(project.Code, project.Nom)} className="Boutondeleted">X</button></div>
              </tr>
            ))}
          </tbody>
        </table>
        {confirmation.isLoading && (
          <Confirmation OnConfirmation={DeleteProjet} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
        )

        }
      </div>
    );
  }
  else {
    return (
      <div>
        <table className="TableProjects">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Nom</th>
              <th>Code</th>
              <th>Chef de Projet</th>
              <th>Statut Audit</th>
              <th>Statut PA</th>
            </tr>
          </thead>

          <tbody>
            {projets.map((project) => (
              <tr>
                <td style={{ textAlign: "left", fontWeight: "bold" }}><Link to={"/Gestion/" + project.Code} state={{ Currentuser: props.user.userDetails }}>
                  {project.Nom}
                </Link>
                </td>
                <td>{project.Code}</td>
                <td>{project.Manager}</td>
                <td>{project.StatutAudit}</td>
                <td>{project.StatutPA}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    )
  }
  //render

}

export default TableP;
//<Link to="/../pages/Gestion.jsx"></Link>
