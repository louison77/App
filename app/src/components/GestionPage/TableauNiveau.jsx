import React from 'react';
import '../../styles/components/GestionStyle/_tableauniveau.css';
const TableauNiveau = () => {
    return (
        <div>
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
            
        </div>
    );
};

export default TableauNiveau;