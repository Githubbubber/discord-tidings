import React from "react";

import Home from "../components/Home.jsx";
import { AppContextProvider } from "../components/context/AppContext.jsx";

const App = () => {
   return <AppContextProvider>
        <Home />
    </AppContextProvider>;
};

export default App;
