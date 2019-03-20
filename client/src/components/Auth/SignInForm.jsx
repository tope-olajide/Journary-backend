import React from "react";
const SignInForm = ({ showSignin }) => {
  if (showSignin) {
    return (
      <div class="signin-form">
        <div class="signup-header">
          <h2>Sign In</h2>
        </div>
        <form class="login-form">
          <br />
          <br />
          Username:
          <br />
          <input type="text" name="firstname" />
          <br />
          Password:
          <br />
          <input type="password" name="lastname" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  } else {
    return null;
  }
};
export default SignInForm;
