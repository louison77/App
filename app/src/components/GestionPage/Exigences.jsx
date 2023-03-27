import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/GestionStyle/_exigences.css";
import Confirmation from "../AccueilPage/Confirmation";
import { CSVLink } from "react-csv";
import ToggleButton from 'react-bootstrap/ToggleButton';

const Exigences = () => {
  //Url de l'api Exigence
  const baseUrl = '/api/Exigence';
  //Url de l'api Projet
  const baseUrl2 = '/api/Projet';
  //Url de l'api Mesure
  const baseUrl3 = '/api/Mesure';
  //Booléen qui teste si on a déja créer les exigences du projet
  const [isposted, setposted] = useState(false)
  //Statut de l'audit du projet
  const [statutP, setstatutP] = useState("")
  //Variable permettant de rafraichir la page
  const [refresh, setrefresh] = useState(true)
  //code du projet que l'on récupére avec la fonction useOutletContext
  const [code] = useOutletContext();
  //Longueur du tableau d'exigences
  const [length, setLength] = useState(0)
  //Tableau général de toutes les exigences
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
  //Variable qui est utilisé pour le toggle de changement d'état de l'audit 
  const [checked1] = useState([
    {
      name: "En cours", id: 0
    },
    {
      name: "Terminé", id: 1
    }
  ]
  )
  //id correspond à l'id dans la variable checked1
  //Si on est à 1 on modifie vers En cours en faisant une requête patch pour modifier la bdd
  //Dans l'autre sens on modifie vers Terminé
  //Quand le statut de l'audit est à Terminé on ne peut plus modifier l'audit
  //On change la valeur de refresh pour pouvoir actualiser la page lorsqu'on appuie sur le toggle
  const changeToggle = (id) => {
    const patchStatutProjet = async () => {
      try {
        if (id === 0 && statutP !== "En cours") {
          await axios.patch(`${baseUrl2}`,
            {
              projetid: code,
              statutaudit: "En cours"
            }, {
            'Content-Type': 'application/json'
          })
        }
        else if (id === 1 && statutP !== "Terminé") {
          await axios.patch(`${baseUrl2}`,
            {
              projetid: code,
              statutaudit: "Terminé"
            }, {
            'Content-Type': 'application/json'
          })

        }

      }
      catch (error) {
        console.log(error)
      }
    }

    patchStatutProjet();
    setrefresh(!refresh)

  }
  //valeur tampon de l'exigence
  const [UneExigence, setUneExigence] = useState("");
  //booléen pour afficher la partie de droite
  const [isSeen, setisSeen] = useState(false);
  //open le bouton guide complet
  const [open, setOpen] = useState(false);
  //Id représentant l'exigence active
  const [activeID, setactiveID] = useState("");

  //Confirmation comme sur les autres pages
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
  //On rajoute le test !==Terminé pour ne pas faire l'action si le statut est Terminé
  const handleDelete = (id) => {
    if (statutP !== "Terminé") {
      HandleConfirmation("Est-ce que vous voulez bien les ajouter au plan d'action?", true, id);
    }
  }

  //Ce UseEffect va construire le tableau d'objet exigences à l'aide du fichier excel contenant toutes les exigences et ses différentes valeurs
  //getExigences va parcourir cet excel et mettre les valeurs dans un tableau baseExigences ce sont les attributs d'exigences qui n'ont pas besoin des valeurs de la bdd mais du fichier excel
  //On set la longueur de length au nombre d'exigences dans l'excel
  //Ensuite on va faire une requête get à l'api Exigences pour récupérer les informations du projet en particulier avec le test sur projetid
  //On va mettre toutes ces valeurs dans une valeur tampons tab, où l'on va les push dedans à chaque itération
  //Une fois arriver à la fin on va trier le tab et set la varible exigences en local avec la fonction setExigences
  //On récupère le statut de l'audit en faisant une requête get vers l'api Projet dans la fonction getStatuAudit
  //Ce UseEffect est appelé lors de la modification de code, isposted ou refresh
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
            var SousEx = baseExigences[i].SousExigences;
            for (let j = 0; j < exigence.color.length; j++) {
              SousEx[j].color = exigence.color[j]
            }

            const NewExigence = {
              exigenceid: exigence.exigenceid,
              Note: exigence.note,
              Maturite: exigence.maturite,
              Observation: exigence.observations,
              Id: "Exigence " + (i + 1).toString(),
              Nom: baseExigences[i].Nom,
              GuideAbrege: baseExigences[i].GuideAbrege,
              GuideComplet: baseExigences[i].GuideComplet,
              SousExigences: SousEx,
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
    const getStatuAudit = async () => {
      try {
        const response = await axios.get(`${baseUrl2}`);
        const retrievedProject = response.data.projets;
        retrievedProject.forEach(projet => {
          if (projet.projetid === code) {
            setstatutP(projet.statutaudit)

          }
        })
      }
      catch (error) {
        console.log(error)
      }

    }
    getStatuAudit()
  }, [code, isposted, refresh]);
  //Cette fonction va permettre d'afficher une exigence en particulier
  //Elle prend en paramètre un ID (Exigence +nombre)
  //on prend les valeurs de la bonne exigence que l'on push dans Copy et on set UneExigence avec ce dernier
  //On change la valeur de isSeen a true pour faire apparaitre l'affichage de l'exigence
  //on change aciveID pour changer le css de la barre déroulée des exigences
  //Si le bouton guide complet était ouvert, on le ferme en mettant open à false
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
  //Cette fonction va effectuer une requêtes post vers l'api Exigence avec autant d'exigences que la longueur du Excel
  //On va créer un id différent pur chaque exigence, cet id sera dépendant du code projet et du numéro de la mesure
  //On modifie la valeur de isPosted à true pour changer l'affichage
  //On effectue aussi une requête post vers l'api Projet pour modifier le statut de l'audit de "pas commencé" à "en cours"

  const CreateExigences = () => {
    const EnvoyerMesures = async () => {
      var tab = []
      for (let i = 0; i < length; i++) {

        tab.push({
          exigenceid: code + " " + (i + 1).toString(),
          projetid: code,
          observations: "Observations",
          maturite: "0",
          note: "0",
          domaine: "",
          color: [0, 0, 0, 0]
        }
        )
      }
      try {
        await axios.post(`${baseUrl}`,
          tab, {
          'Content-Type': 'application/json'
        },).then(function (response) {
          console.log(response);
        })
      }
      catch (error) {
        console.log(error)
      }
      setposted(true)
    }
    EnvoyerMesures()

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

    //sendexigences()
    patchStatutProjet();

  }
  //On modifie la valeur d'observations dans exigences et UneExigence[0] à l'aide de tampon Copy et Copy2
  //On récupère la valeur d'observation avec event.target.value
  const ModifyObserv = (event) => {
    if (statutP !== "Terminé") {
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
    }

  };
  //Cette fonction est appelée lors de l'appui du bouton ajouter observations
  //Si le statut n'est pas terminé, on peut effectuer une requêtes patch vers l'api Exigence qui modifie le champ observation avec le valeur d'observation de UneExigence[0]
  const PatchObservations = (e) => {
    e.preventDefault();
    if (statutP !== "Terminé") {
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

  }
  //Index est l'index de la sous-exigence
  //Count le numéro de la couleur de 0 à 4
  //On  modifie la couleur du champ sous-exigences au bon index
  //On fait les mêmes manipulations que pour lesfonctions précédentes ensuite pour modifier exigence et UneExigence
  const ChangeColor = (count, Index) => {
    if (statutP !== "Terminé") {
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
    }
  };
  //Pareil que la fonction modify observ mais avec note
  //Il y a juste une requête patch vers l'api Exigence pour modifier la note dans la bdd
  //event.prevent.default permet de ne pas recharger la page
  //On effectue cette fonction que si le statut n'est pas terminé
  const SubmitNote = (event) => {
    if (statutP !== "Terminé") {
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
            domaine: UneExigence[0].Nom
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
    }

  };
  //Cette fonction va modifier les valeurs en local de la couleur des sous-exigences selon une valeur de 1 à 4
  //Pour chaque index<=value on met la couleur à 1(vert) sinon à 2(rouge)
  //On Copy ensuite la nouvelle valeur de sous-exigences dans exigences et UneExigence[0]
  //On effectue une requête patch vers l'api Exigence pour modifier la valeur de maturite dans la bdd
  const ChangeMaturity = (value) => {
    if (statutP !== "Terminé") {
      const Copy = [];
      const Copy2 = [];
      var sousExigencesCopy = UneExigence[0].SousExigences;

      const valeur = UneExigence[0].Maturite === value ? "0" : value
      for (let i = 0; i < sousExigencesCopy.length; i++) {
        if (i + 1 <= parseInt(valeur)) {
          sousExigencesCopy[i].color = 1
        }
        else if ((parseInt(valeur) + 1) === i + 1 && valeur !== "0") {
          sousExigencesCopy[i].color = 2
        }
        else {
          sousExigencesCopy[i].color = 0
        }
      }
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
            SousExigences: sousExigencesCopy,
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
        SousExigences: sousExigencesCopy,
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

    }


  };
  //Permet de passer d'une exigence à l'autre avec les flèches
  //ID étant l'ID de l'exigence
  //iter est soit 1 soit -1 pour soit aller vers la prochaine ou précédente exigence
  //On veut que l'index soit toujours >=0 et < exigences.length pour ne pas avoir d'erreur
  //On modifie UneExigence[0] avec les valeurs de l'index voulu de exigences
  //On ferme le bouton guidecomplet avec setOpen(false)
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
  //On va effectuer des requêtes post vers l'api Mesure pour créer des nouvelles mesures si la couleur de la sous mesures est rouge(valeur 2)
  //On initialise les valeurs d'une mesure avec des valeurs de base 
  //On effectue une requête vers l'api Projet pour modifier le statut du plan d'action à en cours
  //On effectue aussi une requête vers l'api Exigences pour modifier les valeurs du tableau de couleur. Lorsqu'on crée une mesure on veut garder en mémoire les valeurs des couleurs 
  const Sendmesures = (id, test) => {
    if (test && statutP !== "Terminé") {
      const EnvoyerMesures = async () => {

        for (let i = 0; i < UneExigence[0].SousExigences.length; i++) {

          if (UneExigence[0].SousExigences[i].color === 2) {
            try {
              await axios.post(`${baseUrl3}`,
                {
                  mesureid: UneExigence[0].exigenceid + "." + (i + 1).toString(),
                  projetid: id,
                  priorite: "P1",
                  complexite: "+",
                  cout: 0,
                  coutrun: 0,
                  porteur: "",
                  debut: "",
                  fin: "",
                  statut: "Pas démarré",
                  domaine: UneExigence[0].Nom,
                  note: UneExigence[0].Note,

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
      const MesureEncours = async () => {
        try {

          await axios.patch(`${baseUrl2}`,
            {
              projetid: code,
              statutplanaction: "En cours"
            }, {
            'Content-Type': 'application/json'
          })
        }
        catch (error) {
          console.log(error)
        }
      }
      MesureEncours()
      const Updatecolor = async () => {
        var colortab = [];
        for (let i = 0; i < UneExigence[0].SousExigences.length; i++) {
          colortab.push(UneExigence[0].SousExigences[i].color)
        }
        try {
          await axios.patch(`${baseUrl}`, {
            exigenceid: UneExigence[0].exigenceid,
            color: colortab,
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
      Updatecolor()
      HandleConfirmation("", false);
    }
    else {
      HandleConfirmation("", false);
    }

  }
  //Trois affichages possible
  //le premier celui avec la barre de sélection d'exigence et une exigence en particulier si isSeen est true
  //le deuxième si on le tableau d'exigences est vide, c'est-à-dire qu'on a pas encore créer d'exigences pour ce projet, on a qu'un bouton créer Exigences avec l'iso 27001
  //le troisième lorsque l'on arrive sur la page exigences et qu'on a pas encore sélectionner d'exigences, on a simplement une barre de sélection d'exigence, c'est l'affichage par défaut
  if (isSeen) {
    return (
      <div className="Window">
        <div className="OptionArea">
          <CSVLink className="Textedownload" data={exigences} filename={code + " Exigences/" + new Date().toDateString()} separator=";">Exporter les exigences au format csv</CSVLink>
          <div className="StatutAudit">
            <h3>Statut de l'audit</h3>

            {checked1.map((radio) => (
              <ToggleButton style={{
                backgroundColor:
                  statutP === radio.name ? "Orange" : "Whitesmoke", color: "Black", border: "none"
              }} type="radio" checked={statutP === radio.name} onClick={() => changeToggle(radio.id)}>
                {radio.name}
              </ToggleButton>
            ))

            }
          </div>
        </div>
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
                          <button class="BoutonObserv" onClick={PatchObservations}>
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="SelectionMesures">
                  <h4 className="NamePart">Evaluation de la maturité </h4>
                  <table className="ChoixNiveaux">
                    <thead class="labelLevels">
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

                            {" " + exige.SousExigences[0].sousId}
                          </div>
                        </td>
                        <td className="Case">
                          <div className="CaseTable">
                            <label style={{ display: "inline-block" }}>
                              <input
                                type="checkbox"
                                onClick={() => ChangeMaturity("2")}
                                checked={exige.Maturite === "2" ? true : false}
                                style={{ verticalAlign: "middle" }}
                              />
                              <span style={{ verticalAlign: "middle" }}>

                                {" " + exige.SousExigences[1].sousId}
                              </span>
                            </label>
                          </div>
                        </td>
                        <td className="Case">
                          <div className="CaseTable">
                            <label style={{ display: "inline-block" }}>
                              <input
                                type="checkbox"
                                onClick={() => ChangeMaturity("3")}
                                checked={exige.Maturite === "3" ? true : false}
                                style={{ verticalAlign: "middle" }}
                              />
                              <span style={{ verticalAlign: "middle" }}>

                                {" " + exige.SousExigences[2].sousId}
                              </span>
                            </label>
                          </div>
                        </td>
                        <td className="Case">
                          <div className="CaseTable">
                            <label style={{ display: "inline-block" }}>
                              <input
                                type="checkbox"
                                onClick={() => ChangeMaturity("4")}
                                checked={exige.Maturite === "4" ? true : false}
                                style={{ verticalAlign: "middle" }}
                              />
                              <span style={{ verticalAlign: "middle" }}>

                                {" " + exige.SousExigences[3].sousId}
                              </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 className="NamePart">Aide à la sélection de mesures</h4>
                  <div className="Mesurepart">
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
                      <btn className="MesureButton" onClick={() => handleDelete(code)}>
                        Envoyer mesures au plan d'action
                      </btn>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {confirmation.isLoading && (
            <Confirmation OnConfirmation={Sendmesures} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
          )

          }
        </div>
      </div>
    );
  } else {
    if (exigences.length === 0) {
      return (
        <div>
          <div>
            <btn className="BtnISO" onClick={CreateExigences}>Utiliser Iso 27001</btn>
          </div>
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
          </div>
        </div>
      );
    }
    else {
      return (
        <div>

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
          </div>
        </div>
      );

    }
  }

};

export default Exigences;