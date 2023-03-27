import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
const BoutonProfil = (props) => {
  //Url de redirection vers vers la page d'authentification 
  const redirect = window.location.pathname;

  //permet de se déconnecter en changeant l'utilisateur à null avec la méthode qu'on a passer en attribut
  //On réinitialise le nom de l'utilisateur à zéro de la même façon
  //Et on met le booléen qui valide l'authentification à false `/.auth/logout?post_logout_redirect_uri=${redirect}` permet de se déconnecter et de se rediriger vers la page d'authentification
  //Dans le code html
  const HandleChange = () => {
    //
    props.ChangeUser(null);
    props.ChangeName("");
    props.ChangeAuth(false);
  };
  return (
    <div>
      <Dropdown>
        <DropdownToggle
          className="ProfilBtn"
          style={{ backgroundColor: "black", borderColor: "white" }}
        >
          <ion-icon name="person-outline"></ion-icon>
        </DropdownToggle>
        <DropdownMenu>
          <Dropdown.Item>
            <a
              href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}
              onClick={HandleChange}
            >
              Déconnexion
            </a>
          </Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default BoutonProfil;
