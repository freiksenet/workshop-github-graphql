import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Issues from './Issues';

export default class Repository extends Component {
  renderContent = ({ loading, error, data, fetchMore, subscribeToMore }) => {
    if (loading) {
      return <div>Repository loading</div>;
    } else {
      return (
        <div>
          <div>Name: {data.repository.name}</div>
          <div>Url: {data.repository.url}</div>
          <Issues
            issues={data.repository.issues}
            showComments={this.props.showComments}
            loadMore={() => {
              this.loadMoreIssues(data, fetchMore);
            }}
            subscribeToMore={() => {
              subscribeToMore({
                document: REPOSITORY_SUBSRCIPTION_QUERY,
                variables: data.repository.issues.nodes.map(node => node.id),
                updateQuery: () => {},
              });
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
      id
      name
      url
      issues(first: 20, after: $issueCursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
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

const REPOSITORY_SUBSRCIPTION_QUERY = gql`
  subscription($ids: [ID!]) {
    onIssuesChanged(ids: $ids) {
      issueChanged {
        id
        body
      }
    }
  }
`;
