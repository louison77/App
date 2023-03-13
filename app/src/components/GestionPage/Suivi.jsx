import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useOutletContext } from "react-router-dom";
import "../../styles/components/GestionStyle/_suivi.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css"
import Confirmation from '../AccueilPage/Confirmation';

const Suivi = () => {
    const [code] = useOutletContext();
    const baseUrl = "/api/Projet"
    const baseUrl2 = "/api/Utilisateur"
    const [alluser, setalluser] = useState([])
    const [newauditeur, setauditeur] = useState("");
    const [auditeursprojet, setauditeursprojet] = useState([]);
    const [Refresh, setRefresh] = useState("");
    const [confirmation, setconfirmation] = useState({
        message: "",
        isLoading: false,
        NameConfirmation: ""
    })
    const HandleConfirmation = (message, isLoading, NameConfirmation) => {
        setconfirmation({
            message, isLoading, NameConfirmation
        })
    }
    const handleDelete = (id) => {
        HandleConfirmation("Voulez-vous supprimer cet auditeur?", true, id);

    }

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
            try {
                const response = await axios.get(`${baseUrl2}`)
                const retrievedUser = response.data.users;
                const tab = []
                retrievedUser.forEach(element => {
                    if (element.role === "Auditeur" || element.role === "Manager") {

                        tab.push(element.mail)

                    }

                })
                setalluser(tab)
            }
            catch (error) {

            }

        }
        getProject()
    }, [code, Refresh])
    const handleSubmit = (event) => {
        event.preventDefault();
        const sendauditeur = async () => {
            if (newauditeur !== "" && (!auditeursprojet.includes(newauditeur))) {
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
                try {
                    axios.post(`${baseUrl2}`, {
                        mail: newauditeur,
                        role: "Auditeur"
                    }, {
                        'Content-Type': 'application/json'
                    })
                }
                catch (error) {

                }
                setRefresh("1")
            }
        }
        sendauditeur()
        setauditeur("")

    }
    const deleteAuditeurs = (Aname, test) => {
        if (test) {
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
            HandleConfirmation("", false);
        }
        else {
            HandleConfirmation("", false);
        }

    }

    return (
        <div>

            <div className='AjoutArea'>
                <h2> Gestion auditeurs du projet : </h2>
                <form className="FormAuditeur" action="submit" onSubmit={handleSubmit}>

                    <Combobox
                        //busy={setalluser}
                        className='Combobutton'
                        data={alluser}
                        textField="mail"
                        value={newauditeur}
                        onChange={setauditeur}
                        hideEmptyPopup
                    //hideCaret
                    />
                    <button className="Addauditeur">Nouvel auditeur</button>

                </form>
                <div className='TexteAuditeur'>
                    <p>Vous pouvez soit ajouter un auditeur déjà existant soit en créer un en tapant son adresse mail.</p>
                </div>


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
                                    <btn onClick={() => handleDelete(auditeur)} className="BtnSupress">X</btn>
                                </div>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            {confirmation.isLoading && (
                <Confirmation OnConfirmation={deleteAuditeurs} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
            )

            }



        </div>)
};
export default Suivi;

