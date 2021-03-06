import React, { Component } from 'react';

export default class Issues extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        Issues (total: {this.props.issues.totalCount}):
        <div>
          {this.props.issues.nodes.map((issue, index) => (
            <div
              key={index}
              style={{ padding: 5, borderTop: '1px solid black' }}
            >
              <div>{issue.author.login}</div>
              <div>{issue.body}</div>
              <div>{issue.createdAt}</div>
              <button onClick={() => this.props.showComments(issue.id)}>
                Comments
              </button>
            </div>
          ))}
        </div>
        {this.props.issues.pageInfo.hasNextPage && (
          <button onClick={this.props.loadMore}>Load more!</button>
        )}
      </div>
    );
  }
}
