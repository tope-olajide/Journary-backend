import React, { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SignInForm";
function Authpage() {
  const [showSignup, setShowSignup] = useState(true);
  const [showSignin, setShowSignin] = useState(false);
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
  return (
    <>
      <html lang="en">
        <div class="hide_search-overlay">
          <div class="close-btn" onclick="hideSearchForm()">
            <p>&times;</p>
          </div>
          <div id="search-form">
            <form class="search-bar">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">search</button>
            </form>
          </div>
        </div>
        <body>
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
              <div class="sub-header">
                <h1>What are you writing for?</h1>
                <p>
                  {" "}
                  Whether you’re looking for a tool to record your daily
                  emotions and activities in a reflective journal, keep track of
                  milestones in a food diary or pregnancy journal, or even
                  record your dreams in a dream journal, Penzu has you covered.
                  Penzu gives you all the tools you need to focus on the ideas
                  you want to preserve, rather than the process of writing
                  itself.
                </p>
              </div>
              <SignupForm showSignup={showSignup} />
              <SigninForm showSignin={showSignin} />
            </div>
          </div>
          <div class="grid-container">
            <div class="main">
              <h1>
                Express yourself with pictures and words. Keep a journal of your
                daily activities, your travel, exercise, diet, or thoughts and
                prayers
              </h1>
            </div>
            <div class="main ">
              <img src="images/pic1.jpg" />
              <div class="overlay-color" />
            </div>
            <div class="main">
              <img src="images/pic1.jpg" />
              <div class="overlay-color" />
            </div>
            <div class="main">
              <h1>
                Never Forget to Write Custom email reminders help you make sure
                you never forget to write.
              </h1>
            </div>
            <div class="main">
              <h1>
                Secure, encrypted Using the same security as banks, even we
                can’t see your private entries!
              </h1>
            </div>
            <div class="main">
              <img src="./images/reserve-slide1.jpg" />
              <div class="overlay-color" />
            </div>
            <div class="main">
              <img src="./images/revslide.jpg" />
              <div class="overlay-color" />
            </div>
            <div class="main">
              <h1>
                100% Private Designed to focus on privacy, your entries are
                totally private by default!
              </h1>
            </div>
          </div>
          <footer class="footer">
            <p class=" ">
              Copyright © 2019 My-Diary. All rights reserved | Designed with{" "}
              <i class="fas fa-heart fa-lg" /> by
              <a href="https://github.com/tope-olajide">Temitope</a>{" "}
            </p>
          </footer>
        </body>
      </html>
    </>
  );
}
export default Authpage;
