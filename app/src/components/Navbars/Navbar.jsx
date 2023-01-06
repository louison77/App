import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Dropdown  from 'react-bootstrap/Dropdown';
import '../../styles/components/NavbarsStyle/_navbar.css'

const Navbar = () => {
    
    let dropDownStyle = {
        color: 'white'
      };
    
        return (
            <div>
        
            <div className='navbar1'>
            <div className='leftpart'>
                <img src="./logoorange.jpg" className='logoorange' alt="logo orange" />
             
            </div>
            <div className='centerpage'>
                <span className='Title'>Application feuille de route</span> 
            </div>
            
            <div className='rightpart'>
                
                <div className='profil'>
                <Dropdown>
                    <Dropdown.Toggle style={dropDownStyle}>
                        <ion-icon name="person-outline"></ion-icon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Déconnexion
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    
                    </Dropdown>
                    
                </div>
            </div>
        </div>
        
        </div>
        );
    
    
    
};

export default Navbar;