import React from 'react';
import { useState } from "react";
import Dropdown  from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

const Suivi = () => {
    const [Type,setType]=useState(1);
    //States
    const [mesures, setMesures] = useState([
      {
        Id: "5.08.1.1.1",
        Nom: "Vidéo-surveillance dans la salle serveur",
        Action:
          "Mettre en place des caméras dans la salle serveur du siège d’Evry​",
        Maturite: "2",
        Priorite: "P1",
        Complexite: "++",
        CoutProjet: "5",
        CoutRun: "1",
        AideChiffrage:
          "Eqpt seul: 2 K€​ Solution packagée avec monitoring par société de surveillance externe : 5k€ + 1 K€/an​",
        Porteur: "Service Généraux",
        DateDebut: "T2 2022",
        DateFin: "T4 2022",
        Statut: "Terminé",
        Macro: "Vidéo-Surveillance",
      },
      {
        Id: "5.08.1.1.2",
        Nom: "Vidéo-surveillance dans les dépôts",
        Action:
          "Mettre en place des caméras dans les zones d’arrivée de marchandise de chacun des 3 dépôts logistiques​​",
        Maturite: "2",
        Priorite: "P2",
        Complexite: "+",
        CoutProjet: "",
        CoutRun: "",
        AideChiffrage: "",
        Porteur: "Service Généraux",
        DateDebut: "T2 2022",
        DateFin: "T4 2022",
        Statut: "Terminé",
        Macro: "Vidéo-Surveillance",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "T1 2000",
        DateFin: "T2 2000",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
  
      {
        Id: "5.08.x.y.z",
        Nom: "",
        Action: "​",
        Maturite: "",
        Priorite: "",
        Complexite: "",
        CoutProjet: "",
        CoutRun: "",
        AideChiffrage: "",
        Porteur: "",
        DateDebut: "",
        DateFin: "",
        Statut: "",
        Macro: "",
      },
    ]);
    const [filtreMesures, setFiltreMesures] = useState([{
        Id: "",
        Nom: "",
        Action: "​",
        Maturite: "",
        Priorite: "",
        Complexite: "",
        CoutProjet: "",
        CoutRun: "",
        AideChiffrage: "",
        Porteur: "",
        DateDebut: "",
        DateFin: "",
        Statut: "",
        Macro: "",
      }])

      const [colonne, setColonne] = useState("Libellé");
      const [filtre, setFiltre] = useState("");


    /* function */
    const Filtre = (event) => {
        /* Valeur dans le champ du filtre : event.target.value */
        
        if(event.target.value==""){
            setType(1);
        } else {
            const Copy=[];
            if(colonne==="ID Interne")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Id.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Libellé")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Nom.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Action")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Action.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Maturité")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Maturite.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Priorité")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Priorite.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Complexité")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Complexite.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Coût Projet (k€)")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].CoutProjet.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Coût Run (k€/an)")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].CoutRun.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Aide au chiffrage")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].AideChiffrage.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Porteur")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Porteur.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Date début")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].DateDebut.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Date fin")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].DateFin.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Statut")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Statut.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }
            if(colonne==="Macro projet")
            {
                for (let i = 0; i < mesures.length; i++) {
                    if(mesures[i].Macro.search(event.target.value) != -1){
                        Copy.push(mesures[i]);
                    }
                }
            }

            setFiltreMesures(Copy);
            setType(2);
        }
        
    };
    const ChangeColonne =(event)=>{
        setColonne(event.target.value);
    }
    if(Type==1)
    {
        return (
            <div>
                <h1>TEST POUR PLAN D'ACTION (Anciennement Suivi)</h1>
                    <input type="text" name="Thing" onChange={Filtre}/>
                        <form>
                            <select value = {colonne} onChange={ChangeColonne}>
                                <option>ID Interne</option>
                                <option>Libellé</option>
                                <option>Action</option>
                                <option>Maturité</option>
                                <option>Priorité</option>
                                <option>Complexité</option>
                                <option>Coût Projet (k€)</option>
                                <option>Coût Run (k€/an)</option>
                                <option>Aide au chiffrage</option>
                                <option>Porteur</option>
                                <option>Date début</option>
                                <option>Date fin</option>
                                <option>Statut</option>
                                <option>Macro projet</option>
                            </select>
                            </form>
                        <div className='pageMesure'>
                            <table className='ListeMesures'>
                                <thead>
                                <tr>
                                    <th className='IdMesure'><a href="#link">ID interne</a></th>
                                    <th className='NomMesure'><a href="#link">Libellé</a></th>
                                    <th className='ActionMesure'><a href="#link">Action détaillée</a></th>
                                    <th className='MaturiteMEsure'><a href="#link">Maturité</a></th>
                                    <th className='PrioriteMesure'><a href="#link">Priorité</a></th>
                                    <th className='ComplexiteMesure'><a href="#link">Complexité</a></th>
                                    <th className='CoutProjetMesure'><a href="#link">Coût Projet (k€)</a></th>
                                    <th className='CoutRunMesure'><a href="#link">Coût Run (k€/an)</a></th>
                                    <th className='AideChiffrageMesure'><a href="#link">Aide au chiffrage</a></th>
                                    <th className='PorteurMesure'><a href="#link">Porteur</a></th>
                                    <th className='DateDebutMesure'><a href="#link">Date début</a></th>
                                    <th className='DateFinMesure'><a href="#link">Date fin</a></th>
                                    <th className='StatutMesure'><a href="#link">Statut</a></th>
                                    <th className='MacroMesure'><a href="#link">Macro projet</a></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {mesures.map((mesure) =>(
                                        <tr className="Cellule">
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextId' id='Case'>{mesure.Id}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextNom' id='Case'>{mesure.Nom}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextAction' id='Case'>{mesure.Action}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextMaturite' id='Case'>{mesure.Maturite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextPriorite' id='Case'>{mesure.Priorite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextComplexite' id='Case'>{mesure.Complexite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextStatut' id='Case'>{mesure.Statut}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextMacro' id='Case'>{mesure.Macro}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
        );

    }
    if(Type==2)
    {
        return (
            <div>
                <h1>TEST POUR PLAN D'ACTION (Anciennement Suivi)</h1>
                    <input type="text" name="Thing" onChange={Filtre}/>
                        <form>
                            <select value = {colonne} onChange={ChangeColonne}>
                                <option>ID Interne</option>
                                <option>Nom</option>
                                <option>Action</option>
                                <option>Maturité</option>
                                <option>Priorité</option>
                                <option>Complexité</option>
                                <option>Coût Projet (k€)</option>
                                <option>Coût Run (k€/an)</option>
                                <option>Aide au chiffrage</option>
                                <option>Porteur</option>
                                <option>Date début</option>
                                <option>Date fin</option>
                                <option>Statut</option>
                                <option>Macro projet</option>
                            </select>
                            </form>
                        <div className='pageMesure'>
                            <table className='ListeMesures'>
                                <thead>
                                <tr>
                                    <th className='IdMesure'><a href="#link">ID interne</a></th>
                                    <th className='NomMesure'><a href="#link">Libellé</a></th>
                                    <th className='ActionMesure'><a href="#link">Action détaillée</a></th>
                                    <th className='MaturiteMEsure'><a href="#link">Maturité</a></th>
                                    <th className='PrioriteMesure'><a href="#link">Priorité</a></th>
                                    <th className='ComplexiteMesure'><a href="#link">Complexité</a></th>
                                    <th className='CoutProjetMesure'><a href="#link">Coût Projet (k€)</a></th>
                                    <th className='CoutRunMesure'><a href="#link">Coût Run (k€/an)</a></th>
                                    <th className='AideChiffrageMesure'><a href="#link">Aide au chiffrage</a></th>
                                    <th className='PorteurMesure'><a href="#link">Porteur</a></th>
                                    <th className='DateDebutMesure'><a href="#link">Date début</a></th>
                                    <th className='DateFinMesure'><a href="#link">Date fin</a></th>
                                    <th className='StatutMesure'><a href="#link">Statut</a></th>
                                    <th className='MacroMesure'><a href="#link">Macro projet</a></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {filtreMesures.map((mesure) =>(
                                        <tr className="Cellule">
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextId' id='Case'>{mesure.Id}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextNom' id='Case'>{mesure.Nom}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextAction' id='Case'>{mesure.Action}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextMaturite' id='Case'>{mesure.Maturite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextPriorite' id='Case'>{mesure.Priorite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextComplexite' id='Case'>{mesure.Complexite}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextStatut' id='Case'>{mesure.Statut}</div>
                                            </td>
                                            <td id="CelluleMesure">
                                                <div contentEditable="true" className='TextMacro' id='Case'>{mesure.Macro}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
            </div>
        );
    }
    
};

export default Suivi;