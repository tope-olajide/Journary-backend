import React from "react";
const SignInForm = ({
  showSignin,
  saveSigninToState,
  authname,
  password,
  signinUser,
  submitValue,
  isLoading
}) => {
  if (showSignin) {
    return (
      <div class="signin-form">
        <div class="signup-header">
          <h2>Sign In</h2>
        </div>
        <form class="login-form">
          <br />
          <br />
          Username or Email:
          <br />
          <input
            type="text"
            name="authname"
            defaultValue={authname}
            onChange={event => {
              saveSigninToState("authname", event.target.value);
            }}
          />
          <br />
          Password:
          <br />
          <input
            type="password"
            name="password"
            defaultValue={password}
            onChange={event => {
              saveSigninToState("password", event.target.value);
            }}
          />
          <button type="submit" disabled={isLoading} onClick={signinUser}>
            {submitValue}
          </button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default SignInForm;
