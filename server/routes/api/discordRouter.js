const express = require('express');
const discordRouter = express.Router();

require('dotenv').config();

discordRouter.get('/', (req, res, next) => {
    const server_info = process.env.DISCORD_SERVER;
    const channel_info = process.env.DISCORD_CHANNEL;
    const rate_limit_remaining = req.headers['X-RateLimit-Remaining'];

    if (!rate_limit_remaining || rate_limit_remaining > 0) {
        res.status(200).json({ 
            discord: { 
                server: server_info,
                channelId: channel_info, 
            } 
        });
    } else {
        console.log("Rate limit exceeded from [/]");

        res.status(429).json({
            error: {
                code: 429,
                message: "Too many requests.",
            }
        });
    }
});

discordRouter.get('/discord/login', (req, res, next) => {
    const client_id = process.env.DISCORD_CLIENT_ID;
    const redirect_uri = process.env.DISCORD_REDIRECT_URI;
    const response_type = 'token';
    const scope = 'identify';
    const url = process.env.DISCORD_LOGIN_URL;
    const get_url = `${url}` +
        `redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D` +
        `${client_id}` +
        `%26redirect_uri%3D` +
        `${redirect_uri}` +
        `%26response_type%3D` +
        `${response_type}` +
        `%26scope%3D` +
        `${scope}`;

    const rate_limit_remaining = req.headers['X-RateLimit-Remaining'];

    if (!rate_limit_remaining || rate_limit_remaining > 0) {
        res.status(200).json({
            discord_get_login: {
                url: get_url,
            }
        });
    } else {
        console.log("Rate limit exceeded from [/discord/login]");

        res.status(429).json({
            error: {
                code: 429,
                message: "Too many requests.",
            }
        });
    }
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

    const rate_limit_remaining = req.headers['X-RateLimit-Remaining'];

    if (!rate_limit_remaining || rate_limit_remaining > 0) {
        res.status(200).json({
            discord_post_login: { success: true }
        });
    } else {
        console.log("Rate limit exceeded from [/discord/login]");

        res.status(429).json({
            error: {
                code: 429,
                message: "Too many requests.",
            }
        });
    }
});

module.exports = discordRouter;
