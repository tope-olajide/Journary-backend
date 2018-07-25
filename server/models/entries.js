

entryDB = [{
  id: 1,
  title: 'Entry one',
  entry: 'sit amet consectetur adipisicing elit. Suscipit sectetur adipisicing elit. Explicabo magni sapiente tempore debitis beatae culpa natus architecto',
},
{
  id: 2,
  title: 'Entry two',
  entry: 'Explicabo magni sapiente, tempore debitis beatae culpa natus Ladipisicing eli adipisicing elit. Suscipit, ulla',

},
{
  id: 3,
  name: 'Entry three',
  details: 'rem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio re debitis beatae culpa nat',
  location: 'Rome',
}]
export default dummydb;

// Loading modules
var express = require('express');  
var lowdb = require('lowdb');  
var storage = require('lowdb/file-sync');  
var uuid = require('uuid');  
var bodyParser = require('body-parser');


