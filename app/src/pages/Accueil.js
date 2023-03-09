import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/Navbar';
import TableP from '../components/AccueilPage/TableP';
import Authent from './Authent.js';
import Admin from '../components/AccueilPage/Admin'
import axios from 'axios'

const Accueil = () => {

    const [isAuthenticated, userHasAuthenticated] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setrole] = useState("");
    const baseUrl = '/api/Utilisateur'


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



    else {
        return (
            <div>
                <Authent />
            </div>
        )
    }

};

export default Accueil;