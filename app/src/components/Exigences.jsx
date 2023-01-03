import React from 'react';
import { useState } from 'react';
import '../styles/components/_exigences.css';

const Exigences = (props) => {
 
   
    //States
    const [exigences] =useState([
        {Id : "ORG 5.08", Nom:"Sécurité de l'information", Exigence : "Assure blabla", GuideComplet : "ggggg", GuideAbrege:"Doit inclure\n​a) identification et gestion des exigences de sécurité de l'information, du respect de la propriété intellectuelle, et des processus projetb) évaluation et traitement des risques de sécurité de l'information lors du projet\n​c) évaluation et traitement des risques de sécurité de l'information une fois le projet mis en place​d) tests des mesures de sécurité en pace​e) intégration de la sécurité de l'information au sein de toutes les phases de la méthodologie projet​",Obj:"Objectif 5.08"},
        {Id : "ORG 5.09",Nom: "Sécurité Gestion", Exigence : "Réalise machin", GuideComplet : "fhqhhf",GuideAbrege:"guide abreegeee", Obj:"Objectif 5.09"},
        {Id : "ORG 5.10",Nom: "Sécurité réseau", Exigence : "Gère le réseau de l'entreprise", GuideComplet : "fffff",GuideAbrege:"guide abreegeee", Obj:"Objectif 5.10"}
    
    ]);
    const [UneExigence,setUneExigence]=useState("");
    const [isSeen, setisSeen]=useState(false);
  //comportements
  

   const toggleVisibility =(event,ID) => {
    console.log(ID);
    const Copy=[]
    for(let i=0 ;i<exigences.length;i++){
        if(exigences[i].Id===ID)
        {
            Copy.push({Id: exigences[i].Id, Nom:exigences[i].Nom, Exigence:exigences[i].Exigence,GuideComplet: exigences[i].GuideComplet,GuideAbrege:exigences[i].GuideAbrege, Obj:exigences[i].Obj});
        }
    }
    setUneExigence(Copy);
    console.log(Copy)
    
    const value = true;
    setisSeen(value)
        ;

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
                    <span >{exige.GuideAbrege}</span>
                    </div>
                    </div>

                    <div className='Part2'>
                    
                        <div>
                            <h4 className='NamePart'>Objectif<br/></h4>
                            <span className='TexteParties'>{exige.Obj}<br/></span>

                            <h4 className='NamePart'>Observations de l'auditeur</h4>

                            <form action="submit"  >
                            <textarea className='TextArea' defaultValue="Observations"></textarea>
                            </form>
                
                       </div>

    
    </div>
             

                </div>
                <div className='SelectionMesures'>
                    <h4 className='NamePart'>Evaluation de la maturité </h4>
                    <table className='ChoixNiveaux'>
                        <thead>
                        <tr>
                            <th className='Basique'>Basique</th>
                            <th className='Moyenne'>Moyenne</th>
                            <th className='Elevee'>Elevée</th>
                            <th className='Televee'>Très élevée</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='Case'>
                                    <div className='CaseTable'>
                                        < input type="checkbox" />
                                        <p>Texte Basique niveau  </p>
                                    </div>
                                </td>
                                <td className='Case' >
                                    <div className='CaseTable'>
                                        < input type="checkbox" />
                                        <p>Texte Moyen niveau  </p>
                                    </div>
                                </td>
                                <td className='Case'>
                                    <div className='CaseTable'>
                                        < input type="checkbox" />
                                        <p>Texte Elevee niveau  </p>
                                    </div>
                                </td>
                                <td className='Case'>
                                    <div className='CaseTable'>
                                        < input type="checkbox" />
                                        <p>Texte Très Elevée niveau  </p>
                                    </div>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
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