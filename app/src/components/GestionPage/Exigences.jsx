import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/GestionStyle/_exigences.css";

const Exigences = () => {
  const baseUrl = '/api/Exigence';
  //Tableau général de toutes les exigences
  const [code] = useOutletContext();
  const baseExigences = [{
    Nom: "Libelle 1",
    Exigence: "",
    GuideComplet: "Guidecomplet1",
    GuideAbrege: "Guideabrege1",
    Obj: "obj1",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  },
  {
    Nom: "Libelle 2",
    Exigence: "",
    GuideComplet: "Guidecomplet2",
    GuideAbrege: "Guideabrege2",
    Obj: "obj2",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  }, {
    Nom: "Libelle 3",
    Exigence: "",
    GuideComplet: "Guidecomplet3",
    GuideAbrege: "Guideabrege3",
    Obj: "obj3",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  },
  {
    Nom: "Libelle 4",
    Exigence: "",
    GuideComplet: "Guidecomplet4",
    GuideAbrege: "Guideabrege4",
    Obj: "obj4",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  }, {
    Nom: "Libelle 5",
    Exigence: "",
    GuideComplet: "Guidecomplet5",
    GuideAbrege: "Guideabrege5",
    Obj: "obj5",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  }, {
    Nom: "Libelle 6",
    Exigence: "",
    GuideComplet: "Guidecomplet6",
    GuideAbrege: "Guideabrege6",
    Obj: "obj6",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  }, {
    Nom: "Libelle 7",
    Exigence: "",
    GuideComplet: "Guidecomplet7",
    GuideAbrege: "Guideabrege7",
    Obj: "obj7s",
    SousExigences: [
      {
        categorie: 1, sousId: "1.1", index: 0, color: 0
      },
      { categorie: 2, sousId: "1.2", index: 1, color: 0 },
      { categorie: 3, sousId: "1.3", index: 2, color: 0 },
      { categorie: 4, sousId: "1.4", index: 3, color: 0 },

    ],
  }]
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
      Maturite: "0",
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
      Maturite: "0",
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
      Maturite: "0",
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


  useEffect(() => {
    const getExigences = async () => {
      try {

        const response = await axios.get(`${baseUrl}`);
        const retrievedExigences = response.data.exigence;
        var tab = []
        let i = 0;
        retrievedExigences.forEach(exigence => {


          if (exigence.projetid === code) {
            const NewExigence = {
              Note: exigence.note,
              Maturite: exigence.maturite,
              Observation: exigence.observations,
              Id: exigence.exigencenom,
              Nom: baseExigences[i].Nom,
              GuideAbrege: baseExigences[i].GuideAbrege,
              GuideComplet: baseExigences[i].GuideComplet,
              SousExigences: baseExigences[i].SousExigences,
              Obj: baseExigences[i].Obj,
              Exigence: baseExigences[i].Exigence
            }
            i++
            tab.push(NewExigence);
            tab.sort(function compare(a, b) {
              if (a.Id < b.Id) {
                return -1;
              }
              if (a.Id > b.Id) {
                return 1;
              }
              return 0;
            })
          }
        },

          setExigences(tab));
      }
      catch (error) {
        console.log(error)
      }
    }
    getExigences();
  }, []);
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
          Maturite: exigences[i].Maturite,
        });
      }
    }
    setUneExigence(Copy);
    const value = true;
    setisSeen(value);
    setactiveID(ID);
    setOpen(false);
  };
  const CreateExigences = () => {

    const sendexigences = async () => {
      for (let i = 0; i < baseExigences.length; i++) {
        try {

          await axios.post(`${baseUrl}`,
            {

              exigenceid: code + " " + (i + 1).toString(),
              exigencenom: "Exigence " + i.toString(),
              projetid: code,
              observations: "Observations",
              maturite: "0",
              note: "0"
            }, {
            'Content-Type': 'application/json'
          });
        }
        catch (error) {
          console.log(error.response.data)
        }
      }
    }
    sendexigences()
  }
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
          Maturite: exigences[i].Maturite,
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
      Maturite: UneExigence[0].Maturite,
    });
    setUneExigence(Copy2);
    setExigences(Copy);
    event.preventDefault();
  };
  const PatchObservations = (e) => {
    e.preventDefault();
    const sendRequest = async () => {
      try {
        await axios.patch(`${baseUrl}`, {
          observation: UneExigence[0].Observation,
        }, {
          'Content-Type': 'application/json'
        })
      }
      catch (error) {
        console.log(error)
      }

    }
    sendRequest()
  }

  const ChangeColor = (count, Index) => {
    //On créer deux variable tampon pour les futures UneExigence et exigences
    const Copy = [];
    const Copy2 = [];
    //Tabcol prend la valeur de Sousexigences
    let Tabcol = UneExigence[0].SousExigences;

    Tabcol[Index].color = count;

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
          Maturite: exigences[i].Maturite,
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
      Maturite: UneExigence[0].Maturite,
    });
    //On utilise le seter pour modifie l'etat des deux variables
    setUneExigence(Copy2);
    setExigences(Copy);
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
          Maturite: exigences[i].Maturite,
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
      Maturite: UneExigence[0].Maturite,
    });
    setUneExigence(Copy2);
    setExigences(Copy);
    event.preventDefault();
  };
  const ChangeMaturity = (value) => {
    const Copy = [];
    const Copy2 = [];
    const valeur = UneExigence[0].Maturite === value ? "0" : value
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
          Note: exigences[i].Note,
          Maturite: valeur,
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
      Note: UneExigence[0].Note,
      Maturite: valeur,
    });
    setUneExigence(Copy2);
    setExigences(Copy);
  };
  const ChangeExigence = (iter, ID) => {
    let index = 0;
    const Copy = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === ID) {
        index = i + iter;
      }
    }
    if (index >= 0 && index < exigences.length) {
      Copy.push({
        Id: exigences[index].Id,
        Nom: exigences[index].Nom,
        Exigence: exigences[index].Exigence,
        GuideComplet: exigences[index].GuideComplet,
        GuideAbrege: exigences[index].GuideAbrege,
        Obj: exigences[index].Obj,
        Observation: exigences[index].Observation,
        SousExigences: exigences[index].SousExigences,
        Note: exigences[index].Note,
        Maturite: exigences[index].Maturite,
      });
      setUneExigence(Copy);

      setactiveID(exigences[index].Id);
      setOpen(false);
    }
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
          <div className="FirstLine">
            <h1 className="TITLE">Exigences</h1>
            <div className="Arrows">
              <button
                className="ArrowLeft"
                onClick={() => ChangeExigence(-1, UneExigence[0].Id)}
              >
                <ion-icon size="large" name="chevron-back-outline"></ion-icon>
              </button>

              <button
                className="ArrowRight"
                onClick={() => ChangeExigence(1, UneExigence[0].Id)}
              >
                <ion-icon
                  size="large"
                  name="chevron-forward-outline"
                ></ion-icon>
              </button>
            </div>
          </div>

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
                        <button classname="BoutonObserv" onClick={PatchObservations}>
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
                <table className="ChoixNiveaux">
                  <thead>
                    <tr>
                      <th className="Basique">Basique</th>
                      <th className="Moyenne">Moyenne</th>
                      <th className="Elevee">Elevée</th>
                      <th className="Televee">Très élevée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("1")}
                            checked={exige.Maturite === "1" ? true : false}
                          />
                          <p>Texte Basique niveau </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("2")}
                            checked={exige.Maturite === "2" ? true : false}
                          />
                          <p>Texte Moyen niveau </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("3")}
                            checked={exige.Maturite === "3" ? true : false}
                          />
                          <p>Texte Elevee niveau </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("4")}
                            checked={exige.Maturite === "4" ? true : false}
                          />
                          <p>Texte Très Elevée niveau </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          <div>
            <btn onClick={CreateExigences}>Iso 27001</btn>
          </div>
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
        </div>
      </div>
    );
  }
};

export default Exigences;
