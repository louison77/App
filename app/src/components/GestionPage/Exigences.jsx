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
  const baseUrl2 = '/api/Projet';
  const baseUrl3 = '/api/Mesure';
  const [isposted, setposted] = useState(false)
  //Tableau général de toutes les exigences
  const [code] = useOutletContext();
  const [length, setLength] = useState(0)
  const [exigences, setExigences] = useState([{
    exigenceid: "",
    Note: "",
    Maturite: "",
    Observation: "",
    Id: "",
    Nom: "",
    GuideAbrege: "",
    GuideComplet: "",
    SousExigences: "",
    Obj: "",
    Exigence: "",
  }]);
  //valeur tampon de l'exigence
  const [UneExigence, setUneExigence] = useState("");
  //booléen pour afficher la partie de droite
  const [isSeen, setisSeen] = useState(false);
  //open le bouton guide complet
  const [open, setOpen] = useState(false);
  //Id représentant l'exigence active
  const [activeID, setactiveID] = useState("");


  useEffect(() => {
    const excel = require('./iso27001-exigences.json')


    const getExigences = async () => {
      var baseExigences = []
      for (const element of excel) {
        baseExigences.push({
          Nom: element.Domaine,
          Exigence: element["Macro-exigence"],
          GuideAbrege: element.Exigence,
          GuideComplet: "",
          Obj: "",
          SousExigences: [{
            categorie: 1, sousId: element.Basique, index: 0, color: 0
          },
          { categorie: 2, sousId: element.Moyenne, index: 1, color: 0 },
          { categorie: 3, sousId: element.Elevée, index: 2, color: 0 },
          { categorie: 4, sousId: element["Très élevée"], index: 3, color: 0 },
          ]
        })
      }
      setLength(baseExigences.length)
      try {

        const response = await axios.get(`${baseUrl}`);
        const retrievedExigences = response.data.exigence;
        var tab = []
        let i = 0;
        retrievedExigences.forEach(exigence => {
          if (exigence.projetid === code) {
            const NewExigence = {
              exigenceid: exigence.exigenceid,
              Note: exigence.note,
              Maturite: exigence.maturite,
              Observation: exigence.observations,
              Id: "Exigence " + (i + 1).toString(),
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
              if (parseInt(a.Id.split(" ")[1]) < parseInt(b.Id.split(" ")[1])) {
                return -1;
              }
              if (parseInt(a.Id.split(" ")[1]) > parseInt(b.Id.split(" ")[1])) {
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
  }, [code, isposted]);
  //comportements
  const toggleVisibility = (event, ID) => {
    const Copy = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === ID) {
        Copy.push({
          exigenceid: exigences[i].exigenceid,
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

      for (let i = 0; i < length; i++) {
        try {
          await axios.post(`${baseUrl}`,
            {

              exigenceid: code + " " + (i + 1).toString(),
              projetid: code,
              observations: "Observations",
              maturite: "0",
              note: "0"
            }, {
            'Content-Type': 'application/json'
          },).then(function (response) {
            console.log(response);
          });
        }
        catch (error) {
          console.log(error.response.data)
        }
      }
      setposted(true)
    }
    const patchStatutProjet = async () => {
      try {

        await axios.patch(`${baseUrl2}`,
          {
            projetid: code,
            statutaudit: "En cours"
          }, {
          'Content-Type': 'application/json'
        })
      }
      catch (error) {
        console.log(error)
      }
    }

    sendexigences()
    patchStatutProjet();

  }
  //Changer valeur Observation
  const ModifyObserv = (event) => {
    const Copy = [];
    const Copy2 = [];
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === UneExigence[0].Id) {
        Copy.push({
          exigenceid: exigences[i].exigenceid,
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
      exigenceid: UneExigence[0].exigenceid,
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
        console.log(UneExigence[0].exigenceid)
        await axios.patch(`${baseUrl}`, {
          exigenceid: UneExigence[0].exigenceid,
          observations: UneExigence[0].Observation,
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
          exigenceid: exigences[i].exigenceid,
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
      exigenceid: UneExigence[0].exigenceid,
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
          exigenceid: exigences[i].exigenceid,
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
      exigenceid: UneExigence[0].exigenceid,
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
    const ChangeNote = async () => {
      try {
        console.log("ChangeNote " + UneExigence[0].exigenceid)
        await axios.patch(`${baseUrl}`, {
          exigenceid: UneExigence[0].exigenceid,
          note: event.target.value,
        }, {
          'Content-Type': 'application/json'
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    ChangeNote()
    event.preventDefault();
  };
  const ChangeMaturity = (value) => {
    const Copy = [];
    const Copy2 = [];
    const valeur = UneExigence[0].Maturite === value ? "0" : value
    for (let i = 0; i < exigences.length; i++) {
      if (exigences[i].Id === UneExigence[0].Id) {
        Copy.push({
          exigenceid: exigences[i].exigenceid,
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
      exigenceid: UneExigence[0].exigenceid,
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
    const UpdateMaturity = async () => {
      try {

        await axios.patch(`${baseUrl}`, {
          exigenceid: UneExigence[0].exigenceid,
          maturite: valeur,
        }, {
          'Content-Type': 'application/json'
        })
      }
      catch (error) {
        console.log(error)
      }
    }
    UpdateMaturity()

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
        exigenceid: exigences[index].exigenceid,
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
  const Sendmesures = () => {

    const EnvoyerMesures = async () => {
      for (let i = 0; i < UneExigence[0].SousExigences.length; i++) {

        if (UneExigence[0].SousExigences[i].color === 2) {
          try {
            await axios.post(`${baseUrl3}`,
              {
                mesureid: UneExigence[0].exigenceid + "." + (i + 1).toString(),
                projetid: code,
                priorite: "",
                complexite: "",
                cout: 0,
                porteur: "",
                debut: "",
                fin: "",
                statut: "",
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
      }
    }
    EnvoyerMesures()
  }
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
                    Macro-Exigence
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
                          <p>{exige.SousExigences[0].sousId} </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("2")}
                            checked={exige.Maturite === "2" ? true : false}
                          />
                          <p>{exige.SousExigences[1].sousId} </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("3")}
                            checked={exige.Maturite === "3" ? true : false}
                          />
                          <p>{exige.SousExigences[2].sousId} </p>
                        </div>
                      </td>
                      <td className="Case">
                        <div className="CaseTable">
                          <input
                            type="checkbox"
                            onClick={() => ChangeMaturity("4")}
                            checked={exige.Maturite === "4" ? true : false}
                          />
                          <p>{exige.SousExigences[3].sousId} </p>
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
                          Descriptif {" "}
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
                <div className="ButtonSendMesures">
                  <btn className="MesureButton" onClick={Sendmesures}>
                    Envoyer mesures au plan d'action
                  </btn>
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
