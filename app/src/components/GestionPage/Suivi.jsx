import React, { useState } from 'react';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";

const Suivi = () => {
    const [code] = useOutletContext();
    const baseUrl = "/api/Projet"
    const [newauditeur, setauditeur] = useState("");
    const handleChange = (event) => {
        setauditeur(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const sendauditeur = async () => {
            if (newauditeur !== "") {
                const response = await axios.get(`${baseUrl}`)
                const retrievedProject = response.data.projets;
                var tab = []
                for (const element of retrievedProject) {
                    if (element.projetid === code) {
                        tab = element.auditeur;
                    }
                }
                tab.push(newauditeur);
                try {
                    axios.patch(`${baseUrl}`, {
                        projetid: code,
                        auditeur: tab,

                    }, {
                        'Content-Type': 'application/json'
                    },).then(function (response) {
                        console.log(response);
                    })
                }
                catch (error) {
                    console.log()
                }
            }
        }
        sendauditeur()
    }
    return (
        <div>
            <div>
                <form action="submit" onSubmit={handleSubmit}>
                    <input value={newauditeur} type="text"
                        placeholder="Ajouter un nouvel auditeur au projet"
                        onChange={handleChange}>
                    </input>

                </form>
            </div>
        </div>)
};
export default Suivi;
