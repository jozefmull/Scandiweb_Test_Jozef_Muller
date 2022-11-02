import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import { GlobalProvider } from './context/GlobalState';

//APOLLO CLIENT
export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </ApolloProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
