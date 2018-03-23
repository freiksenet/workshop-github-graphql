import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export default class User extends Component {
  render() {
    return (
      <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>;
          } else {
            return (
              <div>
                <div>Username: {data.viewer.login}</div>
                <div>Email: {data.viewer.email}</div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

const USER_QUERY = gql`
  query {
    viewer {
      login
      email
    }
  }
`;
