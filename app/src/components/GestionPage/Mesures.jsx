import React from 'react';


const Mesures = () => {
    //States
    const [mesures] =useState([
        {Id : "5.08.1.1.1", Nom:"Vidéo-surveillance dans la salle serveur", Action : "Mettre en place des caméras dans la salle serveur du siège d’Evry​", Maturite : "2", Priorite : "P1", Complexite : "++", CoutProjet : "5", CoutRun : "1", AideChiffrage : "", Porteur : "Service Généraux", DateDebut : "T2 2022", DateFin : "T4 2022", Statut : "Terminé", Macro : "Vidéo-Surveillance"},
        {Id : "5.08.1.1.2", Nom:"Vidéo-surveillance dans les dépôts", Action : "Mettre en place des caméras dans les zones d’arrivée de marchandise de chacun des 3 dépôts logistiques​​", Maturite : "2", Priorite : "P2", Complexite : "+", CoutProjet : "", CoutRun : "", AideChiffrage : "", Porteur : "Service Généraux", DateDebut : "T2 2022", DateFin : "T4 2022", Statut : "Terminé", Macro : "Vidéo-Surveillance"},
        {Id : "5.08.1.2.1", Nom:"PSSI"}
    
    ]);

    return (
        <div>
            <h1 className='TITLE'>Mesures</h1>

            <div className='page'>
            <div className='BarreDéroulé'>
                {exigences.map((exige)=>(
                    <h4 className='IdExigences' onClick={(e)=>toggleVisibility(e,exige.Id)}>{exige.Id}</h4>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Mesures;