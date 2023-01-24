import React from 'react';
import "../styles/components/AccueilStyle/_authent.css";

const Authent = () => {
    const provider="aad";
    const redirect=window.location.pathname;
    return (
        <div className='Home'>
            <div div className='Navbar'>
                <img
                src="../logoorange.jpg"
                className="logoorange"
                alt="logo orange"
                />
            </div>
            <div className='page'>
                <div className='ConnexionArea'>
                        <button className='ConnexionBtn'><span><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}><h4>Se connecter avec Azure AD</h4></a> </span></button>
                </div>
            </div>
            
        </div>
    );
};

export default Authent;