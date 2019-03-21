import React, { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SignInForm";
import Search from "../commons/Search";
import Main from "./Main";
import Intro from "./Intro";
import Footer from "../commons/Footer";
function Authpage() {
  const [showSignup, setShowSignup] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const toggleSignup = () => {
    if (showSignin) {
      setShowSignup(true);
      setShowSignin(false);
    }
    return setShowSignup(true);
  };
  const toggleSignin = () => {
    if (showSignup) {
      setShowSignup(false);
      setShowSignin(true);
    }
    return setShowSignin(true);
  };
  const toggleSearch = () => {
    setDisplaySearch(!displaySearch);
  };
  return (
    <>
      <Search displaySearch={displaySearch} closeSearch={toggleSearch} />
      <div class="header">
        <div class="auth-header">
          <div class="logo">
            <h1>
              <i class="fas fa-book-open" /> MY-DIARY
            </h1>
          </div>
          <div class="auth-nav">
            <a href="#login" onClick={toggleSignin}>
              <i class="fas fa-sign-in-alt" /> Login
            </a>
            <a href="#signup" onClick={toggleSignup}>
              <i class="fas fa-user-plus" /> Sign Up
            </a>
            <a href="#signup" onClick={toggleSearch}>
              <i class="fas fa-user-plus" /> search
            </a>
          </div>
        </div>
        <div class="intro">
          <Intro />
          <SignupForm showSignup={showSignup} />
          <SigninForm showSignin={showSignin} />
        </div>
      </div>
      <Main />
      <Footer />
    </>
  );
}
export default Authpage;
