import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
const BoutonProfil = () => {
  const redirect = "/";
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
          <Dropdown.Item>Profil</Dropdown.Item>
          <Dropdown.Item>
            <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
              Déconnexion
            </a>
          </Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default BoutonProfil;
