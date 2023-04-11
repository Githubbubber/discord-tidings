const express = require('express');
const discordRouter = express.Router();

require('dotenv').config();

discordRouter.post('/', (req, res, next) => {
    res.status(200).json({ 
        discord: { 
            server: process.env.DISCORD_SERVER,
            channel: process.env.DISCORD_CHANNEL, 
        } 
    });
});

module.exports = discordRouter;
