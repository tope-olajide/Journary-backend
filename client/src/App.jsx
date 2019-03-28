import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./components/Auth";
import HomePage from "./components/diaries";
import Profile from "./components/profile";
import AddEntry from "./components/add-entry/index";
import EditProfile from "./components/edit-profile";
import ViewEntry from "./components/view-entry"
import Settings from "./components/reminder"
import ModifyUserEntry from './components/modify-entry'
import withAuthorization from './utils/withAuthorization'
const App = () => {
  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <title>My Dairy</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      </head>
      <html lang="en">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alegreya"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Eczar"
          rel="stylesheet"
        />
        <body>
<Switch>
    <Route exact path="/auth" component={AuthPage} />
    <Route exact path="/" component={withAuthorization(ModifyUserEntry)} />
    <Route exact path="/add-entry" component={withAuthorization(AddEntry)} />


</Switch>
        </body>
      </html>
    </>
  );
};
export default App;
