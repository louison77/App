import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";
import "../../styles/components/GestionStyle/_suivi.css";

const Suivi = () => {
    const [code] = useOutletContext();
    const baseUrl = "/api/Projet"
    const [newauditeur, setauditeur] = useState("");
    const [auditeursprojet, setauditeursprojet] = useState([]);
    const [Refresh, setRefresh] = useState("");


    useEffect(() => {
        const getProject = async () => {
            try {

                const response = await axios.get(`${baseUrl}`);
                const retrievedProject = response.data.projets;
                retrievedProject.forEach(projet => {

                    if (projet.projetid === code) {
                        const NewProject = projet.auditeur
                        setauditeursprojet(NewProject)

                    }
                })
            }
            catch (error) {
                console.log(error)
            }

        }
        getProject()
    }, [code, Refresh])
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
                setRefresh("1")
            }
        }
        sendauditeur()
        setauditeur("")

    }
    const deleteAuditeurs = (Aname) => {

        const deleteA = async () => {
            const response = await axios.get(`${baseUrl}`)
            const retrievedProject = response.data.projets;
            var tab = []
            for (const element of retrievedProject) {
                if (element.projetid === code) {
                    tab = element.auditeur;
                }
            }
            const index = tab.indexOf(Aname);
            tab.splice(index, 1)
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
            setRefresh("2")

        }
        deleteA()
    }
    return (
        <div>

            <div className='AjoutArea'>
                <h2> Gestion auditeurs du projet : </h2>
                <form className="FormAuditeur" action="submit" onSubmit={handleSubmit}>
                    <input className='AuditeurInput' value={newauditeur} type="text"
                        placeholder="Ajouter un nouvel auditeur au projet"
                        onChange={handleChange}>
                    </input>
                    <button className="Addauditeur">Nouvel auditeur</button>

                </form>
            </div>
            <div className='TableAuditeurs'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Auditeurs</th>

                        </tr>
                    </thead>
                    <tbody>
                        {auditeursprojet.map((auditeur) =>
                            <tr className='RowTable' >
                                <td >
                                    {auditeur}
                                </td>
                                <div>
                                    <btn onClick={() => deleteAuditeurs(auditeur)} className="BtnSupress">X</btn>
                                </div>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>


        </div>)
};
export default Suivi;

