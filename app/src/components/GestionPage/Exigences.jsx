import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import TableauNiveau from "./TableauNiveau";
import "../../styles/components/GestionStyle/_exigences.css";

const Exigences = () => {
  //Savoir quel bouton est cliqué
  const [clickedButon, setclickedButton] = useState("");

  //Tableau général de toutes les exigences
  const [exigences, setExigences] = useState([
    {
      Id: "ORG 5.08",
      Nom: "Sécurité de l'information",
      Exigence: "Assure blabla",
      GuideComplet:
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamusterry richardson ad squid. Nihil anim keffiyeh helvetica, craft beerlabore wes anderson cred nesciunt sapiente ea proident. ",
      GuideAbrege:
        "Doit inclure <br/> ​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb) évaluation et traitement des risques de sécurité de l'information lors du projet\n​c) évaluation et traitement des risques de sécurité de l'information une fois le projet mis en place​d) tests des mesures de sécurité en pace​e) intégration de la sécurité de l'information au sein de toutes les phases de la méthodologie projet​",
      Obj: "Objectif 5.08",
      Observation: "Observations",
      SousExigences: [
        { categorie: 1, sousId: "5.08.1.1", index: 0, color: 0 },
        { categorie: 1, sousId: "5.08.1.2", index: 1, color: 0 },
        { categorie: 2, sousId: "5.08.2.1", index: 2, color: 0 },
      ],
      Note: "0",
    },
    {
      Id: "ORG 5.09",
      Nom: "Sécurité Gestion",
      Exigence: "Réalise machin",
      GuideComplet: "fhqhhf",
      GuideAbrege:
        "Doit inclure\n​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb)",
      Obj: "Objectif 5.09",
      Observation: "Observations",
      SousExigences: [
        { categorie: 1, sousId: "5.08.1.1", index: 0, color: 0 },
        { categorie: 1, sousId: "5.08.1.2", index: 1, color: 0 },
        { categorie: 2, sousId: "5.08.2.1", index: 2, color: 0 },
        { categorie: 3, sousId: "5.08.3.1", index: 3, color: 0 },
      ],
      Note: "0",
    },
    {
      Id: "ORG 5.10",
      Nom: "Sécurité réseau",
      Exigence: "Gère le réseau de l'entreprise",
      GuideComplet: "fffff",
      GuideAbrege:
        "Doit inclure\n​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb)",
      Obj: "Objectif 5.10",
      Observation: "Observations",
      SousExigences: [
        {
          categorie: 1,
          sousId: "5.08.1.1",
          index: 0,
          color: 0,
        },
        {
          categorie: 1,
          sousId: "5.08.1.2",
          index: 1,
          color: 0,
        },
        {
          categorie: 2,
          sousId: "5.08.2.1",
          index: 2,
          color: 0,
        },
      ],
      Note: "0",
    },
  ]);
  //valeur tampon de l'exigence
  const [UneExigence, setUneExigence] = useState("");
  //booléen pour afficher la partie de droite
  const [isSeen, setisSeen] = useState(false);
  //open le bouton guide complet
  const [open, setOpen] = useState(false);
  //Id représentant l'exigence active
  const [activeID, setactiveID] = useState("");
  //comportements
  const toggleVisibility = (event, ID) => {
    const Copy = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === ID) {
        Copy.push({
          Id: exigences[i].Id,
          Nom: exigences[i].Nom,
          Exigence: exigences[i].Exigence,
          GuideComplet: exigences[i].GuideComplet,
          GuideAbrege: exigences[i].GuideAbrege,
          Obj: exigences[i].Obj,
          Observation: exigences[i].Observation,
          SousExigences: exigences[i].SousExigences,
          Note: exigences[i].Note,
        });
      }
      console.log(UneExigence);
    }
    setUneExigence(Copy);
    const value = true;
    setisSeen(value);
    setactiveID(ID);
    setOpen(false);
  };
  //Changer valeur Observation
  const ModifyObserv = (event) => {
    const Copy = [];
    const Copy2 = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === UneExigence[0].Id) {
        Copy.push({
          Id: exigences[i].Id,
          Nom: exigences[i].Nom,
          Exigence: exigences[i].Exigence,
          GuideComplet: exigences[i].GuideComplet,
          GuideAbrege: exigences[i].GuideAbrege,
          Obj: exigences[i].Obj,
          Observation: event.target.value,
          SousExigences: exigences[i].SousExigences,
          Note: exigences[i].Note,
        });
      } else {
        Copy.push(exigences[i]);
      }
    }
    Copy2.push({
      Id: UneExigence[0].Id,
      Nom: UneExigence[0].Nom,
      Exigence: UneExigence[0].Exigence,
      GuideComplet: UneExigence[0].GuideComplet,
      GuideAbrege: UneExigence[0].GuideAbrege,
      Obj: UneExigence[0].Obj,
      Observation: event.target.value,
      SousExigences: UneExigence[0].SousExigences,
      Note: UneExigence[0].Note,
    });
    setUneExigence(Copy2);
    setExigences(Copy);
    event.preventDefault();
  };

  const ChangeColor = (count, Index) => {
    console.log(Index);
    console.log(count);
    console.log(UneExigence[0].SousExigences);
    //On créer deux variable tampon pour les futures UneExigence et exigences
    const Copy = [];
    const Copy2 = [];
    //Tabcol prend la valeur de Sousexigences
    let Tabcol = UneExigence[0].SousExigences;

    Tabcol[Index].color = count;
    console.log(Tabcol);
    //Pour chaque valeur de exigences on la push dans Copy et on modifie seulement le bon color
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === UneExigence[0].Id) {
        Copy.push({
          Id: exigences[i].Id,
          Nom: exigences[i].Nom,
          Exigence: exigences[i].Exigence,
          GuideComplet: exigences[i].GuideComplet,
          GuideAbrege: exigences[i].GuideAbrege,
          Obj: exigences[i].Obj,
          Observation: exigences[i].Observation,
          SousExigences: Tabcol,
          Note: exigences[i].Note,
        });
      } else {
        Copy.push(exigences[i]);
      }
    }
    //On fait pareil pour UneExigence dans Copy2
    Copy2.push({
      Id: UneExigence[0].Id,
      Nom: UneExigence[0].Nom,
      Exigence: UneExigence[0].Exigence,
      GuideComplet: UneExigence[0].GuideComplet,
      GuideAbrege: UneExigence[0].GuideAbrege,
      Obj: UneExigence[0].Obj,
      Observation: UneExigence[0].Observation,
      SousExigences: Tabcol,
      Note: UneExigence[0].Note,
    });
    //On utilise le seter pour modifie l'etat des deux variables
    setUneExigence(Copy2);
    setExigences(Copy);
    setclickedButton(UneExigence[0].SousExigences[Index].sousId);

    console.log(UneExigence[0]);
  };
  const SubmitNote = (event) => {
    const Copy = [];
    const Copy2 = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === UneExigence[0].Id) {
        Copy.push({
          Id: exigences[i].Id,
          Nom: exigences[i].Nom,
          Exigence: exigences[i].Exigence,
          GuideComplet: exigences[i].GuideComplet,
          GuideAbrege: exigences[i].GuideAbrege,
          Obj: exigences[i].Obj,
          Observation: exigences[i].Observation,
          SousExigences: exigences[i].SousExigences,
          Note: event.target.value,
        });
      } else {
        Copy.push(exigences[i]);
      }
    }
    Copy2.push({
      Id: UneExigence[0].Id,
      Nom: UneExigence[0].Nom,
      Exigence: UneExigence[0].Exigence,
      GuideComplet: UneExigence[0].GuideComplet,
      GuideAbrege: UneExigence[0].GuideAbrege,
      Obj: UneExigence[0].Obj,
      Observation: UneExigence[0].Observation,
      SousExigences: UneExigence[0].SousExigences,
      Note: event.target.value,
    });
    setUneExigence(Copy2);
    setExigences(Copy);
    event.preventDefault();
  };
  if (isSeen) {
    return (
      <div className="page">
        <div className="BarreDéroulé">
          {exigences.map((exige) => (
            <h5
              className={
                activeID === exige.Id ? "OrangeExigence" : "BlackExigences"
              }
              onClick={(e) => toggleVisibility(e, exige.Id)}
            >
              {exige.Id}
            </h5>
          ))}
        </div>

        <div className="ExigenceDescription">
          <h1 className="TITLE">Exigences</h1>

          {UneExigence.map((exige) => (
            <div>
              <h3>
                {exige.Id} | {exige.Nom}
              </h3>
              <div className="Exigences_parties">
                <div className="Part1">
                  <h4 className="NamePart">
                    Exigences
                    <br />
                  </h4>
                  <span className="TexteParties">
                    {exige.Exigence}
                    <br />
                  </span>
                  <div className="GuidePart">
                    <Button
                      className="GuideBtn"
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                    >
                      +
                    </Button>
                    <h4 className="NamePart">
                      Guide Complet
                      <br />
                    </h4>
                  </div>
                  <Collapse in={open}>
                    <div className="CollapseText" id="example-collapse-text">
                      {exige.GuideComplet}
                    </div>
                  </Collapse>

                  <h4 className="NamePart">
                    Guide Abrégé
                    <br />
                  </h4>
                  <div className="TexteGuideAbregee">
                    <span>{exige.GuideAbrege}</span>
                  </div>
                </div>

                <div className="Part2">
                  <div>
                    <h4 className="NamePart">
                      Objectif
                      <br />
                    </h4>
                    <span className="TexteParties">
                      {exige.Obj}
                      <br />
                    </span>

                    <h4 className="NamePart">Observations de l'auditeur</h4>
                    <div className="FormObserv">
                      <form action="" accept="sentences">
                        <textarea
                          className="TextArea"
                          bords="arrondis"
                          value={exige.Observation}
                          type="textarea"
                          onChange={ModifyObserv}
                        ></textarea>
                        <button Classname="BoutonObserv" onClick={ModifyObserv}>
                          Ajouter Observations
                        </button>
                      </form>
                    </div>
                    <h4 className="NamePart">Note de conformité</h4>
                    <div>
                      <form>
                        <select value={exige.Note} onChange={SubmitNote}>
                          <option value="0">0</option>
                          <option value="0.5">0.5</option>
                          <option value="1">1</option>
                        </select>
                      </form>
                      <h5>La note actuelle est {exige.Note}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="SelectionMesures">
                <h4 className="NamePart">Evaluation de la maturité </h4>
                <TableauNiveau />
                <h4 className="NamePart">Aide à la sélection de mesures</h4>
                <div className="AffectationMesures">
                  <div className="ChoixSousExigences">
                    {exige.SousExigences.map((sentence) => (
                      <div className="SousExigenceRow">
                        <text
                          className="CategorieSousId"
                          style={{
                            color:
                              sentence.categorie === 1
                                ? "red"
                                : sentence.categorie === 2
                                ? "gold"
                                : sentence.categorie === 3
                                ? "pink"
                                : "lightgreen",
                          }}
                        >
                          ({sentence.categorie})
                        </text>
                        <text className="DescriptifSE">
                          {" "}
                          Descriptif {sentence.sousId}{" "}
                        </text>
                        <button
                          className="BoutonOk"
                          onClick={() => ChangeColor(1, sentence.index)}
                          style={{
                            backgroundColor:
                              sentence.color === 1 ? "Green" : "lightgray",
                          }}
                        >
                          OK
                        </button>
                        <button
                          className="BoutonNok"
                          onClick={() => ChangeColor(2, sentence.index)}
                          value={sentence.color}
                          style={{
                            backgroundColor:
                              sentence.color === 2 ? "Red" : "lightgray",
                          }}
                        >
                          NOk
                        </button>
                        <button
                          className="BoutonNA"
                          onClick={() => ChangeColor(3, sentence.index)}
                          style={{
                            backgroundColor:
                              sentence.color === 3 ? "Gray" : "lightgray",
                          }}
                        >
                          N/A
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="page">
          <div className="BarreDéroulé">
            <DropdownButton className="dropbtn" title="Exigences">
              {exigences.map((exige) => (
                <Dropdown.Item onClick={(e) => toggleVisibility(e, exige.Id)}>
                  {exige.Id}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
};

export default Exigences;
