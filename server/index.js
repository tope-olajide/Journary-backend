// Loading modules
import express from 'express';
import bodyParser from 'body-parser';
import index from './routes/index.route';

// Instantiating express module
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);

// API server listing port 3000
app.listen(3000, () => {
  console.log('We are live on port 3000');
});
export default app;
