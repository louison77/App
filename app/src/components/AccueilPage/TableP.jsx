import React from "react";
import { useState,useEffect} from "react";
import { Link} from "react-router-dom";
import "../../styles/components/AccueilStyle/_tableP.css";
import axios from 'axios'

function TableP(props) {
  //state
  const baseUrl='/api/Projet';

  //tableau contenant informations différents projets
  const [projets, setprojets] = useState([
  ]);
  //tableau tampon pour pouvoir ajouter un projet dans le tableau au dessuss
  const [newProjet, setNewProjet] = useState("");
  const [newID, setNewID] = useState("");

  //comportements
  useEffect(() => {
    const getBDD = async () => {
        try {
            //const newtask = []
            const response = await axios.get(`${baseUrl}`);
            const retrievedProject = response.data.projets;
            const tab=[]
            
            retrievedProject.map(projet=>{
              if(projet.auditeur===props.user.userDetails || projet.manager===props.user.userDetails)
              {
                const NewProject={
                  Nom:projet.nom,
                  Code:projet.projetid,
                  StatutAudit:projet.statutaudit,
                  StatutPA:projet.statutplanaction
              }
              tab.push(NewProject);
              }
            },
            setprojets(tab))
            console.log(retrievedProject)
        }
        catch (error) {
            console.log(error)
        }
    }
    getBDD();
}, [props.user.userDetails]);
  //comportement/evenenement lors de la soumission du formulaire
  const handleSubmit = (event) => {
    //pour ne pas que la page se réactualise quand on appuie sur le bouton
    event.preventDefault();
    if (newProjet !== "" && newID !== "") {
      //copie du state
      const ProjetCopy = [...projets];
      //manipulation copie du state, on génère un id aléatoire
      const Code = newID;
      const nom = newProjet;
      const StatutAudit = "Pas démarré";
      const StatutPA = "Pas démarré";
      ProjetCopy.push({
        Nom: nom,
        Code: Code,
        StatutAudit: StatutAudit,
        StatutPA: StatutPA,
      });
      
      const sendProject=async()=>{

        try {
          
          await axios.post(`${baseUrl}`,{
          nom:nom,
          projetid:Code,
          statutaudit:StatutAudit,
          statutplanaction:StatutPA,
          manager:props.user.userDetails
        },{
          'Content-Type': 'application/json'
      },).then(function (response) {
        console.log(response);})
      }
      catch(error){
        console.log(error)
      }
      }
      sendProject()
      //modifier state setter
      setprojets(ProjetCopy);
      setNewProjet("");
      setNewID("");
      
    }
  };
  //permet de taper dans la zone de texte
  const handleChange = (event) => {
    setNewProjet(event.target.value);
  };
  const ChangeID = (event) => {
    setNewID(event.target.value);
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
          <input
            value={newID}
            type="text"
            placeholder="Ajouter l'ID"
            onChange={ChangeID}
          />

          <button className="Button1">Nouveau projet</button>
        </form>

        <button className="Button2">Nouveau CdP</button>
      </div>
      <table className="TableProjects">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
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
              <td>{project.Code}</td>
              <td>{project.StatutAudit}</td>
              <td>{project.StatutPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default TableP;
//<Link to="/../pages/Gestion.jsx"></Link>
