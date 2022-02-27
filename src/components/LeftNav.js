import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" activeClassName="active-left-nav">
            <img src="https://cutt.ly/gOHnsY6" alt="img" />
          </NavLink>
          <br />

          <NavLink to="/profil" activeClassName="active-left-nav">
            <img src="https://cutt.ly/zOHnMDU" alt="img" />
          </NavLink>
          <br />

          <NavLink to="/trending" activeClassName="active-left-nav">
            <img src="https://cutt.ly/0OHmxQb" alt="img" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
