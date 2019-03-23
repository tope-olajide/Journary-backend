import React from "react";
const SignUpForm = ({
  showSignup,
  saveSignupToState,
  signupUser,
  fullname,
  username,
  email,
  password,
  repeatPassword,
  submitValue,isLoading
}) => {
  if (showSignup) {
    return (
      <div class="signup-form">
        <form class="login-form">
          <div class="signup-header">
            <h2>Sign Up</h2>
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            defaultValue={fullname}
            onChange={event => {
              saveSignupToState("fullname", event.target.value);
            }}
          />
          <br />

          <input
            type="text"
            placeholder="Username"
            defaultValue={username}
            onChange={event => {
              saveSignupToState("username", event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={email}
            onChange={event => {
              saveSignupToState("email", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={event => {
              saveSignupToState("password", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            defaultValue={repeatPassword}
            onChange={event => {
              saveSignupToState("repeatPassword", event.target.value);
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault();
              signupUser();
            }}
          >{submitValue}</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default SignUpForm;
