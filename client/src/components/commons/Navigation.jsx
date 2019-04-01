import React, { useState } from "react";
import Search from "../commons/Search";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
const NavBar = (props) => {
  const [showNav, setShowNav] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const toggleSearch = () => {
    setDisplaySearch(!displaySearch);
  };
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  const  signOut = () => {
    props.signOut();
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
            <NavLink exact={true} to="/" >
              <i className="fas fa-home" /> Home
            </NavLink>
            <a
              href="#search"
              onClick={event => {
                event.preventDefault();
                toggleSearch();
              }}
            >
              <i className="fas fa-search" /> Search
            </a>
            <NavLink to="/add-entry" >
              <i className="fas fa-edit" /> New
            </NavLink>
            <NavLink to="/profile" >
              <i className="fas fa-user"/> Profile
            </NavLink>
            <NavLink  to="#?" onClick={signOut}>
              <i className="fas fa-sign-out-alt" /> Logout
            </NavLink>
          </div>
        </div>
      </div>
      <Search displaySearch={displaySearch} closeSearch={toggleSearch} />
    </>
  );
};

export default connect(
    null,
    { signOut }
  )(NavBar);