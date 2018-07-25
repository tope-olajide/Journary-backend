// Loading modules
import express from 'express';
import bodyParser from 'body-parser';


// Instantiating express module
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('homepage');
});


// Instantiating datab
const diaryDB = [{
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
}];

// API point to get all entries

app.get('/entries', (req, res) => {
  res.json(diaryDB);
});

app.get('/entries/:id', (req, res) => {
  const id = req.params.id;


// API server listing port 3000
app.listen(3000, () => {
  console.log('We are live on port 3000');
});