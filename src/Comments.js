import React, { Component } from 'react';

export default class Comments extends Component {
  render() {
    console.log(this.props.comments);
    return (
      <div>
        <h2>Comments ({this.props.comments.totalCount})</h2>
        {this.props.comments.nodes.map(comment => (
          <div>
            <div>
              <b>{comment.author.login}</b>
            </div>
            <div>{comment.bodyText}</div>
          </div>
        ))}
      </div>
    );
  }
}
