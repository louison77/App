import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Nav2 from '../components/Navbars/Nav2';
import '../styles/components/GestionStyle/_gestion.css';


const Gestion = () => {
    //Le code projet
    let { name } = useParams();
    //State qui permet de récupérer des informations depuis la balise Link de tableP avec l'attribut state
    let { state } = useLocation();
    //Variable qui récupère l'utilisateur actuel via la fonction setusersend
    const [usersend, setusersend] = useState("")
    //UseEffect qui modifie la variable usersend au chargement de la page
    useEffect(() => {

        if (state) {

            setusersend(state.Currentuser)

        }
    }, [state])

    //On affiche la deuxième navbar Nav2 et un Outlet qui est comme un toggle, il peut afficher différente page selon l'url qu'on écrit où sur quels liens on est redirigé
    return (
        <div>
            <Nav2 name={name} user={usersend} />
            <Outlet context={[name, usersend]} />
        </div>
    );
};

export default Gestion;