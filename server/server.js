const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const discordRouter = require('./routes/api/discordRouter');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', discordRouter);

app.get('/auth/discord', (req, res) => {
    const path_params = req.originalUrl.indexOf("#") !== -1 ? req.originalUrl.split("#")[1] : 
                        req.originalUrl.indexOf("?") !== -1 ? req.originalUrl.split("?")[1] :
                        "";
    const redirect_url = process.env.APP_REDIRECT_URL;

    res.redirect(redirect_url + path_params);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
