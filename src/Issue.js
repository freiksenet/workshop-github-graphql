import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Comments from './Comments';

export default class Issue extends Component {
  addComment(client, data, newComment) {
    console.log(client, data, newComment);
    const newData = {
      node: {
        ...data.node,
        comments: {
          ...data.node.comments,
          nodes: [...data.node.comments.nodes, newComment.commentEdge.node],
        },
      },
    };
    client.writeQuery({ query: IssueQuery, data: newData });
  }

  renderIssue(issue) {
    return (
      <div style={{ padding: 5, borderTop: '1px solid black' }}>
        <div>{issue.author.login}</div>
        <div>{issue.body}</div>
        <div>{issue.createdAt}</div>
      </div>
    );
  }

  render() {
    return (
      <Query
        query={IssueQuery}
        variables={{
          id: this.props.id,
        }}
      >
        {({ loading, data, error, client }) => {
          if (loading) {
            try {
              const partialResult = client.readFragment({
                id: `Issue:${this.props.id}`,
                fragment: IssueFragment,
              });
              return (
                <div>
                  {this.renderIssue(partialResult)}
                  <div>Loading comments...</div>
                </div>
              );
            } catch (e) {
              return <div>Loading issue</div>;
            }
          } else {
            return (
              <div>
                {this.renderIssue(data.node)}
                <Comments
                  issueId={data.node.id}
                  comments={data.node.comments}
                  addComment={addCommentData =>
                    this.addComment(client, data, addCommentData)
                  }
                />
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

const IssueFragment = gql`
  fragment IssueFragment on Issue {
    id
    author {
      login
    }
    body
    createdAt
  }
`;

const CommentsFragment = gql`
  fragment CommentsFragment on Issue {
    comments(first: 100) {
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
        createdAt
        bodyText
        reactions(first: 100) {
          nodes {
            content
          }
        }
      }
    }
  }
`;

const IssueQuery = gql`
  query($id: ID!) {
    node(id: $id) {
      ...IssueFragment
      ...CommentsFragment
    }
  }

  ${IssueFragment}
  ${CommentsFragment}
`;
