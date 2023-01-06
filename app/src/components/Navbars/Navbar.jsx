import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/components/NavbarsStyle/_navbar.css'
import BoutonProfil from './BoutonProfil';

const Navbar = () => {
    
    
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
                <BoutonProfil/>
                    
                </div>
            </div>
        </div>
        
        </div>
        );
    
    
    
};

export default Navbar;