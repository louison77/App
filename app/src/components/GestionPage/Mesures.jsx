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

      <div className="pageMesure">
        <table className="ListeMesures">
          <thead>
            <tr>
              <th className="IdMesure">ID interne</th>
              <th className="NomMesure">Libellé</th>
              <th className="ActionMesure">Action détaillée</th>
              <th className="MaturiteMEsure">Maturité</th>
              <th className="PrioriteMesure">Priorité</th>
              <th className="ComplexiteMesure">Compléxité</th>
              <th className="CoutProjetMesure">Coût Projet (k€)</th>
              <th className="CoutRunMesure">Coût Run (k€/an)</th>
              <th className="AideChiffrageMesure">Aide au chiffrage</th>
              <th className="PorteurMesure">Porteur</th>
              <th className="DateDebutMesure">Date début</th>
              <th className="DateFinMesure">Date fin</th>
              <th className="StatutMesure">Statut</th>
              <th className="MacroMesure">Macro projet</th>
            </tr>
          </thead>
          <tbody>
            {mesures.map((mesure) => (
              <tr>
                <td>{mesure.Id}</td>
                <td>{mesure.Nom}</td>
                <td>{mesure.Action}</td>
                <td>{mesure.Maturite}</td>
                <td>{mesure.Priorite}</td>
                <td>{mesure.Complexite}</td>
                <td>{mesure.CoutProjet}</td>
                <td>{mesure.CoutRun}</td>
                <td>{mesure.AideChiffrage}</td>
                <td>{mesure.Porteur}</td>
                <td>{mesure.DateDebut}</td>
                <td>{mesure.DateFin}</td>
                <td>{mesure.Statut}</td>
                <td>{mesure.Macro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mesures;
