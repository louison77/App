import React from "react";
import { useState } from "react";
import "../../styles/components/GestionStyle/_mesures.css";

const Mesures = () => {
  //States
  const [mesures] = useState([
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

  return (
    <div>
      <h1 className="TITLE1">Plan d'actions</h1>
            <div className='pageMesure'>
                <table className='ListeMesures'>
                    <thead>
                    <tr>
                        <th className='IdMesure'><a href="#link">ID interne</a></th>
                        <th className='NomMesure'><a href="#link">Libellé</a></th>
                        <th className='ActionMesure'><a href="#link">Action détaillée</a></th>
                        <th className='MaturiteMEsure'><a href="#link">Maturité</a></th>
                        <th className='PrioriteMesure'><a href="#link">Priorité</a></th>
                        <th className='ComplexiteMesure'><a href="#link">Compléxité</a></th>
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
};

export default Mesures;
