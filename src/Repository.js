import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export default class Repository extends Component {
  renderContent({ loading, error, data }) {
    if (loading) {
      return <div>Repository loading</div>;
    } else {
      return (
        <div>
          <div>Name: {data.repository.name}</div>
          <div>Url: {data.repository.url}</div>
        </div>
      );
    }
  }
  render() {
    return (
      <Query
        query={REPOSITORY_QUERY}
        variables={{
          owner: this.props.owner,
          name: this.props.name,
        }}
      >
        {this.renderContent}
      </Query>
    );
  }
}

const REPOSITORY_QUERY = gql`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      url
    }
  }
`;
