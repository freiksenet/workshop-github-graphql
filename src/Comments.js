import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import AddComment from './AddComment';

export default class Comments extends Component {
  render() {
    return (
      <div>
        <h2>Comments ({this.props.comments.totalCount})</h2>
        {this.props.comments.nodes.map(comment => (
          <div>
            <div>
              <b>{comment.author.login}</b>
            </div>
            <div>{comment.bodyText}</div>
            <div>
              {comment.reactions.nodes.map(reaction => (
                <span>{reaction.content}</span>
              ))}
            </div>
          </div>
        ))}
        <AddComment
          issueId={this.props.issueId}
          addComment={this.props.addComment}
        />
      </div>
    );
  }
}
