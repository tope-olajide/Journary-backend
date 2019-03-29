import React, { useState } from "react";
import Search from "../commons/Search";
import { Route, Link } from "react-router-dom";
const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const toggleSearch = () => {
    setDisplaySearch(!displaySearch);
  };
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <div className="header-container">
        <div className="top-nav-container">
          <div className="logo">
            <h1>MY-DIARY</h1>
          </div>
          <div className={showNav ? "change" : "menu-icon"} onClick={toggleNav}>
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
          <div className={showNav ? "show-topnav" : "topnav"}>
            <Link to="/" className="active">
              <i className="fas fa-home" /> Home
            </Link>
            <a
              href="#search"
              onClick={event => {
                event.preventDefault();
                toggleSearch();
              }}
            >
              <i className="fas fa-search" /> Search
            </a>
            <Link to="/add-entry">
              <i className="fas fa-edit" /> New
            </Link>
            <Link to="/profile">
              <i className="fas fa-user" /> Profile
            </Link>
            <Link to="/logout">
              <i className="fas fa-sign-out-alt" /> Logout
            </Link>
          </div>
        </div>
      </div>
      <Search displaySearch={displaySearch} closeSearch={toggleSearch} />
    </>
  );
};
export default NavBar;
