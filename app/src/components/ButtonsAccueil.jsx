import React from 'react';
const ButtonsAccueil = () => {

    const handleSubmit = () =>{
        Event.preventDefault();
        alert("handleSubmit");
    };
    return (
        <div className='boutons'>
            <form action="submit" onSubmit={handleSubmit} >
                <input type="text" placeholder='Ajouter un projet'/>
                <button className='Button1'>Nouveau projet</button>
            </form>
            
            <button className='Button2'>Nouveau CdP</button>
        </div>
    );
};

export default ButtonsAccueil;