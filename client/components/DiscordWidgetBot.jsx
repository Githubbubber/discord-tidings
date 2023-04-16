import React from 'react';
import WidgetBot from '@widgetbot/react-embed';

const DiscordWidgetBot = ({
  server, 
  channelId,
  height = "600px", 
  width = "500px"
}) => {
  return <WidgetBot
    server={server}
    channelId={channelId}
    height={height}
    width={width}
  />;
}

export default DiscordWidgetBot;
