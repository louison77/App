import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/NavbarsStyle/_navbar.css";
import BoutonProfil from "./BoutonProfil";

const Navbar = (props) => {
  const [name, setName] = React.useState("");
  useEffect(() => {
    if (props.user && props.user?.userDetails) {
      setName(props.user?.userDetails);
    }
  }, [props.user]);
  return (
    <div>
      <div className="navbar1">
        <div className="leftpart">
          <img
            src="./logoorange.jpg"
            className="logoorange"
            alt="logo orange"
          />

          <span>{name}</span>
        </div>
        <div className="centerpage">
          <span className="Title">Application feuille de route</span>
        </div>

        <div className="rightpart">
          <div className="profil">
            <BoutonProfil
              ChangeName={setName}
              ChangeUser={props.ChangeUser}
              ChangeAuth={props.ChangeAuth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
