import React, { useContext  } from 'react';
import WidgetBot from '@widgetbot/react-embed';

import AppContext from './context/AppContext.jsx';

const DiscordWidgetBot = ({
    height = "600px", 
    width = "500px"
}) => {
  const { app } = useContext(AppContext);
  const { discord } = app;

  const localHeight = discord.height || height;
  const localWidth = discord.width || width;

  console.log({discord});

  return <WidgetBot
    server={discord.server}
    channelId={discord.channelId}
    height={localHeight}
    width={localWidth}
  />;
}

export default DiscordWidgetBot;
