import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import User from './User';
import Repository from './Repository';
import Issue from './Issue';
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
        authorization: 'Bearer 2e8479c5afb3fface60f5f4d8d8d04960f31c2f6',
      },
    });
  },
  cacheRedirects: {
    Query: {
      node: (parent, { id }, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Issue', id });
      },
    },
  },
});

class App extends Component {
  state = {
    show: 'User',
    issueId: null,
  };

  handleShowIssue = issueId => {
    this.setState({
      show: 'Issue',
      issueId,
    });
  };

  renderBody() {
    if (this.state.show === 'Issue') {
      return <Issue id={this.state.issueId} />;
    } else if (this.state.show === 'User') {
      return <User />;
    } else {
      return (
        <Repository
          owner="freiksenet"
          name="workshop-github-graphql"
          showComments={this.handleShowIssue}
        />
      );
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <button onClick={() => this.setState({ show: 'User' })}>User</button>
          <button onClick={() => this.setState({ show: 'Repository' })}>
            Repository
          </button>
        </div>
        {this.renderBody()}
      </ApolloProvider>
    );
  }
}

export default App;
