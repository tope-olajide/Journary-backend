import React, { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SignInForm";
import Main from "./Main";
import Intro from "./Intro";
import Footer from "../commons/Footer";
import { validateUser } from "../../utils/validator";
import toastNotification from "./../../utils/toastNotification";

function Authpage() {
  const [showSignup, setShowSignup] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const saveSignupToState = (key, value) => {
    setUserSignUpDetails({ ...userSignUpDetails, [key]: value });
    console.log(userSignUpDetails);
  };
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
  const signupUser = () => {
    const validateSignupError = validateUser(userSignUpDetails);
    if (validateSignupError) {
      toastNotification(["error"],validateSignupError);
    }
  };
  return (
    <>
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
          </div>
        </div>
        <div class="intro">
          <Intro />
          <SignupForm
            showSignup={showSignup}
            handleInputChange={saveSignupToState}
            signupUser={signupUser}
            fullname={userSignUpDetails.fullname}
            username={userSignUpDetails.username}
            email={userSignUpDetails.email}
            password={userSignUpDetails.password}
            repeatPassword={userSignUpDetails.repeatPassword}
          />
          <SigninForm showSignin={showSignin} />
        </div>
      </div>
      <Main />
      <Footer />
    </>
  );
}
export default Authpage;
