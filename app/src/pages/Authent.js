import React from 'react';
import "../styles/components/AccueilStyle/_authent.css";

const Authent = () => {
    const provider = "aad";
    const provider2 = "github"
    const redirect = window.location.pathname;
    return (
        <div className='Home'>
            <div div className='Navbar'>
                <img
                    src="../logoorange.jpg"
                    className="logoorange"
                    alt="logo orange"
                />
            </div>
            <div className='pageHome'>
                <div className='ConnexionArea'>
                    <button className='ConnexionBtn'><span><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}><h4>Se connecter avec Azure AD</h4></a> </span></button>
                    <button className='ConnexionBtn'><span><a key={provider2} href={`/.auth/login/${provider2}?post_login_redirect_uri=${redirect}`}><h4>Se connecter avec Github</h4></a> </span></button>
                </div>
            </div>

        </div>
    );
};

export default Authent;