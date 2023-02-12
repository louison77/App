import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Nav2 from '../components/Navbars/Nav2';
import '../styles/components/GestionStyle/_gestion.css'

const Gestion = () => {
    let { name } = useParams();

    const location = useLocation();
    const [code, setcode] = useState("")
    useEffect(() => {
        console.log(location.state.Project)
        if (location.state.Project) {

            const newcode = location.state.Project

            setcode(newcode)

        }


    }, [])

    return (
        <div>

            <Nav2 name={name} />
            <Outlet context={[code]} />


        </div>
    );
};

export default Gestion;