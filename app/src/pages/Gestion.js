import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Nav2 from '../components/Navbars/Nav2';
import '../styles/components/GestionStyle/_gestion.css'

const Gestion = () => {
    let { name } = useParams();


    return (
        <div>

            <Nav2 name={name} />
            <Outlet context={[name]} />

        </div>
    );
};
    
export default Gestion;