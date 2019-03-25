import React, { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SignInForm";
import Main from "./Main";
import Intro from "./Intro";
import Footer from "../commons/Footer";
import { validateUser } from "../../utils/validator";
import toastNotification from "./../../utils/toastNotification";
import { signUp,signIn } from "../../actions/authActions";
import { connect } from 'react-redux';

function Authpage(props) {
  const [showSignup, setShowSignup] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const [userSignInDetails, setUserSignInDetails] = useState({
    authname: "",
    password: ""
  });
const [isLoading, setIsLoading] = useState(false);
const [submitValue, setSubmitValue] = useState("Submit");
const enableLoading=()=>{
  setSubmitValue(<b><i class="fas fa-spinner fa-lg fa-spin"></i></b>)
  setIsLoading(true)
}
const disableLoading=()=>{
  setSubmitValue("Submit")
  setIsLoading(false)
}
  const saveSignupToState = (key, value) => {
    setUserSignUpDetails({ ...userSignUpDetails, [key]: value });
    console.log(userSignUpDetails);
  };
  const saveSigninToState = (key, value) => {
    setUserSignInDetails({ ...userSignInDetails, [key]: value });
    console.log(userSignInDetails);
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
    else if (userSignUpDetails.password !== userSignUpDetails.repeatPassword) {
      toastNotification(["error"],"passwords does not match");
    } else {
      toastNotification(["info"],'Signing you up...')
      enableLoading()
      props.signUp(userSignUpDetails).then(
        () => {
          toastNotification(["success"],`Welcome <br/><em>${userSignUpDetails.username}</em>`);
           setTimeout(() => {
            window.location = "/";
          }, 300); 
          disableLoading()
        },
        error => {
          if(!error.response){
            toastNotification(["error"], 'Network Error');
            disableLoading()
          }
          else{
            toastNotification(["error"], error.response.data.message);
            disableLoading()
          }
        }
      );
    }
  };
 const signinUser = () => {
  enableLoading()
    toastNotification(["info"],('logging in... '))
    props.signIn(userSignInDetails)
      .then(() => {
        toastNotification(['success'], `Welcome back <br/><em>${userSignInDetails.authname}</em>`);
        setTimeout(() => {
          window.location = '/';
        }, 300) ;disableLoading()
      },
      (error) => {
        disableLoading()
      if(!error.response){
        toastNotification(["error"], 'Network Error');
      }
      else{
        toastNotification(["error"], error.response.data.message);
        disableLoading()
      }
      });
  }
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
            saveSignupToState={saveSignupToState}
            signupUser={signupUser}
            fullname={userSignUpDetails.fullname}
            username={userSignUpDetails.username}
            email={userSignUpDetails.email}
            password={userSignUpDetails.password}
            repeatPassword={userSignUpDetails.repeatPassword}
            submitValue={submitValue}
            isLoading={isLoading}
          />
          <SigninForm
          showSignin={showSignin} 
          saveSigninToState={saveSigninToState}
          authname={userSignInDetails.authname}
          password={userSignInDetails.password}
          submitValue={submitValue}
          isLoading={isLoading}
          signinUser={signinUser}
          />
        </div>
      </div>
      <Main />
      <Footer />
    </>
  );
}
export default connect(null, {signUp,signIn})(Authpage);