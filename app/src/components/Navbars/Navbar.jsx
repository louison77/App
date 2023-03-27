import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/NavbarsStyle/_navbar.css";
import BoutonProfil from "./BoutonProfil";

const Navbar = (props) => {
  //Nom de l'utilsateur
  const [name, setName] = React.useState("");
  //On le set avec la propriete props qu'on a passé dans un attribut lors de l'appel de Navbar, il est modifié qu'en cas de modification de l'utilsiateur
  useEffect(() => {
    if (props.user && props.user?.userDetails) {
      setName(props.user?.userDetails);
    }
  }, [props.user]);
  /*<div className="centerpage">
          <span className="Title">Application feuille de route</span>
        </div>*/
  return (
    <div>
      <div className="navbar1">
        <div className="leftpart">
          <img
            src="./logoorange.jpg"
            className="logoorange"
            alt="logo orange"
          />

          <span className="MailID">{name}</span>
        </div>


        <div className="rightpart">
          <div className="profil">
            <BoutonProfil
              ChangeName={setName}
              ChangeUser={props.Changeuser}
              ChangeAuth={props.ChangeAuth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
