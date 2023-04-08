import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
   const [app, setApp] = useState({ user: 'Guest' });
   
   useEffect(() => {
      axios({
         method: 'post',
         url: '/api'
      }).then(({ data }) => {
         console.log(data);
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
