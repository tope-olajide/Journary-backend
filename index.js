import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './helpers/logger';

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json(), bodyParser.urlencoded({
  extended: false,
}));


app.use('/api/', routes);
app.get('/', (req, res) => {
  res.status(201).json({
    title: 'Journary - Backend',
    message: 'Welcome to my Journary App!'
  });
});

app.get('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'invalid link'
  });
});

app.post('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'invalid link'
  });
});
const port =  process.env.PORT || 8080;
app.listen(port, () => logger.info(`We're up and running on port ${port}`));

export default app;
