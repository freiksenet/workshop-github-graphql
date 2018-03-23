import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Issues from './Issues';

export default class Repository extends Component {
  renderContent = ({ loading, error, data, fetchMore }) => {
    if (loading) {
      return <div>Repository loading</div>;
    } else {
      return (
        <div>
          <div>Name: {data.repository.name}</div>
          <div>Url: {data.repository.url}</div>
          <Issues
            issues={data.repository.issues}
            loadMore={() => {
              this.loadMoreIssues(data, fetchMore);
            }}
          />
        </div>
      );
    }
  };

  loadMoreIssues(data, fetchMore) {
    return fetchMore({
      variables: {
        issueCursor: data.repository.issues.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const prevIssues = previousResult.repository.issues;
        const nextIssues = fetchMoreResult.repository.issues;
        return {
          ...previousResult,
          repository: {
            ...previousResult.repository,
            issues: {
              ...prevIssues,
              pageInfo: nextIssues.pageInfo,
              nodes: [...prevIssues.nodes, ...nextIssues.nodes],
            },
          },
        };
      },
    });
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
  query($owner: String!, $name: String!, $issueCursor: String) {
    repository(owner: $owner, name: $name) {
      name
      url
      issues(first: 3, after: $issueCursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          author {
            login
          }
          body
          createdAt
        }
      }
    }
  }
`;
