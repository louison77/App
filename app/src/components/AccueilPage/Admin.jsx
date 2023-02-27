import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../../styles/components/AccueilStyle/_Admin.css";

const Admin = () => {
    const baseUrl = '/api/Utilisateur'
    const [newmanager, setmanager] = useState("");
    const [Users, setUsers] = useState([])
    const [newadmin, setadmin] = useState("")
    const [Adminstab, setAdmintab] = useState([])

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

    }, [newmanager, newadmin])
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
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Admin;