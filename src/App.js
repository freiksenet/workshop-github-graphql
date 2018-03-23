import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import User from './User';
import Repository from './Repository';
import logo from './logo.svg';
import './App.css';

window.gql = gql;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    // const token = localStorage.getItem('GITHUB_TOKEN');
    operation.setContext({
      headers: {
        // authorization: `Bearer ${token}`,
        authorization: 'Bearer',
      },
    });
  },
});

class App extends Component {
  state = {
    show: 'User',
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <button onClick={() => this.setState({ show: 'User' })}>User</button>
          <button onClick={() => this.setState({ show: 'Repository' })}>
            Repository
          </button>
        </div>
        {this.state.show === 'User' ? (
          <User />
        ) : (
          <Repository owner="freiksenet" name="workshop-github-graphql" />
        )}
      </ApolloProvider>
    );
  }
}

export default App;
