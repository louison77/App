import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Nav2 from '../components/Navbars/Nav2';
import '../styles/components/GestionStyle/_gestion.css'

const Gestion = () => {
    let { name } = useParams();
    let { state } = useLocation();
    const [usersend, setusersend] = useState("")
    useEffect(() => {

        if (state) {

            setusersend(state.Currentuser)

        }
    }, [state])

    return (
        <div>
            <Nav2 name={name} user={usersend} />
            <Outlet context={[name, usersend]} />

        </div>
    );
};

export default Gestion;