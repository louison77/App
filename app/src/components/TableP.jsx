import React from 'react';
import '../styles/components/_tableP.css'


const projets =[
    {Nom : "Acme",Id: 298-52, StatutAudit : "Terminé", StatutPA : "Terminé"},
    {Nom : "Orange",Id: 278-40, StatutAudit : "Terminé", StatutPA : "En cours"}
];


const table = () => {
    return (
        
            
        <div>
            <table className='TableProjects'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Id</th>
                        <th>Statut Audit</th>
                        <th>Statut PA</th>
                    </tr>
                

                </thead>
                <tbody>
                    {projets.map((project) =>(
                        <tr>
                            <button><td>{project.Nom}</td></button>
                            <td>{project.Id}</td>
                            <td>{project.StatutAudit}</td>
                            <td>{project.StatutPA}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default table;