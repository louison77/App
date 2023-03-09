import React, { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../styles/components/GestionStyle/_mesures.css";
import axios from 'axios'
import Confirmation from "../AccueilPage/Confirmation";

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
  const baseUrl2 = '/api/Exigence'
  const baseUrl3 = '/api/Projet'
  const [code] = useOutletContext();
  const [statutP, setstatutP] = useState("")
  const [change, setchange] = useState("")
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
  const handleDelete = (id) => {
    if (statutP !== "Terminé") {
      HandleConfirmation("Voulez-vous supprimer cette mesure?", true, id);
    }


  }

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
      AideChiffrage: "​",
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
            for (let i = 0; i < BaseMesure.length; i++) {
              if (BaseMesure[i].Ref === mesure.mesureid.split(' ')[1]) {

                tab.push({
                  Id: BaseMesure[i].Ref,
                  Nom: BaseMesure[i].Exigence,
                  Action: BaseMesure[i].Mesure,
                  Maturite: BaseMesure[i].Ref[BaseMesure[i].Ref.length - 1],
                  Priorite: mesure.priorite,
                  Complexite: mesure.complexite,
                  CoutProjet: mesure.cout,
                  CoutRun: mesure.coutrun,
                  AideChiffrage: BaseMesure[i].AideChiffrage,
                  Porteur: mesure.porteur,
                  DateDebut: mesure.debut,
                  DateFin: mesure.fin,
                  Statut: mesure.statut,
                  Macro: mesure.Macro,
                  MesureID: mesure.mesureid,

                })
              }
            }
            //const index = (parseInt(mesure.mesureid.split(' ')[1].split('.')[0]) * 4) + parseInt(mesure.mesureid.split(' ')[1].split('.')[1]) - 5

          }
        })

        setmesures(tab)
      }
      catch (error) {
        console.log(error)
      }
    }
    GetMesure()
    const getStatuAudit = async () => {
      try {
        const response = await axios.get(`${baseUrl3}`);
        const retrievedProject = response.data.projets;
        retrievedProject.forEach(projet => {
          if (projet.projetid === code) {
            setstatutP(projet.statutplanaction)

          }
        })
      }
      catch (error) {
        console.log(error)
      }

    }
    getStatuAudit()
  }, [code, change, confirmation])
  const [modifMesures, setModifMesures] = useState([{}])



  /* function */
  const Filtre = (event, colonne) => {

    /* Valeur dans le champ du filtre : event.target.value */
    const Copy = [];
    if (Type === 1) {

      if (colonne === "ID Interne") {


        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Id).toLowerCase().search(event.target.value) !== -1) {

            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Libellé") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Nom).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Action") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Action).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Maturité") {
        for (let i = 0; i < mesures.length; i++) {
          console.log(event.target.value)
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
          if ((mesures[i].AideChiffrage).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
      if (colonne === "Porteur") {
        for (let i = 0; i < mesures.length; i++) {
          if ((mesures[i].Porteur).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
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
          if ((mesures[i].Macro).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(mesures[i]);
          }
        }
      }
    }


    else if (Type === 2) {
      if (colonne === "ID Interne") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Id).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Libellé") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Nom).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Action") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Action).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Maturité") {
        for (let i = 0; i < modifMesures.length; i++) {
          console.log(event.target.value)
          if ((modifMesures[i].Maturite).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Priorité") {
        for (let i = 0; i < modifMesures.length; i++) {
          if (modifMesures[i].Priorite.search((event.target.value).toUpperCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Complexité") {
        for (let i = 0; i < modifMesures.length; i++) {
          if (modifMesures[i].Complexite === event.target.value) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Coût Projet (k€)") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].CoutProjet).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Coût Run (k€/an)") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].CoutRun).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Aide au chiffrage") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].AideChiffrage).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Porteur") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Porteur).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Date début") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].DateDebut).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Date fin") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].DateFin).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Statut") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Statut).toLowerCase().search(event.target.value) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }
      if (colonne === "Macro projet") {
        for (let i = 0; i < modifMesures.length; i++) {
          if ((modifMesures[i].Macro).toLowerCase().search((event.target.value).toLowerCase()) !== -1) {
            Copy.push(modifMesures[i]);
          }
        }
      }

      /*On fait apparaître le tableau modifié */
    }
    setModifMesures(Copy);
    setType(2);

  };
  const ResetFiltre = (event) => {
    var items = document.getElementsByClassName("FiltreCol")
    for (var i = 0; i < items.length; i++) {
      items[i].value = '';
    }
    //document.getElementById('FiltreC').value=''; 
    setType(1);
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

    var valuetoChange = e.currentTarget.textContent;
    if (statutP !== "Terminé") {


      const sendelement = async () => {
        try {
          if (number === 1) {
            valuetoChange = e.target.value
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
            valuetoChange = e.target.value
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
          if (number === 8) {
            setchange("8")
            axios.patch(`${baseUrl}`,
              {
                mesureid: id,
                coutrun: valuetoChange

              }, {
              'Content-Type': 'application/json'
            })
          }
          if (number === 8) {
            setchange("8")
            axios.patch(`${baseUrl}`,
              {
                mesureid: id,
                macro: valuetoChange

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
      setchange(valuetoChange)
    }
  }
  const DeleteMesure = (id, test) => {

    if (test) {
      const DeleteOne = async () => {
        try {
          await axios.delete(`${baseUrl}`, {
            data: {


              mesureid: id,
            }
          }, {
            'Content-Type': 'application/json'
          })
        }
        catch (error) {
          console.log(error)
        }
        const exigenceid = id.split(".")[0]
        console.log(exigenceid)
        const index = id.split(".")[1]
        const response = (await axios.get(`${baseUrl2}`)).data.exigence;
        var tab = []
        response.forEach(exigence => {
          if (exigence.exigenceid === exigenceid) {
            tab = exigence.color;
            tab[index - 1] = 0
          }
        })
        console.log(tab)
        try {
          await axios.patch(`${baseUrl2}`, {
            exigenceid: exigenceid,
            color: tab
          })
        }
        catch (error) {
          console.log(error)
        }
      }
      DeleteOne()
      setchange("3")
      HandleConfirmation("", false)
    }
    else {
      HandleConfirmation("", false)
    }

  }


  if (Type === 1) {
    return (
      <div>

        <h1 className="TITLEMESURE">Plan d'actions</h1>
        <button classname="BoutonResetFiltre" id="ResetFiltre" onClick={ResetFiltre}>Réinitialiser les filtres</button>
        <div className='pageMesure'>
          <table className='ListeMesures'>
            <thead>
              <tr>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='IdMesure' onClick={(e) => Tri(e, "Id")}>ID interne</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='NomMesure' onClick={(e) => Tri(e, "Nom")}>Libellé</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='ActionMesure' onClick={(e) => Tri(e, "Action")}>Action détaillée</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='MaturiteMEsure' onClick={(e) => Tri(e, "Maturite")}>Maturité</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='PrioriteMesure' onClick={(e) => Tri(e, "Priorite")}>Priorité</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='ComplexiteMesure' onClick={(e) => Tri(e, "Complexite")}>Complexité</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='CoutProjetMesure' onClick={(e) => Tri(e, "Cout Projet")}>Coût Projet (k€)</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='CoutRunMesure' onClick={(e) => Tri(e, "Cout Run")}>Coût Run (k€/an)</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='AideChiffrageMesure' onClick={(e) => Tri(e, "Aide Chiffrage")}>Aide au chiffrage</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='PorteurMesure' onClick={(e) => Tri(e, "Porteur")}>Porteur</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='DateDebutMesure' onClick={(e) => Tri(e, "Date Debut")}>Date début "Année-TN"</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='DateFinMesure' onClick={(e) => Tri(e, "Date Fin")}>Date fin "Année-TN"</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='StatutMesure' onClick={(e) => Tri(e, "Statut")}>Statut</th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='MacroMesure' onClick={(e) => Tri(e, "Macro")}>Macro projet</th>
              </tr>
              <tr>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "ID Interne")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Libellé")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Action")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Maturité")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Priorité")} /></th>
                <th>
                  <select onChange={(e) => Filtre(e, "Complexité")} defaultValue="+">
                    <option value="+">+</option>
                    <option value="++">++</option>
                    <option value="+++">+++</option>
                    <option value="++++">++++</option></select></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Coût Projet (k€)")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Coût Run (k€/an)")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Aide au chiffrage")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Porteur")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Date début")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Date fin")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Statut")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Macro projet")} /></th>

              </tr>
            </thead>
            <tbody>
              {mesures.map((mesure) => (
                <tr className="Cellule">
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextId' id='Case'>{mesure.Id}
                      <button onClick={() => handleDelete(mesure.MesureID)} className="BtnDelete">X</button></div>
                  </td>
                  <td id="CelluleMesure ">
                    <div contentEditable="false" className='TextNom' id='Case'>{mesure.Nom}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAction' id='Case'>{mesure.Action}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextMaturite' id='Case'>{mesure.Maturite}</div>
                  </td>
                  <td id="CelluleMesure" style={{
                    backgroundColor: mesure.Priorite === "P0" ? "Red" : mesure.Priorite === "P1" ? "Yellow" : mesure.Priorite === "P2" ? "Blue" : "Green",
                  }}>
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} className='TextPriorite' id='Case'>
                      <select onChange={e => SendContent(e, mesure.MesureID, 1)} value={mesure.Priorite}>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                      </select></div>
                  </td>
                  <td id="CelluleMesure" style={{
                    backgroundColor: mesure.Complexite === "++++" ? "Red" : mesure.Complexite === "+++" ? "Yellow" : mesure.Complexite === "++" ? "Blue" : "Green",
                  }}>
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} className='TextComplexite' id='Case'>
                      <select onChange={e => SendContent(e, mesure.MesureID, 2)} value={mesure.Complexite}>
                        <option value="+">+</option>
                        <option value="++">++</option>
                        <option value="+++">+++</option>
                        <option value="++++">++++</option>
                      </select>
                    </div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 3)} className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 8)} className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 4)} className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 6)} className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 7)} className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 5)} className='TextStatut' id='Case'>{mesure.Statut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 9)} className='TextMacro' id='Case'>{mesure.Macro}</div>
                  </td>
                  <div></div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {confirmation.isLoading && (
          <Confirmation OnConfirmation={DeleteMesure} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
        )

        }
      </div>
    );

  }
  if (Type === 2) {
    return (
      <div>
        <h1 className="TITLEMESURE">Plan d'actions</h1>
        <button classname="BoutonResetFiltre" id="ResetFiltre" onClick={ResetFiltre}>Réinitialiser les filtres</button>
        <div className='pageMesure'>
          <table className='ListeMesures'>
            <thead>
              <tr>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='IdMesure' onClick={(e) => Tri(e, "Id")}>ID interne <span id="Triangle">{TriId}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='NomMesure' onClick={(e) => Tri(e, "Nom")}>Libellé <span id="Triangle">{TriNom}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='ActionMesure' onClick={(e) => Tri(e, "Action")}>Action détaillée <span id="Triangle">{TriAction}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='MaturiteMEsure' onClick={(e) => Tri(e, "Maturite")}>Maturité <span id="Triangle">{TriMaturite}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='PrioriteMesure' onClick={(e) => Tri(e, "Priorite")}>Priorité <span id="Triangle">{TriPriorite}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='ComplexiteMesure' onClick={(e) => Tri(e, "Complexite")}>Complexité <span id="Triangle">{TriComplexite}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='CoutProjetMesure' onClick={(e) => Tri(e, "Cout Projet")}>Coût Projet (k€) <span id="Triangle">{TriCoutProjet}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='CoutRunMesure' onClick={(e) => Tri(e, "Cout Run")}>Coût Run (k€/an) <span id="Triangle">{TriCoutRun}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='AideChiffrageMesure' onClick={(e) => Tri(e, "Aide Chiffrage")}>Aide au chiffrage <span id="Triangle">{TriAideChiffrage}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='PorteurMesure' onClick={(e) => Tri(e, "Porteur")}>Porteur <span id="Triangle">{TriPorteur}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='DateDebutMesure' onClick={(e) => Tri(e, "Date Debut")}>Date début "Année-TN" <span id="Triangle">{TriDateDebut}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='DateFinMesure' onClick={(e) => Tri(e, "Date Fin")}>Date fin "Année-TN" <span id="Triangle">{TriDateFin}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='StatutMesure' onClick={(e) => Tri(e, "Statut")}>Statut <span id="Triangle">{TriStatut}</span></th>
                <th id="TitreMesure" style={{ backgroundColor: "orange" }} className='MacroMesure' onClick={(e) => Tri(e, "Macro")}>Macro projet <span id="Triangle">{TriMacro}</span></th>
              </tr>
              <tr>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "ID Interne")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Libellé")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Action")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Maturité")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Priorité")} /></th>
                <th><select onChange={(e) => Filtre(e, "Complexité")} defaultValue="+">
                  <option value="+">+</option>
                  <option value="++">++</option>
                  <option value="+++">+++</option>
                  <option value="++++">++++</option></select></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Coût Projet (k€)")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Coût Run (k€/an)")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Aide au chiffrage")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Porteur")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Date début")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Date fin")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Statut")} /></th>
                <th><input id="FiltreC" type="text" className="FiltreCol" placeholder="Filtre..." onChange={(e) => Filtre(e, "Macro projet")} /></th>

              </tr>
            </thead>
            <tbody>
              {modifMesures.map((mesure) => (
                <tr className="Cellule">
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextId' id='Case'>{mesure.Id}
                      <button onClick={() => handleDelete(mesure.MesureID)} className="BtnDelete">X</button></div>
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
                  <td id="CelluleMesure" style={{
                    backgroundColor: mesure.Priorite === "P0" ? "Red" : mesure.Priorite === "P1" ? "Yellow" : mesure.Priorite === "P2" ? "Blue" : "Green",
                  }}>
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} className='TextPriorite' id='Case'>
                      <select onChange={e => SendContent(e, mesure.MesureID, 1)} value={mesure.Priorite}>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                      </select></div>
                  </td>
                  <td id="CelluleMesure" style={{
                    backgroundColor: mesure.Complexite === "++++" ? "Red" : mesure.Complexite === "+++" ? "Yellow" : mesure.Complexite === "++" ? "Blue" : "Green",
                  }}>
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} className='TextComplexite' id='Case'>
                      <select onChange={e => SendContent(e, mesure.MesureID, 2)} value={mesure.Complexite}>
                        <option value="+">+</option>
                        <option value="++">++</option>
                        <option value="+++">+++</option>
                        <option value="++++">++++</option>
                      </select></div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 3)} className='TextCoutProjet' id='Case'>{mesure.CoutProjet}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} className='TextCoutRun' id='Case'>{mesure.CoutRun}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable="false" className='TextAideChiffrafe' id='Case'>{mesure.AideChiffrage}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 4)} className='TextPorteur' id='Case'>{mesure.Porteur}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 6)} className='TextDateDebut' id='Case'>{mesure.DateDebut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 7)} className='TextDateFin' id='Case'>{mesure.DateFin}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 5)} className='TextStatut' id='Case'>{mesure.Statut}</div>
                  </td>
                  <td id="CelluleMesure">
                    <div contentEditable={statutP === "Terminé" ? "false" : "true"} onBlur={e => SendContent(e, mesure.MesureID, 9)} className='TextMacro' id='Case'>{mesure.Macro}</div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {confirmation.isLoading && (
          <Confirmation OnConfirmation={DeleteMesure} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
        )

        }
      </div>
    );
  }
};

export default Mesures;
