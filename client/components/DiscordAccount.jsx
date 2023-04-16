import React, { useContext  } from "react";

import DiscordWidgetBot from './DiscordWidgetBot.jsx';
import AppContext from './context/AppContext.jsx';

const DiscordAccount = ({ loginInfo }) => {
    const { app } = useContext(AppContext);
    const { server, channelId } = app;

    const avatarSrc = `https://cdn.discordapp.com/avatars/` + 
    `${loginInfo.id}` +
    `/` + 
    `${loginInfo.avatar}` + 
    `.png`;

    return <div>
        <div>Welcome to the dashboard</div>
            <img src={avatarSrc} id="avatar" alt="Discord avatar" />
            
            <br />

            <div id="name">
                {loginInfo.username ? loginInfo.username : "Username"}#{loginInfo.discriminator ? loginInfo.discriminator : "0000"}
            </div>

            <a href="/">Log Out</a>

        <DiscordWidgetBot server={server} channelId={channelId} />
    </div>;
};

export default DiscordAccount;
