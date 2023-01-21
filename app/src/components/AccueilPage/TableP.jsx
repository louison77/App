import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/AccueilStyle/_tableP.css";

function TableP() {
  //state
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const getDataFromApi = async (e) => {
    e.preventDefault();
    const data = await fetch(`/api/hello?name=${name}`);
    const json = await data.json();

    if (json.message) {
      setMessage(json.message);
    }
  };
  //tableau contenant informations différents projets
  const [projets, setprojets] = useState([
    { Nom: "Acme", Id: 298 - 52, StatutAudit: "Terminé", StatutPA: "Terminé" },
    {
      Nom: "Orange",
      Id: 278 - 40,
      StatutAudit: "Terminé",
      StatutPA: "En cours",
    },
  ]);
  //tableau tampon pour pouvoir ajouter un projet dans le tableau au dessuss
  const [newProjet, setNewProjet] = useState("");

  //comportements

  //comportement/evenenement lors de la soumission du formulaire
  const handleSubmit = (event) => {
    //pour ne pas que la page se réactualise quand on appuie sur le bouton
    event.preventDefault();
    if (newProjet !== "") {
      //copie du state
      const ProjetCopy = [...projets];
      //manipulation copie du state, on génère un id aléatoire
      const id = new Date().getTime();
      const nom = newProjet;
      const StatutAudit = "Pas démarré";
      const StatutPA = "Pas démarré";
      ProjetCopy.push({
        Nom: nom,
        Id: id,
        StatutAudit: StatutAudit,
        StatutPA: StatutPA,
      });
      //modifier state setter
      setprojets(ProjetCopy);
      setNewProjet("");
    }
  };
  //permet de taper dans la zone de texte
  const handleChange = (event) => {
    setNewProjet(event.target.value);
  };
  //render
  return (
    <div>
      <div className="boutons">
        <form action="submit" onSubmit={handleSubmit}>
          <input
            value={newProjet}
            type="text"
            placeholder="Ajouter un projet"
            onChange={handleChange}
          />
          <button className="Button1">Nouveau projet</button>
        </form>

        <button className="Button2">Nouveau CdP</button>
      </div>
      <table className="TableProjects">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Id</th>
            <th>Statut Audit</th>
            <th>Statut PA</th>
          </tr>
        </thead>

        <tbody>
          {projets.map((project) => (
            <tr>
              <Link to={"/Gestion/" + project.Nom} others={project.Nom}>
                <button className="ButtonProjectName">
                  <td>{project.Nom}</td>
                </button>
              </Link>
              <td>{project.Id}</td>
              <td>{project.StatutAudit}</td>
              <td>{project.StatutPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <form
          id="form1"
          className="App-form"
          onSubmit={(e) => getDataFromApi(e)}
        >
          <div>
            <input
              type="text"
              id="name"
              className="App-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="App-button">
              Submit
            </button>
          </div>
        </form>
        <div>
          <h5>Message: {message} </h5>
        </div>
      </p>
    </div>
  );
}

export default TableP;
//<Link to="/../pages/Gestion.jsx"></Link>
