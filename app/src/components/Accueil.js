import React from 'react';

    const projets =[
        {Nom : "Acme",Id: 298-52, StatutAudit : "Terminé", StatutPA : "Terminé"},
        {Nom : "Orange",Id: 278-40, StatutAudit : "Terminé", StatutPA : "En cours"}
    ];


const Accueil = () => {
    return (
        <div className='Main'>
        <div className='boutons'>
            <button className='Button1'>Nouveau projet</button>
            <button className='Button2'>Nouveau CdP</button>
            
        </div>
        <ul className='firstLine'>
            <li>Nom</li>
            <li>Id</li>
            <li>StatutAudit</li>
            <li>StatutPA</li>
            </ul>
        <div className='AccueilListe'> 
     
        <ul>
        {projets.map((projet) => ( 
                <div className='Rowliste'>
                    <li className='Element'>{projet.Nom }</li> 
                    <li className='Element'>{projet.Id}</li>
                    <li className='Element'>{projet .StatutAudit}</li> 
                    <li className='Element'>{projet.StatutPA}</li>

            </div>
            ))}
        </ul>

    </div>
    </div>
    );
};

export default Accueil;