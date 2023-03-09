import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../../styles/components/AccueilStyle/_Admin.css";
import Confirmation from './Confirmation';

const Admin = (props) => {
    const baseUrl = '/api/Utilisateur'
    const [newmanager, setmanager] = useState("");
    const [Users, setUsers] = useState([])
    const [newadmin, setadmin] = useState("")
    const [Adminstab, setAdmintab] = useState([])

    //Code pour le popup de confirmation de suppression
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
    const handleDelete = (id, Msg) => {
        HandleConfirmation(Msg, true, id);

    }

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
    const handleChange = (event) => {
        setmanager(event.target.value);
    };
    const handleChange2 = (event) => {
        setadmin(event.target.value)
    }
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
    const DeleteUser = (name, test) => {
        if (test && props.username.userDetails !== name) {
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
                <table className='tableManager' >
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