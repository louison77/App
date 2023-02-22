import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Admin = () => {
    const baseUrl = '/api/Utilisateur'
    const [newmanager, setmanager] = useState("");
    const [Users, setUsers] = useState([])

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${baseUrl}`)
            const retrievedUser = response.data.users;
            const tab = []
            retrievedUser.forEach(user => {
                if (user.role === "Manager") {
                    tab.push({
                        Mail: user.mail
                    })
                }

            })
            setUsers(tab)
        }
        getUser()

    }, [newmanager])
    const handleChange = (event) => {
        setmanager(event.target.value);
    };
    const handleSubmit = (event) => {
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
    return (
        <div>
            <div>
                <h1>Gestion des chefs de projet</h1>
                <div>
                    <form className="FormManager" action="submit" onSubmit={handleSubmit}>
                        <input className='ManagerInput' value={newmanager} type="text"
                            placeholder="Email du chef de projet"
                            onChange={handleChange}>
                        </input>
                        <button className="AddManager">Nouveau Chef de Projet</button>

                    </form>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <th>Mail Chef de Projet</th>
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
            </div>

        </div>
    );
};

export default Admin;