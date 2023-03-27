import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/Navbar';
import TableP from '../components/AccueilPage/TableP';
import Authent from './Authent.js';
import Admin from '../components/AccueilPage/Admin'
import axios from 'axios'

const Accueil = () => {
    //Variable qui teste si l'utilisateur est authentifié avec soit github soit azure
    const [isAuthenticated, userHasAuthenticated] = useState(true);
    //Objet contenant les informations de connexion de l'utilisateur
    const [user, setUser] = useState(null);
    //role de l'utilisateur
    const [role, setrole] = useState("");
    //Url de l'api Utilisateur
    const baseUrl = '/api/Utilisateur'

    //UseEffect récupérant les informations de la page auth/me d'authentification et s'effectuant qu'au premier chargement de la page
    useEffect(() => {
        async function getUserInfo() {
            try {

                const response = await fetch('/.auth/me');
                const payload = await response.json();
                const { clientPrincipal } = payload;

                if (clientPrincipal) {
                    setUser(clientPrincipal);
                    userHasAuthenticated(true);
                }

            } catch (error) {
                console.error('No profile could be found ' + error?.message?.toString());
            }

        };
        getUserInfo();



    }, []);
    //UseEffect récupérant le rôle de l'utilisateur venant de se connecter, il set la variable role
    useEffect(() => {
        async function getAuthorizeduser() {
            try {
                const response2 = await axios.get(`${baseUrl}`)
                const retrievedusers = response2.data.users;

                retrievedusers.forEach(element => {
                    if (user != null && element.mail === user.userDetails) {

                        setrole(element.role)


                    }

                });
            }
            catch (error) {
                console.log(error)
            }
        }
        getAuthorizeduser()

    }, [role, user])

    //Selon le rôle la page affichée ne sera pas la même
    //Auditeur ou Manager va appeler Navbar et le composant TableP avec les paramètres ci-dessous
    //Admin va appeler la Navbar et le composant Admin

    if (isAuthenticated && (role === "Manager" || role === "Auditeur")) {
        return (
            <div>
                <Navbar user={user} Changeuser={setUser} ChangeAuth={userHasAuthenticated} />
                <TableP user={user} role={role} />

            </div>
        );
    }
    if (isAuthenticated && role === "Admin") {
        return (
            <div>
                <Navbar user={user.userDetails} Changeuser={setUser} ChangeAuth={userHasAuthenticated} />
                <Admin username={user} />

            </div>
        );
    }

    //Si l'utilisateur ne correspond à aucun des critères tester il est redirigé vers la page de connexion en appelant le composant Authent

    else {
        return (
            <div>
                <Authent />
            </div>
        )
    }

};

export default Accueil;