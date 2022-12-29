import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/components/_nav2.css'

const Nav2 = () => {
    return (
        <div>
            <div className='navbar2'>
                <div className='leftpart'>
                <img src="./logoorange.jpg" className='logoorange' alt="logo orange" />

                <div> 
                    <Link to="/"><button className='ButtonHome'><ion-icon classname='btnhome' name="home-outline"></ion-icon></button></Link>
                </div>
                <span className='NameProject'> Project Name</span>
                </div>
                

                <div className='menu'>
                    <ul className='menu-liste'>
                            <Link to="/Gestion/Exigences" className='Menu-link'><li>Exigences</li></Link>
                            <Link to="/Gestion/Mesures" className='Menu-link'><li>Mesures</li></Link>
                            <Link to="/Gestion/Suivi" className='Menu-link'><li>Suivi</li></Link>
                            <Link to="/Gestion/Export" className='Menu-link'><li>Exportation</li></Link>
                    </ul>
                </div>
                <div className='rightpart'>
                <div className='profil'>
                    <ion-icon name="person-outline"></ion-icon>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Nav2;