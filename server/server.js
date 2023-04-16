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
    const rate_limit = req.headers['X-RateLimit-Limit'];
    const rate_limit_remaining = req.headers['X-RateLimit-Remaining'];
    const rate_limit_reset = req.headers['X-RateLimit-Reset'];
    const rate_limit_reset_after = req.headers['X-RateLimit-Reset-After'];
    const rate_limit_bucket = req.headers['X-RateLimit-Bucket'];

    if (!rate_limit_remaining || rate_limit_remaining > 0) {
        const path_params = req.originalUrl.indexOf("#") !== -1 ? 
                                req.originalUrl.split("#")[1] : 
                                req.originalUrl.indexOf("?") !== -1 ? 
                                    req.originalUrl.split("?")[1] : 
                                    "";
        const redirect_url = process.env.APP_REDIRECT_URL;

        res.redirect(redirect_url + path_params);
    } else {
        res.status(429).json({
            error: {
                code: 429,
                message: "Too many requests.",
                retry_after: rate_limit_reset_after,
            }
        });
    }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
