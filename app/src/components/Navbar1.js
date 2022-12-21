import React from 'react';
import '../styles/components/_accueil.scss'

const Navbar1 = () => {
    return (
        <div className='navbar1'>
            <div className='leftpart'>
                <img src="./logoorange.jpg" className='logoorange' alt="logo orange" />
                <ion-icon classname='btnhome' name="home-outline"></ion-icon>
                
            </div> 
            <div className='rightpart'>
                <h3>Navigation</h3>
                <div className='chevron'>
                    <ion-icon name="chevron-down-outline" ></ion-icon>
                </div>
                <div className='profil'>
                    <ion-icon name="person-outline"></ion-icon>
                </div>
            </div>
        </div>
    );
};

export default Navbar1;