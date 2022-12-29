import React from 'react';
import '../styles/components/_navbar.css'

const Navbar = () => {
    return (
        <div className='navbar1'>
        <div className='leftpart'>
            <img src="./logoorange.jpg" className='logoorange' alt="logo orange" />
         
        </div>
        <div className='centerpage'>
            <span className='Title'>Application feuille de route</span> 
        </div>
        
        <div className='rightpart'>
            
            <div className='profil'>
                <ion-icon name="person-outline"></ion-icon>
            </div>
        </div>
    </div>
    );
};

export default Navbar;