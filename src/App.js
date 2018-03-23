import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import User from './User';
import Repository from './Repository';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    // const token = localStorage.getItem('GITHUB_TOKEN');
    operation.setContext({
      headers: {
        // authorization: `Bearer ${token}`,
        authorization: 'Bearer 768bc2f0ab8fafde3bbc755146816c0af60174c3',
      },
    });
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <User />
        <Repository owner="freiksenet" name="cl-yacc-ebnf" />
      </ApolloProvider>
    );
  }
}

export default App;
