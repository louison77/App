import React from 'react';
import { useState } from 'react';
import '../../styles/components/GestionStyle/_exigences.css';
import TableauNiveau from './TableauNiveau';

const Exigences = (props) => {
 
   
    //States
    const [exigences,setExigences] =useState([
        {Id : "ORG 5.08", Nom:"Sécurité de l'information", Exigence : "Assure blabla", GuideComplet : "ggggg", GuideAbrege:"Doit inclure <br/> ​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb) évaluation et traitement des risques de sécurité de l'information lors du projet\n​c) évaluation et traitement des risques de sécurité de l'information une fois le projet mis en place​d) tests des mesures de sécurité en pace​e) intégration de la sécurité de l'information au sein de toutes les phases de la méthodologie projet​",Obj:"Objectif 5.08",Observation:"Observations"},
        {Id : "ORG 5.09",Nom: "Sécurité Gestion", Exigence : "Réalise machin", GuideComplet : "fhqhhf",GuideAbrege:"Doit inclure\n​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb)", Obj:"Objectif 5.09",Observation:"Observations"},
        {Id : "ORG 5.10",Nom: "Sécurité réseau", Exigence : "Gère le réseau de l'entreprise", GuideComplet : "fffff",GuideAbrege:"Doit inclure\n​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb)", Obj:"Objectif 5.10",Observation:"Observations"}
    
    ]);
    const [UneExigence,setUneExigence]=useState("");
    const [isSeen, setisSeen]=useState(false);
  //comportements
    //Ajouter une constante
    const [Observ,setObserv]=useState(exigences[0].Observation)
   const toggleVisibility =(event,ID) => {
    console.log(ID);
    const Copy=[]
    for(let i=0 ;i<exigences.length;i++){
        if(exigences[i].Id===ID)
        {
            Copy.push({Id: exigences[i].Id, Nom:exigences[i].Nom, Exigence:exigences[i].Exigence,GuideComplet: exigences[i].GuideComplet,GuideAbrege:exigences[i].GuideAbrege, Obj:exigences[i].Obj,Observation:exigences[i].Observation});
        }
    }
    setUneExigence(Copy);
    console.log(Copy)
    
    const value = true;
    setisSeen(value)
        ;

  }
  const handleChange = (event) =>{
    
    setObserv(event.target.value)
}
  const ModifyObserv=(event) => {
    event.preventDefault();
    const Copy=[]
    const Copy2=[]
    for(let i=0 ;i<exigences.length;i++){
        if(exigences[i].Id===UneExigence[0].Id)
        {
            Copy.push({Id: exigences[i].Id, Nom:exigences[i].Nom, Exigence:exigences[i].Exigence,GuideComplet: exigences[i].GuideComplet,GuideAbrege:exigences[i].GuideAbrege, Obj:exigences[i].Obj,Observation:Observ});
        
        }
        else{
            Copy.push(exigences[i]);
        }        
    }
    Copy2.push({Id: UneExigence[0].Id, Nom:UneExigence[0].Nom, Exigence:UneExigence[0].Exigence,GuideComplet: UneExigence[0].GuideComplet,GuideAbrege:UneExigence[0].GuideAbrege, Obj:UneExigence[0].Obj,Observation:Observ});
    setUneExigence(Copy2);
    setExigences(Copy);
    console.log(UneExigence);
    console.log(exigences);
  }
  if(isSeen){
            
  
    return (
        
        <div >
            <h1 className='TITLE'>Exigences</h1>
            <div className='page'>
            <div className='BarreDéroulé'>
                {exigences.map((exige)=>(
                    <h4 className='IdExigences' onClick={(e)=>toggleVisibility(e,exige.Id)}>{exige.Id}</h4>
                ))}
            </div>
                   
            <div className='ExigenceDescription'>
            
            
            {UneExigence.map((exige)=>(
                <div>
                <h3>{exige.Id} | {exige.Nom}</h3>
                <div className='Exigences_parties'>
                   
                   <div className='Part1'>
                   
                    <h4 className='NamePart'>Exigences<br/></h4>
                    <span className='TexteParties'>{exige.Exigence}<br/></span>
                    <h4 className='NamePart'>Guide Complet<br/></h4>
                    <h4 className='NamePart'>Guide Abrégé<br/></h4>
                    <div className='TexteGuideAbregee'>
                    <span >{(exige.GuideAbrege)}</span>
                    </div>
                    </div>

                    <div className='Part2'>
                    
                        <div>
                            <h4 className='NamePart'>Objectif<br/></h4>
                            <span className='TexteParties'>{exige.Obj}<br/></span>

                            <h4 className='NamePart'>Observations de l'auditeur</h4>

                            <form action="submit" onSubmit={ModifyObserv}  >
                            <input className='TextArea' value={Observ}type="text" placeholder={exige.Observation} onChange={handleChange}/>
                            <button Classname="BoutonObserv">Ajouter Observations</button>
                            </form>
                
                       </div>

    
    </div>
             

                </div>
                
                <div className='SelectionMesures'>
                    <h4 className='NamePart'>Evaluation de la maturité </h4>
                    <TableauNiveau />
                    <h4 className='NamePart'>Aide à la sélection de mesures</h4>
                </div>
                
                </div>

                
))}

</div></div>
        </div>
    );}
    else{
        return (
            <div >
            <h1 className='TITLE'>Exigences</h1>
            <div className='page'>
            <div className='BarreDéroulé'>
                {exigences.map((exige)=>(
                    <h4 className='IdExigences' onClick={toggleVisibility}>{exige.Id}</h4>
                ))}
            </div>
            </div>
            </div>

        );
    }
};

export default Exigences;