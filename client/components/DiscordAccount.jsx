import React, { useContext  } from "react";

import DiscordWidgetBot from './DiscordWidgetBot.jsx';
import AppContext from './context/AppContext.jsx';

const DiscordAccount = ({ loginInfo }) => {
    const { app } = useContext(AppContext);
    const { discord_get } = app;
    const { server, channelId } = discord_get;

    const avatarSrc = `https://cdn.discordapp.com/avatars/` + 
    `${loginInfo.id}` +
    `/` + 
    `${loginInfo.avatar}` + 
    `.png`;

    const altForAvatar = `Discord avatar for ` + 
    `${loginInfo.username}` + 
    `#` + 
    `${loginInfo.discriminator}`;

    return <div>
        <div>Welcome to the dashboard</div>

        <div>
            <img src={avatarSrc} id="avatar" alt={altForAvatar} />

            <div id="name">
                {loginInfo.username}#{loginInfo.discriminator}
            </div>
        </div> 

        <DiscordWidgetBot server={discord_get.server} channelId={discord_get.channelId} />

        <a href="/">Log Out</a>
    </div>;
};

export default DiscordAccount;
