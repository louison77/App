import React from 'react';
import "../../styles/components/AccueilStyle/_confirmation.css";

const Confirmation = ({ message, OnConfirmation, NameConfirmation }) => {
    return (
        <div onClick={() => OnConfirmation(NameConfirmation, false)} className='Box'>
            <div className='Container'>
                <h3 style={{ fontsize: "20px" }}>{message}</h3>
                <h1 style={{ fontsize: "24px" }}>{NameConfirmation}</h1>

                <div className='ButtonsSelect'>
                    <button onClick={() => OnConfirmation(NameConfirmation, true)} className='BoutonYes'>
                        Oui
                    </button>
                    <button onClick={() => OnConfirmation(NameConfirmation, false)} className='BoutonNo'>
                        Non
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Confirmation;