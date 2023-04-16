import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
   const [app, setApp] = useState({ 
      discord: 'n/a' 
   });
   
   useEffect(() => {
      axios({
         method: 'get',
         url: '/api'
      }).then(({ data }) => {
         setApp(data);
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

const AppContextConsumer = AppContext.Consumer;

export { AppContextProvider, AppContextConsumer, AppContext as default };
