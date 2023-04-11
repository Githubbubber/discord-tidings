import React from "react";
import { AppContextProvider } from './context/AppContext.jsx';
import DiscordChatView from './DiscordChatView.jsx';

const App = () => {
   return <AppContextProvider>
        <DiscordChatView />
    </AppContextProvider>;
};

export default App;
