const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const discordRouter = require('./routes/api/discordRouter');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', discordRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
