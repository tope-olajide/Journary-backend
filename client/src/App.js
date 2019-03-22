import React, { Component } from 'react';

import AuthPage from './components/Auth'
import HomePage from './components/diaries'
import Profile from './components/profile'
import Entry from './components/add-entry'
class App extends Component {
  render() {
    return (
      <>
      <head>
  <meta charset="UTF-8"/>
  <title>My Dairy</title>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
</head>
<html lang="en">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
  crossorigin="anonymous"/>
<link href="https://fonts.googleapis.com/css?family=Alegreya" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css?family=Eczar" rel="stylesheet"/>
<body>
<Entry />
</body>
</html>
</>
    );
  }
}

export default App;
