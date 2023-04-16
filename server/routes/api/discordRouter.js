const express = require('express');
const discordRouter = express.Router();

require('dotenv').config();

discordRouter.get('/', (req, res, next) => {
    const server_info = process.env.DISCORD_SERVER;
    const channel_info = process.env.DISCORD_CHANNEL;

    res.status(200).json({ 
        discord_get: { 
            server: server_info,
            channel: channel_info, 
        } 
    });
});

discordRouter.get('/discord/login', (req, res, next) => {
    const client_id = process.env.DISCORD_CLIENT_ID;
    const redirect_uri = process.env.DISCORD_REDIRECT_URI;
    const response_type = 'token';
    const scope = 'identify';
    const url = process.env.DISCORD_OAUTH_AUTHORIZE_URL;
    const get_url = `${url}` +
        `?client_id=` +
        `${client_id}` +
        `&redirect_uri=` +
        `${redirect_uri}` +
        `&response_type=` +
        `${response_type}` +
        `&scope=` +
        `${scope}`;

    res.status(200).json({
        discord_get_login: {
            url: get_url,
        }
    });
});

discordRouter.post('/discord/login', (req, res, next) => {
    const user_data = req.body.data;
    const {
        username,
        discriminator,
        avatar,
        id,
        accessToken
    } = user_data;

    res.status(200).json({
        discord_post_login: { success: true }
    });
});
module.exports = discordRouter;
