// Loading modules
import express from 'express';
import bodyParser from 'body-parser';
import index from './routes/index.route';

// Instantiating express module
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);

app.put('/entries/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const entry = req.body.entry;
  const newId = id - 1;
  if (diaryDB[newId]) {
    diaryDB[newId].id = id;
    diaryDB[newId].title = title;
    diaryDB[newId].entry = entry;
    res.json(diaryDB[newId]);
  } else {
    res.status(404).end();
  }
});
// API server listing port 3000
app.listen(3000, () => {
  console.log('We are live on port 3000');
});
<<<<<<< HEAD
=======
export default app;
>>>>>>> 34de5556a64bf0cd34105b0f5d21da1d5f28265c
