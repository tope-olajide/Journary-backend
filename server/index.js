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

  /**
   * Register New User
   * @param {Object} age request object
   * @param {Object} res response object
   *
   * @returns {response} Response object
   */
  function checkId(user) {
    return user.id == id;
  }
  /**
   * Register New User
   * Route: POST: /users/signup
   *
   * @param {Object} req request object
   * @param {Object} res response object
   *
   * @returns {response} Response object
   */
  function findId() {
    return diaryDB.find(checkId);
  }
  if (findId()) {
    res.json(findId());
  } else {
    res.status(404).end();
  }
});
app.post('/entries', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const entry = req.body.entry;

  diaryDB.push({ id, title, entry });
  res.json(diaryDB);
});

// API server listing port 3000
app.listen(3000, () => {
  console.log('We are live on port 3000');
});

