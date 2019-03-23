import React from "react";
const SignUpForm = ({
  showSignup,
  handleInputChange,
  signupUser,
  fullname,
  username,
  email,
  password,
  repeatPassword
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
              handleInputChange("fullname", event.target.value);
            }}
          />
          <br />

          <input
            type="text"
            placeholder="Username"
            defaultValue={username}
            onChange={event => {
              handleInputChange("username", event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            defaultValue={email}
            onChange={event => {
              handleInputChange("email", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={event => {
              handleInputChange("password", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            defaultValue={repeatPassword}
            onChange={event => {
              handleInputChange("repeatPassword", event.target.value);
            }}
          />
          <input
            type="submit"
            value="Submit"
            onClick={event => {
              event.preventDefault();
              signupUser();
            }}
          />
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default SignUpForm;
