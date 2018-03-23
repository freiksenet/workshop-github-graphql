import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export default class Issue extends Component {
  render() {
    return (
      <Query
        query={IssueQuery}
        variables={{
          id: this.props.id,
        }}
      >
        {({ loading, data, error }) => {
          if (loading) {
            return <div>Loading issue</div>;
          } else {
            return (
              <div>
                <div style={{ padding: 5, borderTop: '1px solid black' }}>
                  <div>{data.node.author.login}</div>
                  <div>{data.node.body}</div>
                  <div>{data.node.createdAt}</div>
                </div>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

const IssueQuery = gql`
  query($id: ID!) {
    node(id: $id) {
      id
      ... on Issue {
        author {
          login
        }
        body
        createdAt
      }
    }
  }
`;
