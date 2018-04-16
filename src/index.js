import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";




const client = new ApolloClient({
  uri: "http://35.227.46.47:5000/graphql"
});


const App=
  <ApolloProvider client= {client}>
    <Routes />
  </ApolloProvider>



ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
