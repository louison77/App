import React, { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../styles/components/GestionStyle/_mesures.css";
import axios from 'axios'

const Mesures = () => {

  const [Type, setType] = useState(1); /* 1 = la tableau de base, sans modifications, 2 = le tableau modifié, avec un filtre, un tri, ou les deux */

  const [TriId, setTriId] = useState("");
  const [TriNom, setTriNom] = useState("");
  const [TriAction, setTriAction] = useState("");
  const [TriMaturite, setTriMaturite] = useState("");
  const [TriPriorite, setTriPriorite] = useState("");
  const [TriComplexite, setTriComplexite] = useState("");
  const [TriCoutProjet, setTriCoutProjet] = useState("");
  const [TriCoutRun, setTriCoutRun] = useState("");
  const [TriAideChiffrage, setTriAideChiffrage] = useState("");
  const [TriPorteur, setTriPorteur] = useState("");
  const [TriDateDebut, setTriDateDebut] = useState("");
  const [TriDateFin, setTriDateFin] = useState("");
  const [TriStatut, setTriStatut] = useState("");
  const [TriMacro, setTriMacro] = useState("");
  const baseUrl = '/api/Mesure'
  const [code] = useOutletContext();
  const [change, setchange] = useState("")



  const [mesures, setmesures] = useState([
    {
      Id: "",
      Nom: "",
      Action: "​",
      Maturite: "",
      Priorite: "",
      Complexite: "",
      CoutProjet: "",
      CoutRun: "",
      AideChiffrage:
        "​",
      Porteur: "",
      DateDebut: "",
      DateFin: "",
      Statut: "",
      Macro: "",
      MesureID: ""
    }
  ]);
  useEffect(() => {
    const GetMesure = async () => {
      const excel = require('./iso27001-mesures.json')
      var BaseMesure = []
      for (const element of excel) {
        BaseMesure.push({
          Ref: element["Réf Exigence"].toString() + "." + element["Maturité"].toString(),
          Exigence: element.Exigence,
          Sousexigence: element["Sous-exigence"],
          Mesure: element.Mesure,
          AideChiffrage: element["Aide au chiffrage"]

        })

      }
      try {
        const response = await axios.get(`${baseUrl}`)
        const retrievedMesures = response.data.mesure;
        var tab = [];
        retrievedMesures.forEach(mesure => {

          if (mesure.projetid === code) {
            const index = (parseInt(mesure.mesureid.split(' ')[1][0]) * 4) + parseInt(mesure.mesureid.split(' ')[1][2]) - 5

            tab.push({
              Id: BaseMesure[index].Ref,
              Nom: BaseMesure[index].Exigence,
              Action: BaseMesure[index].Mesure,
              Maturite: BaseMesure[index].Ref[2],
              Priorite: mesure.priorite,
              Complexite: mesure.complexite,
              CoutProjet: mesure.cout,
              CoutRun: "",
              AideChiffrage: BaseMesure[index].AideChiffrage,
              Porteur: mesure.porteur,
              DateDebut: "",
              DateFin: "",
              Statut: mesure.statut,
              Macro: "",
              MesureID: mesure.mesureid,

            })

          }
        })

        setmesures(tab)
      }
      catch (error) {
        console.log(error)
      }
    }
    GetMesure()
  }, [code, change])
  const [modifMesures, setModifMesures] = useState([{}])

  const [colonne, setColonne] = useState("Libellé");

  /* function */
  const Filtre = (event) => {
    /* Valeur dans le champ du filtre : event.target.value */

    if (event.target.value === "") {
      setType(1); /* On fait réapparaître le tableau non filtré qui ne change jamais (car il sert de database locale)*/
    } else {
      const Copy = [];
      if (colonne === "ID Interne") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Id).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Libellé") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Nom).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Action") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Action).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Maturité") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Maturite).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Priorité") {
        for (let i = 0; i < mesures.length; i++) {
          if (mesures[i].Priorite.search((event.target.value).toUpperCase()) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Complexité") {
        for (let i = 0; i < mesures.length; i++) {
          if (mesures[i].Complexite === event.target.value) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Coût Projet (k€)") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].CoutProjet).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Coût Run (k€/an)") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].CoutRun).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Aide au chiffrage") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].AideChiffrage).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Porteur") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Porteur).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Date début") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].DateDebut).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Date fin") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].DateFin).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Statut") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Statut).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Macro projet") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Macro).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }

      setModifMesures(Copy);
      setType(2); /*On fait apparaître le tableau modifié */
    }

  };

  const ChangeColonne = (event) => {
    setColonne(event.target.value);
  }

  const sortCroissant = (arr, prop) => {
    arr.sort(
      function (a, b) {
        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }

  const sortDecroissant = (arr, prop) => {
    arr.sort(
      function (a, b) {
        if (a[prop] > b[prop]) {
          return -1;
        } else if (a[prop] < b[prop]) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }

  const sortCroissantNombre = (arr, prop) => {
    arr.sort(
      function (a, b) {
        if (parseFloat(a[prop]) < parseFloat(b[prop])) {
          return -1;
        } else if (parseFloat(a[prop]) > parseFloat(b[prop])) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }

  const sortDecroissantNombre = (arr, prop) => {
    arr.sort(
      function (a, b) {
        if (parseFloat(a[prop]) > parseFloat(b[prop])) {
          return -1;
        } else if (parseFloat(a[prop]) < parseFloat(b[prop])) {
          return 1;
        } else {
          return 0;
        }
      }
    );
  }

  const resetTriangles = () => { /* On reset tous les triangles d'indication de tri pour plus de clarté */
    setTriId("");
    setTriNom("");
    setTriAction("");
    setTriMaturite("");
    setTriPriorite("");
    setTriComplexite("");
    setTriCoutProjet("");
    setTriCoutRun("");
    setTriAideChiffrage("");
    setTriPorteur("");
    setTriDateDebut("");
    setTriDateFin("");
    setTriStatut("");
    setTriMacro("");
  }

  const Tri = (event, colonne) => {
    const Copy = [];
    /* On copie tout le tableau: mesures si il n'y a pas de filtre, modifMesures si il y a un filtre */
    if (Type === 1) {
      for (let i = 0; i < mesures.length; i++) {
        Copy.push(mesures[i]);
      }
    } else if (Type === 2) {
      for (let i = 0; i < modifMesures.length; i++) {
        Copy.push(modifMesures[i]);
      }
    }

    if (colonne === "Id") {
      resetTriangles();
      if (TriId === "▲") {
        sortCroissant(Copy, "Id");
        setTriId("▼");
      } else { /* chemin par défaut, on suppose qu'on veut les maximum au premier clique plutôt que les minimums */
        sortDecroissant(Copy, "Id");
        setTriId("▲");
      }
    }

    if (colonne === "Nom") {
      resetTriangles();
      if (TriNom === "▲") {
        sortCroissant(Copy, "Nom");
        setTriNom("▼");
      } else {
        sortDecroissant(Copy, "Nom");
        setTriNom("▲");
      }
    }

    if (colonne === "Action") {
      resetTriangles();
      if (TriAction === "▲") {
        sortCroissant(Copy, "Action");
        setTriAction("▼");
      } else {
        sortDecroissant(Copy, "Action");
        setTriAction("▲");
      }
    }

    if (colonne === "Maturite") {
      resetTriangles();
      if (TriMaturite === "▲") {
        sortCroissant(Copy, "Maturite");
        setTriMaturite("▼");
      } else {
        sortDecroissant(Copy, "Maturite");
        setTriMaturite("▲");
      }
    }

    if (colonne === "Priorite") {
      resetTriangles();
      if (TriPriorite === "▲") {
        sortCroissant(Copy, "Priorite");
        setTriPriorite("▼");
      } else {
        sortDecroissant(Copy, "Priorite");
        setTriPriorite("▲");
      }
    }

    if (colonne === "Complexite") {
      resetTriangles();
      if (TriComplexite === "▲") {
        sortCroissant(Copy, "Complexite");
        setTriComplexite("▼");
      } else {
        sortDecroissant(Copy, "Complexite");
        setTriComplexite("▲");
      }
    }

    if (colonne === "Cout Projet") {
      resetTriangles();
      if (TriCoutProjet === "▲") {
        sortCroissantNombre(Copy, "CoutProjet");
        setTriCoutProjet("▼");
      } else {
        sortDecroissantNombre(Copy, "CoutProjet");
        setTriCoutProjet("▲");
      }
    }

    if (colonne === "Cout Run") {
      resetTriangles();
      if (TriCoutRun === "▲") {
        sortCroissantNombre(Copy, "CoutRun");
        setTriCoutRun("▼");
      } else {
        sortDecroissantNombre(Copy, "CoutRun");
        setTriCoutRun("▲");
      }
    }

    if (colonne === "Aide Chiffrage") {
      resetTriangles();
      if (TriAideChiffrage === "▲") {
        sortCroissant(Copy, "AideChiffrage");
        setTriAideChiffrage("▼");
      } else {
        sortDecroissant(Copy, "AideChiffrage");
        setTriAideChiffrage("▲");
      }
    }

    if (colonne === "Porteur") {
      resetTriangles();
      if (TriPorteur === "▲") {
        sortCroissant(Copy, "Porteur");
        setTriPorteur("▼");
      } else {
        sortDecroissant(Copy, "Porteur");
        setTriPorteur("▲");
      }
    }

    if (colonne === "Date Debut") {
      resetTriangles();
      if (TriDateDebut === "▲") {
        sortCroissant(Copy, "DateDebut");
        setTriDateDebut("▼");
      } else {
        sortDecroissant(Copy, "DateDebut");
        setTriDateDebut("▲");
      }
    }

    if (colonne === "Date Fin") {
      resetTriangles();
      if (TriDateFin === "▲") {
        sortCroissant(Copy, "DateFin");
        setTriDateFin("▼");
      } else {
        sortDecroissant(Copy, "DateFin");
        setTriDateFin("▲");
      }
    }

    if (colonne === "Statut") {
      resetTriangles();
      if (TriStatut === "▲") {
        sortCroissant(Copy, "Statut");
        setTriStatut("▼");
      } else {
        sortDecroissant(Copy, "Statut");
        setTriStatut("▲");
      }
    }

    if (colonne === "Macro") {
      resetTriangles();
      if (TriMacro === "▲") {
        sortCroissant(Copy, "Macro");
        setTriMacro("▼");
      } else {
        sortDecroissant(Copy, "Macro");
        setTriMacro("▲");
      }
    }

    setModifMesures(Copy);
    setType(2); /*On fait apparaître le tableau modifié */
  }
  const SendContent = (e, id, number) => {

    const valuetoChange = e.currentTarget.textContent;
    const sendelement = async () => {
      try {
        if (number === 1) {

          setchange("1")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              priorite: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })
        }

        if (number === 2) {
          setchange("2")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              complexite: valuetoChange,

            }, {
            'Content-Type': 'application/json'
          })
        }

        if (number === 3) {
          setchange("3")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              cout: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })

        }

        if (number === 4) {
          setchange("4")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              porteur: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })
        }

        if (number === 5) {
          setchange("5")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              statut: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })
        }

        if (number === 6) {
          setchange("6")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              debut: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })
        }

        if (number === 7) {
          setchange("7")
          axios.patch(`${baseUrl}`,
            {
              mesureid: id,
              fin: valuetoChange

            }, {
            'Content-Type': 'application/json'
          })
        }

      }


      catch (error) {
        console.log(error)
      }
    }
    sendelement()
  }


  if (Type === 1) {
    return (
      <div>
        <h1 className="TITLEMESURE">Plan d'actions</h1>
        <form>
          <input id="Filtre" type="text" name="Thing" onChange={Filtre} />
          <select id="ChoixFiltre" value={colonne} onChange={ChangeColonne}>
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
                <th id="TitreMesure" className='IdMesure' onClick={(e) => Tri(e, "Id")}>ID interne</th>
                <th id="TitreMesure" className='NomMesure' onClick={(e) => Tri(e, "Nom")}>Libellé</th>
                <th id="TitreMesure" className='ActionMesure' onClick={(e) => Tri(e, "Action")}>Action détaillée</th>
                <th id="TitreMesure" className='MaturiteMEsure' onClick={(e) => Tri(e, "Maturite")}>Maturité</th>
                <th id="TitreMesure" className='PrioriteMesure' onClick={(e) => Tri(e, "Priorite")}>Priorité</th>
                <th id="TitreMesure" className='ComplexiteMesure' onClick={(e) => Tri(e, "Complexite")}>Complexité</th>
                <th id="TitreMesure" className='CoutProjetMesure' onClick={(e) => Tri(e, "Cout Projet")}>Coût Projet (k€)</th>
                <th id="TitreMesure" className='CoutRunMesure' onClick={(e) => Tri(e, "Cout Run")}>Coût Run (k€/an)</th>
                <th id="TitreMesure" className='AideChiffrageMesure' onClick={(e) => Tri(e, "Aide Chiffrage")}>Aide au chiffrage</th>
                <th id="TitreMesure" className='PorteurMesure' onClick={(e) => Tri(e, "Porteur")}>Porteur</th>
                <th id="TitreMesure" className='DateDebutMesure' onClick={(e) => Tri(e, "Date Debut")}>Date début</th>
                <th id="TitreMesure" className='DateFinMesure' onClick={(e) => Tri(e, "Date Fin")}>Date fin</th>
                <th id="TitreMesure" className='StatutMesure' onClick={(e) => Tri(e, "Statut")}>Statut</th>
                <th id="TitreMesure" className='MacroMesure' onClick={(e) => Tri(e, "Macro")}>Macro projet</th>
              </tr>
            </thead>
            <tbody>
              {mesures.map((mesure) => (
                <tr className="Cellule">
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextId' id='Case'>{mesure.Id}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextNom' id='Case'>{mesure.Nom}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAction' id='Case'>{mesure.Action}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextMaturite' id='Case'>{mesure.Maturite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 1)} className='TextPriorite' id='Case'>{mesure.Priorite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 2)} className='TextComplexite' id='Case'>{mesure.Complexite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 3)} className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 4)} className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 6)} className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 7)} className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 5)} className='TextStatut' id='Case'>{mesure.Statut}</div>
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
  if (Type === 2) {
    return (
      <div>
        <h1 className="TITLEMESURE">Plan d'actions</h1>
        <form>
          <input id="Filtre" type="text" name="Thing" onChange={Filtre} />
          <select id="ChoixFiltre" value={colonne} onChange={ChangeColonne}>
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
                <th id="TitreMesure" className='IdMesure' onClick={(e) => Tri(e, "Id")}>ID interne <span id="Triangle">{TriId}</span></th>
                <th id="TitreMesure" className='NomMesure' onClick={(e) => Tri(e, "Nom")}>Libellé <span id="Triangle">{TriNom}</span></th>
                <th id="TitreMesure" className='ActionMesure' onClick={(e) => Tri(e, "Action")}>Action détaillée <span id="Triangle">{TriAction}</span></th>
                <th id="TitreMesure" className='MaturiteMEsure' onClick={(e) => Tri(e, "Maturite")}>Maturité <span id="Triangle">{TriMaturite}</span></th>
                <th id="TitreMesure" className='PrioriteMesure' onClick={(e) => Tri(e, "Priorite")}>Priorité <span id="Triangle">{TriPriorite}</span></th>
                <th id="TitreMesure" className='ComplexiteMesure' onClick={(e) => Tri(e, "Complexite")}>Complexité <span id="Triangle">{TriComplexite}</span></th>
                <th id="TitreMesure" className='CoutProjetMesure' onClick={(e) => Tri(e, "Cout Projet")}>Coût Projet (k€) <span id="Triangle">{TriCoutProjet}</span></th>
                <th id="TitreMesure" className='CoutRunMesure' onClick={(e) => Tri(e, "Cout Run")}>Coût Run (k€/an) <span id="Triangle">{TriCoutRun}</span></th>
                <th id="TitreMesure" className='AideChiffrageMesure' onClick={(e) => Tri(e, "Aide Chiffrage")}>Aide au chiffrage <span id="Triangle">{TriAideChiffrage}</span></th>
                <th id="TitreMesure" className='PorteurMesure' onClick={(e) => Tri(e, "Porteur")}>Porteur <span id="Triangle">{TriPorteur}</span></th>
                <th id="TitreMesure" className='DateDebutMesure' onClick={(e) => Tri(e, "Date Debut")}>Date début <span id="Triangle">{TriDateDebut}</span></th>
                <th id="TitreMesure" className='DateFinMesure' onClick={(e) => Tri(e, "Date Fin")}>Date fin <span id="Triangle">{TriDateFin}</span></th>
                <th id="TitreMesure" className='StatutMesure' onClick={(e) => Tri(e, "Statut")}>Statut <span id="Triangle">{TriStatut}</span></th>
                <th id="TitreMesure" className='MacroMesure' onClick={(e) => Tri(e, "Macro")}>Macro projet <span id="Triangle">{TriMacro}</span></th>
              </tr>
            </thead>
            <tbody>
              {modifMesures.map((mesure) => (
                <tr className="Cellule">
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextId' id='Case'>{mesure.Id}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextNom' id='Case'>{mesure.Nom}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAction' id='Case'>{mesure.Action}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextMaturite' id='Case'>{mesure.Maturite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 1)} className='TextPriorite' id='Case'>{mesure.Priorite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 2)} className='TextComplexite' id='Case'>{mesure.Complexite}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 3)} className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 4)} className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 6)} className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 7)} className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="true" onBlur={e => SendContent(e, mesure.MesureID, 5)} className='TextStatut' id='Case'>{mesure.Statut}</div>
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

export default Mesures;
