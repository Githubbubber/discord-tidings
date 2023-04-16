import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
   const [app, setApp] = useState({ 
      server: null,
      channelId: null, 
   });
   
   useEffect(() => {
      axios({
         method: 'get',
         url: '/api'
      }).then(({ data }) => {
         const { discord } = data;
         const { server, channelId } = discord;

         setApp(prev => {
            return {
               ...prev,
               server,
               channelId,
            };
         });
      }).catch(err => {
         console.error(err);
      })
   }, []);

   return (
      <AppContext.Provider value={{ app, setApp }}>
         {children}
      </AppContext.Provider>
   );
};

export { AppContextProvider, AppContext as default };
