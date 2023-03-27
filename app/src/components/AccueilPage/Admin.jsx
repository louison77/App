import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../../styles/components/AccueilStyle/_Admin.css";
import Confirmation from './Confirmation';

const Admin = (props) => {
    //Url de l'api contenant les utilsateurs de l'application web
    const baseUrl = '/api/Utilisateur'
    //Variable contenant la chaine de caractère du nouveau manager, initialisée vide, setmanager est une fonction permettant de changer cette valeur avec usestate
    const [newmanager, setmanager] = useState("");
    //Tableau contenant les managers de l'app, initialisé vide
    const [Users, setUsers] = useState([])
    //Variable contenant la chaine de caractère du nouvel admin, initialisée vide
    const [newadmin, setadmin] = useState("")
    //Tableau contenant les admin de l'app, initialisé vide
    const [Adminstab, setAdmintab] = useState([])

    //Code pour le popup de confirmation de suppression
    const [confirmation, setconfirmation] = useState({
        message: "",
        isLoading: false,
        NameConfirmation: ""
    })
    //Fonction changeant les paramètres de confirmation, message est le message à afficher, isLoading un booléen (true le popup est affiché et false non) NameConfirmation est le "nom" de l'utilisateur
    const HandleConfirmation = (message, isLoading, NameConfirmation) => {
        setconfirmation({
            message, isLoading, NameConfirmation
        })
    }
    //Fonction réalisant le changement avec id qui est l'id de l'user, Msg un message à afficher et true pour permettre d'afficher le popup
    const handleDelete = (id, Msg) => {
        HandleConfirmation(Msg, true, id);

    }
    //Dans ce UseEffect on récupère les infos de la bdd Utilisateur à l'aide d'une fonction asynchrone qui sélectionne que les admin et les Manager
    //Le UseEffect se réactualise à chque fois que newmanager, newadmin ou confirmation est modifié
    useEffect(() => {
        const getUser = async () => {

            const response = await axios.get(`${baseUrl}`)
            const retrievedUser = response.data.users;
            const tab = []
            const tabadmin = []
            retrievedUser.forEach(user => {
                if (user.role === "Manager") {
                    tab.push({
                        Mail: user.mail
                    })
                }
                if (user.role === "Admin") {
                    tabadmin.push({
                        Mail: user.mail
                    })
                }

            })
            setUsers(tab)
            setAdmintab(tabadmin)
        }
        getUser()

    }, [newmanager, newadmin, confirmation])
    //Modifie la valeur de newmanager à chaque entrée dans le form
    const handleChange = (event) => {
        setmanager(event.target.value);
    };
    //Modifie la valeur de newmadmin à chaque entrée dans le form
    const handleChange2 = (event) => {
        setadmin(event.target.value)
    }

    //Fonction qui créée un nouveau mananger ou admin à l'aide d'une requête post vers l'api Utilisateur
    //Si number est égal à 1 on crée un manager et 2 un admin
    //On reset la valeur de newmanager ou newadmin à la fin de cette fonction
    const handleSubmit = (event, number) => {
        if (number === 1) {
            event.preventDefault();
            if (newmanager !== "") {
                const CreateManager = async () => {
                    try {
                        await axios.post(`${baseUrl}`, {
                            mail: newmanager,
                            role: "Manager"
                        }, {
                            'Content-Type': 'application/json'
                        })
                    }
                    catch (error) {
                        console.log(error)
                    }

                }
                CreateManager();
                setmanager("")

            }

        }
        if (number === 2) {
            event.preventDefault();
            if (newadmin !== "") {
                const CreateAdmin = async () => {
                    try {
                        await axios.post(`${baseUrl}`, {
                            mail: newadmin,
                            role: "Admin"
                        }, {
                            'Content-Type': 'application/json'
                        })
                    }
                    catch (error) {
                        console.log(error)
                    }

                }
                CreateAdmin();
                setadmin("")
            }
        }


    }

    //Fonction qui va delete un Utilisateur depuis les arguments du pop up
    //name correspond est un mail d'un admin contenu dans admintab, on peut supprimer un admin que si l'utilisateur n'est pas cet admin et qu'il y a toujours plus de 2 admin après suppression
    //Dans les autres cas cela signifie qu'on supprime un manager et on appelle alors la fonction DeleteOne
    //On appelle la fonction HandleConfirmation pour réinitialiser l'objet confirmation et ne faire disparaitre le popup
    const DeleteUser = (name, test) => {
        var isadmin = false
        Adminstab.forEach(element => {
            if (element.Mail === name) {
                isadmin = true
            }
        })
        const DeleteOne = async () => {
            try {
                await axios.delete(`${baseUrl}`, {
                    data: {
                        mail: name,
                    }
                }, {
                    'Content-Type': 'application/json'
                })
            }
            catch (error) {
                console.log(error)
            }
        }
        if (test && isadmin && props.username.userDetails !== name && Adminstab.length > 2) {

            DeleteOne()
            HandleConfirmation("", false);

        }
        else if (test && isadmin === false) {
            DeleteOne()
            HandleConfirmation("", false);
        }
        else {
            HandleConfirmation("", false);
        }
    }

    return (
        <div>
            <div className='GestionManager'>
                <div>
                    <h1 className='TitleGestion'>Gestion des chefs de projet</h1>
                    <div>
                        <form className="FormManager" action="submit" onSubmit={(e) => handleSubmit(e, 1)}>
                            <input className='ManagerInput' value={newmanager} type="text"
                                placeholder="Email du chef de projet"
                                onChange={handleChange}>
                            </input>
                            <button className="AddManager">Nouveau Chef de Projet</button>

                        </form>
                    </div>
                </div>
                <div>
                    <h1>Gestion des Admins</h1>
                    <div>
                        <form className="FormManager" action="submit" onSubmit={(e) => handleSubmit(e, 2)}>
                            <input className='ManagerInput' value={newadmin} type="text"
                                placeholder="Email de l'admin"
                                onChange={handleChange2}>
                            </input>
                            <button className="AddManager">Nouvel Admin</button>

                        </form>
                    </div>
                </div>
            </div>

            <div className='Managers'>
                <table className='tableManager' >
                    <thead>
                        <th style={{ textAlign: "center" }}>Mail Chef de Projet</th>

                    </thead>
                    <tbody>
                        {
                            Users.map((user) => (

                                <tr>
                                    <td>
                                        {user.Mail}
                                    </td>
                                    <div><button onClick={() => handleDelete(user.Mail, "Voulez-vous supprimer ce Chef de projet")} className="Boutondeleted">X</button></div>
                                </tr>
                            ))}

                    </tbody>
                </table>
                <table className='tableAdmin' >
                    <thead>
                        <th style={{ textAlign: "center" }}> Mail Admin</th>
                    </thead>
                    <tbody>
                        {
                            Adminstab.map((admin) => (

                                <tr>

                                    <td>
                                        {admin.Mail}
                                    </td>
                                    <div><button onClick={() => handleDelete(admin.Mail, "Voulez-vous supprimer cet admin")} className="Boutondeleted">X</button></div>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
            {confirmation.isLoading && (
                <Confirmation OnConfirmation={DeleteUser} message={confirmation.message} NameConfirmation={confirmation.NameConfirmation} />
            )

            }
        </div>
    );
};

export default Admin;