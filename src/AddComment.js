import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

export default class AddComment extends Component {
  state = {
    body: '',
  };

  handleBodyChange = e => {
    this.setState({
      body: e.target.value,
    });
  };

  renderForm(addComment, loading) {
    return (
      <div>
        <input value={this.state.body} onChange={this.handleBodyChange} />
        <button
          onClick={() => {
            addComment({
              variables: {
                input: {
                  subjectId: this.props.issueId,
                  body: this.state.body,
                },
              },
            });
          }}
          disabled={!this.state.body.length || loading}
        >
          Add Comment
        </button>
      </div>
    );
  }

  render() {
    return (
      <Mutation
        mutation={ADD_COMMENT}
        update={(cache, { data }) => this.props.addComment(data.addComment)}
      >
        {(addComment, result) => {
          return this.renderForm(addComment, result && result.loading);
        }}
      </Mutation>
    );
  }
}

const ADD_COMMENT = gql`
  mutation($input: AddCommentInput!) {
    addComment(input: $input) {
      commentEdge {
        node {
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
  }
`;
