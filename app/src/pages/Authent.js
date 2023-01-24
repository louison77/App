import React from 'react';

const Authent = () => {
    const provider="aad";
    const redirect=window.location.pathname;
    return (
        <div>
            <span><a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}><h4>{provider}</h4></a> </span>
        </div>
    );
};

export default Authent;