import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav2 from '../components/Nav2';

import '../styles/components/_gestion.css'

const Gestion = () => {
    return (
        <div>
            <Nav2/>
            
            <Outlet/>
                
            
        </div>
    );
};

export default Gestion;