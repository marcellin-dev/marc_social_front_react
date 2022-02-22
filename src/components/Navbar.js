import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer) 
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/" activeClassName="nav-active">
            <div className="logo">
              <img src="https://cutt.ly/IOGtl70" alt="icon" />
              <h3>Network</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li> </li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5> Bienvenue {userData.pseudo} </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
                <NavLink to="/">
                    <img src="https://cutt.ly/MOGiskq" alt="erreur" />

                </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
