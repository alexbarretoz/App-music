const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});