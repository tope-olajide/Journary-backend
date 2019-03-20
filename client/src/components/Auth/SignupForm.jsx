import React from "react";
const SignUpForm = ({ showSignup }) => {
  if (showSignup) {
    return (
      <div class="signup-form">
        <form class="login-form">
          <div class="signup-header">
            <h2>Sign Up</h2>
          </div>
          <input type="text" name="firstname" placeholder="First name" />
          <br />
          <input type="text" name="lastname" placeholder="Last name" />
          <input type="text" name="lastname" placeholder="Username" />
          <input type="text" name="lastname" placeholder="Email" />
          <input type="password" name="lastname" placeholder="Password" />
          <input
            type="password"
            name="lastname"
            placeholder="Repeat Password"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  else{
      return (null)
  }
};
export default SignUpForm;
