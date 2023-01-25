import React from "react";
import { useState } from "react";
import "../../styles/components/GestionStyle/_mesures.css";

const Mesures = () => {
  const [Type,setType]=useState(1); /* 1 = la tableau de base, sans modifications, 2 = le tableau modifié, avec un filtre, un tri, ou les deux */
  
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



  const [mesures, setMesures] = useState([
      {
        Id: "5.08.1.1.1",
        Nom: "Vidéo-surveillance dans la salle serveur",
        Action:
          "Mettre en place des caméras dans la salle serveur du siège d’Evry​",
        Maturite: "2",
        Priorite: "P2",
        Complexite: "++",
        CoutProjet: "5",
        CoutRun: "1",
        AideChiffrage:
          "Eqpt seul: 2 K€​ Solution packagée avec monitoring par société de surveillance externe : 5k€ + 1 K€/an​",
        Porteur: "Service Généraux",
        DateDebut: "2022 T2",
        DateFin: "2022 T3",
        Statut: "Terminé",
        Macro: "Vidéo-Surveillance",
      },
      {
        Id: "5.08.1.1.2",
        Nom: "Vidéo-surveillance dans les dépôts",
        Action:
          "Mettre en place des caméras dans les zones d’arrivée de marchandise de chacun des 3 dépôts logistiques​​",
        Maturite: "1",
        Priorite: "P1",
        Complexite: "+",
        CoutProjet: "10",
        CoutRun: "0.5",
        AideChiffrage: "",
        Porteur: "Service Généraux",
        DateDebut: "2022 T3",
        DateFin: "2022 T3",
        Statut: "Terminé",
        Macro: "Vidéo-Surveillance",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P1",
        Complexite: "+",
        CoutProjet: "4",
        CoutRun: "0",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 1",
        DateDebut: "2000 T1",
        DateFin: "2000 T3",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "1",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "0",
        CoutRun: "5",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 1",
        DateDebut: "2000 T2",
        DateFin: "2000 T3",
        Statut: "En cours",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "3",
        Priorite: "P2",
        Complexite: "++++",
        CoutProjet: "20",
        CoutRun: "0",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 3",
        DateDebut: "2000 T1",
        DateFin: "2000 T2",
        Statut: "Terminé",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+",
        CoutProjet: "5",
        CoutRun: "1.5",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 1",
        DateDebut: "2000 T1",
        DateFin: "2000 T2",
        Statut: "Terminé",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "2",
        Priorite: "P1",
        Complexite: "+",
        CoutProjet: "8",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 2",
        DateDebut: "2000 T1",
        DateFin: "2000 T3",
        Statut: "Non-débuté",
        Macro: "Lorem Ipsum 2",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "2",
        Priorite: "P2",
        Complexite: "++",
        CoutProjet: "3",
        CoutRun: "0.5",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 3",
        DateDebut: "2000 T2",
        DateFin: "2000 T2",
        Statut: "Terminé",
        Macro: "Lorem Ipsum 2",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "3",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "12",
        CoutRun: "2",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 2",
        DateDebut: "2000 T1",
        DateFin: "2000 T1",
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
        Complexite: "++",
        CoutProjet: "45",
        CoutRun: "10",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 3",
        DateDebut: "2000 T3",
        DateFin: "2000 T3",
        Statut: "En cours",
        Macro: "Lorem Ipsum 2",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "0",
        Priorite: "P3",
        Complexite: "+++",
        CoutProjet: "8",
        CoutRun: "3",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Autre service 2",
        DateDebut: "2000 T1",
        DateFin: "2000 T3",
        Statut: "Non-débuté",
        Macro: "Lorem Ipsum",
      },
      {
        Id: "5.08.x.y.z",
        Nom: "Lorem ipsum dolor sit amet",
        Action:
          "Consectetur adipiscing elit. In justo nulla, placerat eleifend mi non, scelerisque mattis velit. Aliquam bibendum ac odio non molestie. Nunc viverra aliquam tincidunt.​",
        Maturite: "2",
        Priorite: "P1",
        Complexite: "+",
        CoutProjet: "1",
        CoutRun: "1",
        AideChiffrage:
          "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In dolor nunc, vulputate sit amet rhoncus ut, faucibus ut mi.",
        Porteur: "Service Généraux",
        DateDebut: "2000 T1",
        DateFin: "2000 T2",
        Statut: "Terminé",
        Macro: "Lorem Ipsum 2",
      },
    ]);
    const [modifMesures, setModifMesures] = useState([{}])

    const [colonne, setColonne] = useState("Libellé");

    /* function */
    const Filtre = (event) => {
        /* Valeur dans le champ du filtre : event.target.value */
        
        if(event.target.value==""){
          setType(1); /* On fait réapparaître le tableau non filtré qui ne change jamais (car il sert de database locale)*/
        } else {
          const Copy=[];
          if(colonne==="ID Interne")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Id).toLowerCase().search(event.target.value) != -1){
                    Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Libellé")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Nom).toLowerCase().search(event.target.value) != -1){
                    Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Action")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Action).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Maturité")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Maturite).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Priorité")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if(mesures[i].Priorite.search((event.target.value).toUpperCase()) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Complexité")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if(mesures[i].Complexite === event.target.value){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Coût Projet (k€)")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].CoutProjet).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Coût Run (k€/an)")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].CoutRun).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Aide au chiffrage")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].AideChiffrage).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Porteur")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Porteur).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Date début")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].DateDebut).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Date fin")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].DateFin).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Statut")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Statut).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }
          if(colonne==="Macro projet")
          {
              for (let i = 0; i < mesures.length; i++) {
                  if((mesures[i].Macro).toLowerCase().search(event.target.value) != -1){
                      Copy.push(mesures[i]);
                  }
              }
          }

          setModifMesures(Copy);
          setType(2); /*On fait apparaître le tableau modifié */
        }
        
    };

    const ChangeColonne =(event)=>{
        setColonne(event.target.value);
    }

    const sortCroissant = (arr, prop) => {
      arr.sort (
          function (a, b) {
              if (a[prop] < b[prop]){
                  return -1;
              } else if (a[prop] > b[prop]){
                  return 1;
              } else {
                  return 0;   
              }
          }
      );
    }

    const sortDecroissant = (arr, prop) => {
      arr.sort (
          function (a, b) {
              if (a[prop] > b[prop]){
                  return -1;
              } else if (a[prop] < b[prop]){
                  return 1;
              } else {
                  return 0;   
              }
          }
      );
    }

    const sortCroissantNombre = (arr, prop) => {
      arr.sort (
          function (a, b) {
              if (parseFloat(a[prop]) < parseFloat(b[prop])){
                  return -1;
              } else if (parseFloat(a[prop]) > parseFloat(b[prop])){
                  return 1;
              } else {
                  return 0;   
              }
          }
      );
    }

    const sortDecroissantNombre = (arr, prop) => {
      arr.sort (
          function (a, b) {
              if (parseFloat(a[prop]) > parseFloat(b[prop])){
                  return -1;
              } else if (parseFloat(a[prop]) < parseFloat(b[prop])){
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
      const Copy=[];
      /* On copie tout le tableau: mesures si il n'y a pas de filtre, modifMesures si il y a un filtre */
      if(Type==1){
        for(let i = 0; i < mesures.length; i++) {
          Copy.push(mesures[i]);
        }
      } else if(Type == 2) {
        for(let i = 0; i < modifMesures.length; i++) {
          Copy.push(modifMesures[i]);
        }
      }

      if(colonne === "Id"){
        resetTriangles();
        if(TriId === "▲"){
          sortCroissant(Copy, "Id");
          setTriId("▼");
        } else { /* chemin par défaut, on suppose qu'on veut les maximum au premier clique plutôt que les minimums */
        sortDecroissant(Copy, "Id");
        setTriId("▲");
        }
      }

      if(colonne === "Nom"){
        resetTriangles();
        if(TriNom === "▲"){
          sortCroissant(Copy, "Nom");
          setTriNom("▼");
        } else { 
        sortDecroissant(Copy, "Nom");
        setTriNom("▲");
        }
      }

      if(colonne === "Action"){
        resetTriangles();
        if(TriAction === "▲"){
          sortCroissant(Copy, "Action");
          setTriAction("▼");
        } else { 
        sortDecroissant(Copy, "Action");
        setTriAction("▲");
        }
      }

      if(colonne === "Maturite"){
        resetTriangles();
        if(TriMaturite === "▲"){
          sortCroissant(Copy, "Maturite");
          setTriMaturite("▼");
        } else {
          sortDecroissant(Copy, "Maturite");
          setTriMaturite("▲");
        }
      }

      if(colonne === "Priorite"){
        resetTriangles();
        if(TriPriorite === "▲"){
          sortCroissant(Copy, "Priorite");
          setTriPriorite("▼");
        } else { 
        sortDecroissant(Copy, "Priorite");
        setTriPriorite("▲");
        }
      }

      if(colonne === "Complexite"){
        resetTriangles();
        if(TriComplexite === "▲"){
          sortCroissant(Copy, "Complexite");
          setTriComplexite("▼");
        } else { 
        sortDecroissant(Copy, "Complexite");
        setTriComplexite("▲");
        }
      }

      if(colonne === "Cout Projet"){
        resetTriangles();
        if(TriCoutProjet === "▲"){
          sortCroissantNombre(Copy, "CoutProjet");
          setTriCoutProjet("▼");
        } else { 
        sortDecroissantNombre(Copy, "CoutProjet");
        setTriCoutProjet("▲");
        }
      }

      if(colonne === "Cout Run"){
        resetTriangles();
        if(TriCoutRun === "▲"){
          sortCroissantNombre(Copy, "CoutRun");
          setTriCoutRun("▼");
        } else { 
        sortDecroissantNombre(Copy, "CoutRun");
        setTriCoutRun("▲");
        }
      }

      if(colonne === "Aide Chiffrage"){
        resetTriangles();
        if(TriAideChiffrage === "▲"){
          sortCroissant(Copy, "AideChiffrage");
          setTriAideChiffrage("▼");
        } else { 
        sortDecroissant(Copy, "AideChiffrage");
        setTriAideChiffrage("▲");
        }
      }

      if(colonne === "Porteur"){
        resetTriangles();
        if(TriPorteur === "▲"){
          sortCroissant(Copy, "Porteur");
          setTriPorteur("▼");
        } else { 
        sortDecroissant(Copy, "Porteur");
        setTriPorteur("▲");
        }
      }

      if(colonne === "Date Debut"){
        resetTriangles();
        if(TriDateDebut === "▲"){
          sortCroissant(Copy, "DateDebut");
          setTriDateDebut("▼");
        } else { 
        sortDecroissant(Copy, "DateDebut");
        setTriDateDebut("▲");
        }
      }

      if(colonne === "Date Fin"){
        resetTriangles();
        if(TriDateFin === "▲"){
          sortCroissant(Copy, "DateFin");
          setTriDateFin("▼");
        } else { 
        sortDecroissant(Copy, "DateFin");
        setTriDateFin("▲");
        }
      }

      if(colonne === "Statut"){
        resetTriangles();
        if(TriStatut === "▲"){
          sortCroissant(Copy, "Statut");
          setTriStatut("▼");
        } else { 
        sortDecroissant(Copy, "Statut");
        setTriStatut("▲");
        }
      }

      if(colonne === "Macro"){
        resetTriangles();
        if(TriMacro === "▲"){
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


    if(Type==1)
    {
        return (
            <div>
                <h1 className="TITLEMESURE">Plan d'actions</h1>
                      <form>
                          <input id="Filtre" type="text" name="Thing" onChange={Filtre}/>
                            <select id="ChoixFiltre" value = {colonne} onChange={ChangeColonne}>
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
                <h1 className="TITLEMESURE">Plan d'actions</h1>
                  <form>
                          <input id="Filtre" type="text" name="Thing" onChange={Filtre}/>
                            <select id="ChoixFiltre" value = {colonne} onChange={ChangeColonne}>
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
                                    {modifMesures.map((mesure) =>(
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

export default Mesures;
