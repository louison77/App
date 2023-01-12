import React from 'react';
import { Link } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import '../../styles/components/NavbarsStyle/_nav2.css';
import BoutonProfil from './BoutonProfil';

const Nav2 = () => {
    return (
        <div>
            <div className='navbar2'>
                <div className='leftpart'>
                <img src="./logoorange.jpg" className='logoorange' alt="logo orange" />

            
                    <Link to="/"><Button style={{backgroundColor:'orange', borderColor:'orange'}} ><ion-icon classname='btnhome' name="home-outline"></ion-icon></Button></Link>
                
                <span className='NameProject'> Project Name</span>
                </div>
                

                <div className='menu'>
                    <ul className='menu-liste'>
                            <Link to="/Gestion/Resume" className='Menu-link'><li>Résumé</li></Link>
                            <Link to="/Gestion/Exigences" className='Menu-link'><li>Exigences</li></Link>
                            <Link to="/Gestion/Mesures" className='Menu-link'><li>Plan d'actions</li></Link>
                            <Link to="/Gestion/Suivi" className='Menu-link'><li>Suivi</li></Link>
                            <Link to="/Gestion/Export" className='Menu-link'><li>Exportation</li></Link>
                    </ul>
                </div>
                <div className='rightpart'>
                <div className='profil'>
                    <BoutonProfil/>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Nav2;