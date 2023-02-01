import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbars/Navbar';
import TableP from '../components/AccueilPage/TableP';
import Authent from './Authent.js';

const Accueil = () => {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState('coucou');
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

            const newtask = []
            const response = await fetch('/api/Cosmo');
            const retrievedData = await response.json();
            const retrievedTasks = retrievedData.data;
            // Loop through all tasks
            for (let task of retrievedTasks) {
                // Add each task to the array
                newtask.push(task);
            }
            setTasks(newtask);
            console.log(tasks);

        }
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