import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Dropdown  from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
const BoutonProfil = () => {
    return (
        <div>
            <Dropdown>
                    <DropdownToggle className='ProfilBtn' style={{backgroundColor:'black', borderColor:'white'}}>
                        <ion-icon name="person-outline"></ion-icon>
                        </DropdownToggle>
                        <DropdownMenu>
                        <Dropdown.Item>
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Déconnexion
                        </Dropdown.Item>
                        </DropdownMenu>
                    
                    
                    </Dropdown>
        </div>
    );
};

export default BoutonProfil;