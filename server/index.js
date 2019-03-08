import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import logger from './helpers/logger';

const app = express();

const port = parseInt(process.env.PORT, 10) || 9000;


app.use(cors());

app.use(bodyParser.json(), bodyParser.urlencoded({
  extended: false,
}));


app.use('/api/', routes);
app.get('/', (req, res) => {
  res.status(201).json({
    title: 'BisLink',
    message: 'Welcome to bisLink Homepage!'
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
app.listen(port, () => logger.info(`We're up and running on port ${port}`));

export default app;
