import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Gestion = () => {
    return (
        <div>
            <Navbar/> 
            <Link to="/"><button><ion-icon classname='btnhome' name="home-outline"></ion-icon></button></Link>
        </div>
    );
};

export default Gestion;