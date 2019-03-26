import React, { useState } from 'react';
import Search from "../commons/Search";

 const NavBar=()=> {
    const [showNav, setShowNav] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const toggleSearch = () => {
        setDisplaySearch(!displaySearch);
      };
    const toggleNav = ()=>{
        setShowNav(!showNav)
    }
    return (
        <>
<div className="header-container">
    <div className="top-nav-container">
        <div className="logo">
            <h1>MY-DIARY</h1>
        </div>
        <div className={showNav?"change":"menu-icon"} onClick={toggleNav}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
        <div className={showNav?"show-topnav":"topnav"}>
            <a href="homepage.html" className="active"><i className="fas fa-home"></i> Home</a>
            <a href="#search" onClick={event => {
              event.preventDefault();
              toggleSearch();
            }}><i className="fas fa-search"></i> Search</a>
            <a href="add-entry.html"><i className="fas fa-edit"></i> New</a>
            <a href="profile.html"><i className="fas fa-user"></i> Profile</a>
            <a href="index.html"><i className="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </div>
</div>
<Search displaySearch={displaySearch} closeSearch={toggleSearch} />
        </>
    )
}
export default NavBar