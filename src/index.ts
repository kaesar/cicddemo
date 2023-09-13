import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';
import os from 'os';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send(`Hi there. Time is ${new Date().toLocaleString()}`);
});

app.get('/health', (req, res) => {
  res.send({ platform: os.type(), osVersion: os.version(), nodeVersion: process.version });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
