import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/Navbar';
import TableP from '../components/AccueilPage/TableP';
import Authent from './Authent.js';

const Accueil = () => {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        try {

            const response = await fetch('/.auth/me');
            const payload = await response.json();
            const { clientPrincipal } = payload;

            if (clientPrincipal) {
                setUser(clientPrincipal);
                userHasAuthenticated(true);
                console.log(`clientPrincipal = ${JSON.stringify(clientPrincipal)}`);
            }

        } catch (error) {
            console.error('No profile could be found ' + error?.message?.toString());
        }
    };
    useEffect(() => {
        getBDD();
    }
    )
    async function getBDD() {
        try {
            const response = await fetch('/api/hello');
            const json = await response.json();

            console.log(json)

        }
        catch (error) {
            console.error("It doesn't work")
        }
    }

    if (isAuthenticated) {
        return (
            <div>
                <Navbar user={user} Changeuser={setUser} ChangeAuth={userHasAuthenticated} />
                <TableP />

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