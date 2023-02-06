import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/Navbar';
import TableP from '../components/AccueilPage/TableP';
import Authent from './Authent.js';
import axios from 'axios';

const Accueil = () => {
    const baseUrl = '/api/SousExigence';
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks] = useState('coucou');
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
        const getBDD = async () => {
            try {
                //const newtask = []
                const response = await axios.get(`${baseUrl}`);
                const retrievedTasks = response.data;
                console.log(retrievedTasks);

                // Add each task to the array


                //setTasks(newtask);


            }
            catch (error) {
                console.log(error)
            }

        }
        const ChangeBdd = async () => {
            try {
                await axios.post(`${baseUrl}`, {
                    sousexigenceid: "XXXX",
                    exigenceid: "XXXX2",
                    projetid: "XX",
                    libelle: "blabla",
                    descriptif: "coucou",
                    maturite: 2
                }, {
                    'Content-Type': 'application/json'
                },)

            }
            catch (error) {
                console.log(error);
            }
        }

        ChangeBdd();
        getBDD();

    }, [tasks]);




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