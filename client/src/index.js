import React, { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from "./App.jsx";

const root = ReactDOMClient.createRoot(document.querySelector('#root'));

root.render(<StrictMode><App /></StrictMode>);
